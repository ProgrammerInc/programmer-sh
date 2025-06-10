/**
 * Hooks for the SplashCursor component
 */
import { useCallback, useEffect, useRef } from 'react';
import {
  ADVECTION_SHADER,
  BASE_VERTEX_SHADER,
  BLOOM_BLUR_SHADER,
  BLOOM_FINAL_SHADER,
  BLOOM_PREFILTER_SHADER,
  CLEAR_SHADER,
  COLOR_SHADER,
  COPY_SHADER,
  CURL_SHADER,
  DEFAULT_CONFIG,
  DISPLAY_BLOOM_SHADER,
  DISPLAY_SHADER,
  DIVERGENCE_SHADER,
  GRADIENT_SUBTRACT_SHADER,
  PRESSURE_SHADER,
  SPLAT_SHADER,
  VORTICITY_SHADER
} from './splash-cursor.constants';
import { FramebufferType, Pointer, SplashCursorProps, WebGLContext } from './splash-cursor.types';
import {
  createDoubleFBO,
  createMaterial,
  createQuad,
  generateColor,
  initializeWebGLContext,
  resizeCanvas,
  updatePointerPosition
} from './splash-cursor.utils';

// Define missing WebGL constants
const GL_RG = 0x8227;
const GL_RED = 0x1903;

/**
 * Hook that manages the fluid simulation effect for the SplashCursor
 * @param props - SplashCursor component props
 * @returns Canvas reference and event handlers
 */
export function useSplashEffect(props: SplashCursorProps) {
  // State management - using refs for all mutable state
  const stateRef = useRef({
    config: { ...DEFAULT_CONFIG, ...props.config },
    pointers: [] as Pointer[],
    lastColorChangeTime: 0,
    colorUpdateTimer: 0,
    ditheringTexture: null as WebGLTexture | null,
    lastUpdateTime: Date.now(),
    canvas: null as HTMLCanvasElement | null,
    context: null as WebGLContext | null,
    materials: new Map<string, ReturnType<typeof createMaterial>>(),
    dye: null as ReturnType<typeof createDoubleFBO> | null,
    velocity: null as ReturnType<typeof createDoubleFBO> | null,
    divergence: null as ReturnType<typeof createDoubleFBO> | null,
    curl: null as ReturnType<typeof createDoubleFBO> | null,
    pressure: null as ReturnType<typeof createDoubleFBO> | null,
    bloom: null as ReturnType<typeof createDoubleFBO> | null,
    bloomFramebuffers: [] as ReturnType<typeof createDoubleFBO>[],
    sunrays: null as ReturnType<typeof createDoubleFBO> | null,
    sunraysTemp: null as ReturnType<typeof createDoubleFBO> | null,
    animations: [] as number[],
    mounted: true,
    resetted: false
  });

  // Reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track props in refs to avoid dependency issues
  const propsRef = useRef(props);
  useEffect(() => {
    propsRef.current = props;
    if (props.config) {
      stateRef.current.config = { ...DEFAULT_CONFIG, ...props.config };
    }
  }, [props]);

  /**
   * Calculate resolution based on device pixel ratio
   */
  const getResolution = useCallback((resolution: number) => {
    const state = stateRef.current;
    const canvas = state.canvas;
    if (!canvas) return { width: 0, height: 0 };

    const aspectRatio = canvas.width / canvas.height;
    const width = Math.round(resolution);
    const height = Math.round(width / aspectRatio);
    return { width, height };
  }, []);

  /**
   * Create a new pointer at the specified position
   */
  const createPointer = useCallback((x: number, y: number): Pointer => {
    return {
      id: -1,
      x,
      y,
      dx: 0,
      dy: 0,
      down: false,
      moved: false,
      color: generateColor()
    };
  }, []);

  /**
   * Update all active pointers
   */
  const updatePointers = useCallback(() => {
    const state = stateRef.current;
    state.pointers.forEach(p => {
      p.moved = false;
    });
  }, []);

  /**
   * Update color values based on time
   */
  const updateColors = useCallback((dt: number) => {
    const state = stateRef.current;
    if (!state.config.COLOR_UPDATE_SPEED) return;

    state.colorUpdateTimer += dt * state.config.COLOR_UPDATE_SPEED;
    if (state.colorUpdateTimer >= 1) {
      state.colorUpdateTimer = 0;
      state.pointers.forEach(p => {
        p.color = generateColor();
      });
    }
  }, []);

  /**
   * Render the final output
   */
  const render = useCallback(() => {
    const state = stateRef.current;
    const { config, context, dye } = state;
    if (!context || !dye) return;

    const { gl } = context;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    if (config.TRANSPARENT) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    // Render final display
    const displayMaterial = state.materials.get('display');
    if (displayMaterial) {
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
  }, []);

  /**
   * Step the fluid simulation forward
   */
  const step = useCallback((dt: number) => {
    const state = stateRef.current;
    const { config, context, curl, velocity, pressure, divergence } = state;
    if (!context) return;

    const { gl } = context;

    // Calculate curl
    const curlMaterial = state.materials.get('curl');
    if (curlMaterial && curl && velocity) {
      gl.viewport(0, 0, curl.width, curl.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, curl.write.fbo);
      gl.uniform1i(curlMaterial.uniforms.uVelocity, velocity.read.attach(0));
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      curl.swap();
    }

    // Apply vorticity
    const vorticityMaterial = state.materials.get('vorticity');
    if (vorticityMaterial && velocity && curl) {
      gl.viewport(0, 0, velocity.width, velocity.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      gl.uniform1i(vorticityMaterial.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityMaterial.uniforms.uCurl, curl.read.attach(1));
      gl.uniform1f(vorticityMaterial.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityMaterial.uniforms.dt, dt);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      velocity.swap();
    }

    // Calculate divergence
    const divergenceMaterial = state.materials.get('divergence');
    if (divergenceMaterial && divergence && velocity) {
      gl.viewport(0, 0, divergence.width, divergence.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, divergence.write.fbo);
      gl.uniform1i(divergenceMaterial.uniforms.uVelocity, velocity.read.attach(0));
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      divergence.swap();
    }

    // Clear pressure
    const clearMaterial = state.materials.get('clear');
    if (clearMaterial && pressure) {
      gl.viewport(0, 0, pressure.width, pressure.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
      gl.uniform1i(clearMaterial.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearMaterial.uniforms.value, config.PRESSURE);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      pressure.swap();
    }

    // Solve pressure
    const pressureMaterial = state.materials.get('pressure');
    if (pressureMaterial && pressure && divergence) {
      const iterations = config.PRESSURE_ITERATIONS;
      for (let i = 0; i < iterations; i++) {
        gl.viewport(0, 0, pressure.width, pressure.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
        gl.uniform1i(pressureMaterial.uniforms.uPressure, pressure.read.attach(0));
        gl.uniform1i(pressureMaterial.uniforms.uDivergence, divergence.read.attach(1));
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        pressure.swap();
      }
    }

    // Subtract gradient
    const gradientSubtractMaterial = state.materials.get('gradientSubtract');
    if (gradientSubtractMaterial && velocity && pressure) {
      gl.viewport(0, 0, velocity.width, velocity.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      gl.uniform1i(gradientSubtractMaterial.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradientSubtractMaterial.uniforms.uVelocity, velocity.read.attach(1));
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      velocity.swap();
    }

    // Advect velocity
    const advectionMaterial = state.materials.get('advection');
    if (advectionMaterial && velocity) {
      gl.viewport(0, 0, velocity.width, velocity.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);

      if (context.framebufferType === FramebufferType.HALF_FLOAT) {
        gl.uniform2f(
          advectionMaterial.uniforms.dyeTexelSize,
          velocity.texelSizeX,
          velocity.texelSizeY
        );
      } else {
        gl.uniform2f(
          advectionMaterial.uniforms.dyeTexelSize,
          velocity.texelSizeX,
          velocity.texelSizeY
        );
      }

      gl.uniform1i(advectionMaterial.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionMaterial.uniforms.uSource, velocity.read.attach(0));
      gl.uniform1f(advectionMaterial.uniforms.dt, dt);
      gl.uniform1f(advectionMaterial.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      velocity.swap();
    }

    // Advect dye
    if (advectionMaterial && state.dye && velocity) {
      gl.viewport(0, 0, state.dye.width, state.dye.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, state.dye.write.fbo);

      if (context.framebufferType === FramebufferType.HALF_FLOAT) {
        gl.uniform2f(
          advectionMaterial.uniforms.dyeTexelSize,
          state.dye.texelSizeX,
          state.dye.texelSizeY
        );
      } else {
        gl.uniform2f(
          advectionMaterial.uniforms.dyeTexelSize,
          state.dye.texelSizeX,
          state.dye.texelSizeY
        );
      }

      gl.uniform1i(advectionMaterial.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionMaterial.uniforms.uSource, state.dye.read.attach(1));
      gl.uniform1f(advectionMaterial.uniforms.dt, dt);
      gl.uniform1f(advectionMaterial.uniforms.dissipation, config.DENSITY_DISSIPATION);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      state.dye.swap();
    }
  }, []);

  /**
   * Apply all pointer inputs to the simulation
   */
  const applyInputs = useCallback(() => {
    const state = stateRef.current;
    if (!state.pointers.length || !state.context) return;

    const { config, context, velocity, dye } = state;
    const { gl } = context;

    state.pointers.forEach(pointer => {
      if (!pointer.moved) return;

      const splatMaterial = state.materials.get('splat');
      if (!splatMaterial) return;

      // Apply splats to velocity framebuffer
      gl.viewport(0, 0, velocity!.width, velocity!.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity!.write.fbo);
      gl.uniform1i(splatMaterial.uniforms.uTarget, velocity!.read.attach(0));
      gl.uniform1f(splatMaterial.uniforms.aspectRatio, gl.canvas.width / gl.canvas.height);
      gl.uniform2f(splatMaterial.uniforms.point, pointer.x, pointer.y);
      gl.uniform3f(splatMaterial.uniforms.color, pointer.dx, pointer.dy, 0.0);
      gl.uniform1f(splatMaterial.uniforms.radius, config.SPLAT_RADIUS / 100.0);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      velocity!.swap();

      // Apply splats to dye framebuffer
      gl.viewport(0, 0, dye!.width, dye!.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, dye!.write.fbo);
      gl.uniform1i(splatMaterial.uniforms.uTarget, dye!.read.attach(0));
      gl.uniform3f(splatMaterial.uniforms.color, pointer.color.r, pointer.color.g, pointer.color.b);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      dye!.swap();
    });
  }, []);

  /**
   * Initialize framebuffers for rendering
   */
  const initFramebuffers = useCallback(() => {
    const state = stateRef.current;
    const { context, config } = state;
    if (!context) return;

    const { gl, framebufferType } = context;
    const simRes = getResolution(config.SIM_RESOLUTION);
    const dyeRes = getResolution(config.DYE_RESOLUTION);

    // Double framebuffers for ping-pong technique
    state.dye = createDoubleFBO(context, dyeRes.width, dyeRes.height, gl.RGBA, framebufferType);
    state.velocity = createDoubleFBO(context, simRes.width, simRes.height, GL_RG, framebufferType);
    state.divergence = createDoubleFBO(
      context,
      simRes.width,
      simRes.height,
      GL_RED,
      framebufferType
    );
    state.curl = createDoubleFBO(context, simRes.width, simRes.height, GL_RED, framebufferType);
    state.pressure = createDoubleFBO(context, simRes.width, simRes.height, GL_RED, framebufferType);
  }, [getResolution]);

  /**
   * Update the nearest pointer to the current position
   */
  const updateNearestPointer = useCallback(
    (x: number, y: number, active: boolean) => {
      const state = stateRef.current;
      if (state.pointers.length === 0 && active) {
        const pointer = createPointer(x, y);
        state.pointers.push(pointer);
        return;
      }

      // Find and update the nearest pointer
      const pointer = state.pointers[0];
      if (pointer) {
        pointer.dx = x - pointer.x;
        pointer.dy = y - pointer.y;
        pointer.x = x;
        pointer.y = y;
        pointer.moved = true;
      }
    },
    [createPointer]
  );

  /**
   * Main animation loop
   */
  const animate = useCallback(() => {
    const state = stateRef.current;
    if (!state.mounted) return;

    const animationId = requestAnimationFrame(animate);
    state.animations.push(animationId);

    // Skip if paused
    if (state.config.PAUSED) return;

    // Calculate delta time
    const now = Date.now();
    let dt = (now - state.lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016); // Cap to 60fps equivalent
    state.lastUpdateTime = now;

    // Resize canvas if needed
    if (state.canvas && resizeCanvas(state.canvas)) {
      initFramebuffers();
    }

    // Update simulation steps
    updateColors(dt);
    updatePointers();
    applyInputs();
    step(dt);
    render();
  }, [applyInputs, initFramebuffers, render, step, updateColors, updatePointers]);

  /**
   * Initialize WebGL context and materials
   */
  const initializeContext = useCallback(() => {
    const state = stateRef.current;
    const canvas = state.canvas;
    if (!canvas) return;

    // Set up WebGL context and extensions
    const gl = canvas.getContext('webgl', {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false
    }) as WebGLRenderingContext;

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Initialize WebGL context with extensions and framebuffer support
    const context = initializeWebGLContext(gl);
    state.context = context;

    // Create default quad for rendering
    createQuad(gl);

    // Set up materials with shaders
    state.materials.set('copy', createMaterial(gl, BASE_VERTEX_SHADER, COPY_SHADER));
    state.materials.set('clear', createMaterial(gl, BASE_VERTEX_SHADER, CLEAR_SHADER));
    state.materials.set('color', createMaterial(gl, BASE_VERTEX_SHADER, COLOR_SHADER));
    state.materials.set('display', createMaterial(gl, BASE_VERTEX_SHADER, DISPLAY_SHADER));
    state.materials.set(
      'displayBloom',
      createMaterial(gl, BASE_VERTEX_SHADER, DISPLAY_BLOOM_SHADER)
    );
    state.materials.set('splat', createMaterial(gl, BASE_VERTEX_SHADER, SPLAT_SHADER));
    state.materials.set('advection', createMaterial(gl, BASE_VERTEX_SHADER, ADVECTION_SHADER));
    state.materials.set('divergence', createMaterial(gl, BASE_VERTEX_SHADER, DIVERGENCE_SHADER));
    state.materials.set('curl', createMaterial(gl, BASE_VERTEX_SHADER, CURL_SHADER));
    state.materials.set('vorticity', createMaterial(gl, BASE_VERTEX_SHADER, VORTICITY_SHADER));
    state.materials.set('pressure', createMaterial(gl, BASE_VERTEX_SHADER, PRESSURE_SHADER));
    state.materials.set(
      'gradientSubtract',
      createMaterial(gl, BASE_VERTEX_SHADER, GRADIENT_SUBTRACT_SHADER)
    );

    // Bloom materials
    state.materials.set(
      'bloomPrefilter',
      createMaterial(gl, BASE_VERTEX_SHADER, BLOOM_PREFILTER_SHADER)
    );
    state.materials.set('bloomBlur', createMaterial(gl, BASE_VERTEX_SHADER, BLOOM_BLUR_SHADER));
    state.materials.set('bloomFinal', createMaterial(gl, BASE_VERTEX_SHADER, BLOOM_FINAL_SHADER));

    // Initialize framebuffers
    initFramebuffers();

    // Start animation loop
    animate();
  }, [animate, initFramebuffers]);

  // Event Handlers
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const state = stateRef.current;
      const canvas = state.canvas;
      if (!canvas) return;

      const [x, y] = updatePointerPosition(e, canvas);
      const pointer = createPointer(x, y);
      state.pointers.push(pointer);
    },
    [createPointer]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const state = stateRef.current;
      const canvas = state.canvas;
      if (!canvas) return;

      const [x, y] = updatePointerPosition(e, canvas);
      updateNearestPointer(x, y, e.buttons > 0);
    },
    [updateNearestPointer]
  );

  const handleMouseUp = useCallback(() => {
    const state = stateRef.current;
    state.pointers = [];
  }, []);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const state = stateRef.current;
      const canvas = state.canvas;
      if (!canvas) return;
      e.preventDefault();

      const [x, y] = updatePointerPosition(e, canvas);
      const pointer = createPointer(x, y);
      state.pointers.push(pointer);
    },
    [createPointer]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const state = stateRef.current;
      const canvas = state.canvas;
      if (!canvas) return;
      e.preventDefault();

      const [x, y] = updatePointerPosition(e, canvas);
      updateNearestPointer(x, y, true);
    },
    [updateNearestPointer]
  );

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const state = stateRef.current;
    e.preventDefault();
    state.pointers = [];
  }, []);

  // Component lifecycle hooks
  useEffect(() => {
    const state = stateRef.current;
    state.mounted = true;

    if (canvasRef.current) {
      state.canvas = canvasRef.current;
      initializeContext();

      // Set up event listeners
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    // Cleanup
    return () => {
      state.mounted = false;

      // Cancel all animation frames
      state.animations.forEach(id => cancelAnimationFrame(id));
      state.animations = [];

      // Remove event listeners
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    initializeContext
  ]);

  return { canvasRef };
}
