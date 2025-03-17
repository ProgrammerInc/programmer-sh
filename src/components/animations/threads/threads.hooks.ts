/**
 * Custom hooks for the Threads animation component
 */

import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';
import { RefObject, useEffect, useRef } from 'react';
import { DEFAULT_SETTINGS, GL_SETTINGS, SHADERS, SHADER_SETTINGS } from './threads.constants';
import {
  createFloat32Array,
  getNormalizedMousePosition,
  smoothMouseMovement
} from './threads.utils';

/**
 * Interface for objects with a remove method
 */
interface Removable {
  remove: () => void;
  [key: string]: unknown;
}

/**
 * Type guard to check if an object has a remove method
 *
 * @param obj - Object to check
 * @returns True if the object has a remove method
 */
function isRemovable(obj: unknown): obj is Removable {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'remove' in obj &&
    typeof (obj as Removable).remove === 'function'
  );
}

/**
 * Hook to setup and run the threads WebGL animation
 *
 * @param containerRef - Reference to the container element
 * @param color - RGB color array for threads
 * @param amplitude - Amplitude of thread movement
 * @param distance - Distance between threads
 * @param enableMouseInteraction - Whether to enable mouse interaction
 * @returns Animation frame ID reference for cleanup
 */
export const useThreadsAnimation = (
  containerRef: RefObject<HTMLDivElement>,
  color: [number, number, number] = DEFAULT_SETTINGS.COLOR,
  amplitude: number = DEFAULT_SETTINGS.AMPLITUDE,
  distance: number = DEFAULT_SETTINGS.DISTANCE,
  enableMouseInteraction: boolean = DEFAULT_SETTINGS.ENABLE_MOUSE_INTERACTION
) => {
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Create renderer
    const renderer = new Renderer({
      dpr: window.devicePixelRatio,
      alpha: true
    });

    const gl = renderer.gl;

    // Setup WebGL context
    gl.clearColor(
      GL_SETTINGS.CLEAR_COLOR[0],
      GL_SETTINGS.CLEAR_COLOR[1],
      GL_SETTINGS.CLEAR_COLOR[2],
      GL_SETTINGS.CLEAR_COLOR[3]
    );
    gl.enable(gl.BLEND);
    gl.blendFunc(GL_SETTINGS.SRC_BLEND, GL_SETTINGS.DST_BLEND);
    container.appendChild(gl.canvas);

    // Create geometry and shader program
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: SHADERS.VERTEX,
      fragment: SHADERS.FRAGMENT,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: createFloat32Array([0.5, 0.5]) }
      }
    });

    // Create mesh
    const mesh = new Mesh(gl, { geometry, program });

    // Handle resize
    function resize() {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value = new Color(
        clientWidth,
        clientHeight,
        clientWidth / clientHeight
      );
    }
    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking variables
    const currentMouse: [number, number] = [0.5, 0.5];
    let targetMouse: [number, number] = [0.5, 0.5];

    // Mouse event handlers
    function handleMouseMove(e: MouseEvent) {
      targetMouse = getNormalizedMousePosition(e, container);
    }

    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }

    // Add mouse event listeners if interaction is enabled
    if (enableMouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    function update(t: number) {
      if (enableMouseInteraction) {
        // Smooth mouse movement
        const updatedPosition = smoothMouseMovement(
          currentMouse,
          targetMouse,
          SHADER_SETTINGS.MOUSE_SMOOTHING
        );
        currentMouse[0] = updatedPosition[0];
        currentMouse[1] = updatedPosition[1];
        program.uniforms.uMouse.value = createFloat32Array(currentMouse);
      }

      // Update time uniform
      program.uniforms.iTime.value = t * 0.001;

      // Render the scene
      renderer.render({ scene: mesh });

      // Request next frame
      animationFrameId.current = requestAnimationFrame(update);
    }

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(update);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      container.removeChild(gl.canvas);
      // Dispose of WebGL resources
      program.remove();
      geometry.remove();

      // Use type-safe approach to handle mesh cleanup
      if (isRemovable(mesh)) {
        mesh.remove();
      } else {
        // Fallback cleanup if remove is not available
        mesh.geometry = null;
        mesh.program = null;
      }

      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [containerRef, color, amplitude, distance, enableMouseInteraction]);

  return animationFrameId;
};
