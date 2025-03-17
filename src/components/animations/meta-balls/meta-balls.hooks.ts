/**
 * Hooks for the Meta Balls animation component
 */

import { Camera, Mesh, Program, Renderer, Transform, Triangle, Vec3 } from 'ogl';
import { RefObject, useEffect } from 'react';
import {
  DEFAULT_ALPHA,
  DEFAULT_CAMERA_SETTINGS,
  DEFAULT_CAMERA_Z_POSITION,
  DEFAULT_CURSOR_ORBIT_FACTOR,
  DEFAULT_DPR,
  DEFAULT_PREMULTIPLIED_ALPHA,
  FRAGMENT_SHADER,
  MAX_METABALLS,
  VERTEX_SHADER
} from './meta-balls.constants';
import { MouseBallPosition, ShaderUniforms } from './meta-balls.types';
import {
  calculateOrbitPosition,
  generateAllBallParams,
  parseHexColor,
  updateBallPosition
} from './meta-balls.utils';

/**
 * Hook that manages the Meta Balls animation and WebGL rendering
 *
 * @param containerRef - Reference to the container element
 * @param color - Color for metaballs
 * @param cursorBallColor - Color for cursor metaball
 * @param speed - Animation speed factor
 * @param enableMouseInteraction - Whether to enable mouse interaction
 * @param hoverSmoothness - Smoothness of hovering effect
 * @param animationSize - Size of the animation relative to screen
 * @param ballCount - Number of metaballs to render
 * @param clumpFactor - How closely the balls clump together
 * @param cursorBallSize - Size of the cursor-following metaball
 * @param enableTransparency - Whether to enable transparency
 */
export function useMetaBallsEffect(
  containerRef: RefObject<HTMLDivElement>,
  color: string,
  cursorBallColor: string,
  speed: number,
  enableMouseInteraction: boolean,
  hoverSmoothness: number,
  animationSize: number,
  ballCount: number,
  clumpFactor: number,
  cursorBallSize: number,
  enableTransparency: boolean
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize renderer
    const dpr = DEFAULT_DPR;
    const renderer = new Renderer({
      dpr,
      alpha: DEFAULT_ALPHA,
      premultipliedAlpha: DEFAULT_PREMULTIPLIED_ALPHA
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
    container.appendChild(gl.canvas);

    // Set up camera
    const camera = new Camera(gl, DEFAULT_CAMERA_SETTINGS);
    camera.position.z = DEFAULT_CAMERA_Z_POSITION;

    // Create geometry and parse colors
    const geometry = new Triangle(gl);
    const [r1, g1, b1] = parseHexColor(color);
    const [r2, g2, b2] = parseHexColor(cursorBallColor);

    // Initialize metaball uniforms
    const metaBallsUniform: Vec3[] = [];
    for (let i = 0; i < MAX_METABALLS; i++) {
      metaBallsUniform.push(new Vec3(0, 0, 0));
    }

    // Create shader program with uniforms
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(r1, g1, b1) },
        iCursorColor: { value: new Vec3(r2, g2, b2) },
        iAnimationSize: { value: animationSize },
        iBallCount: { value: ballCount },
        iCursorBallSize: { value: cursorBallSize },
        iMetaBalls: { value: metaBallsUniform },
        iClumpFactor: { value: clumpFactor },
        enableTransparency: { value: enableTransparency }
      } as ShaderUniforms
    });

    // Create mesh and scene
    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    // Generate ball parameters and initialize mouse position
    const effectiveBallCount = Math.min(ballCount, MAX_METABALLS);
    const ballParams = generateAllBallParams(effectiveBallCount);
    const mouseBallPos: MouseBallPosition = { x: 0, y: 0 };
    let pointerInside = false;
    let pointerX = 0;
    let pointerY = 0;

    // Handle window resizing
    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = `${width}px`;
      gl.canvas.style.height = `${height}px`;
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    // Mouse event handlers
    function onPointerMove(e: PointerEvent) {
      if (!enableMouseInteraction || !container) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      pointerX = (px / rect.width) * gl.canvas.width;
      pointerY = (1 - py / rect.height) * gl.canvas.height;
    }

    function onPointerEnter() {
      if (!enableMouseInteraction) return;
      pointerInside = true;
    }

    function onPointerLeave() {
      if (!enableMouseInteraction) return;
      pointerInside = false;
    }

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);

    // Animation loop
    const startTime = performance.now();
    let animationFrameId: number;

    function update(t: number) {
      animationFrameId = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      program.uniforms.iTime.value = elapsed;

      // Update ball positions
      for (let i = 0; i < effectiveBallCount; i++) {
        const [posX, posY] = updateBallPosition(ballParams[i], elapsed, speed, clumpFactor);
        metaBallsUniform[i].set(posX, posY, ballParams[i].radius);
      }

      // Update mouse ball position
      let targetX: number, targetY: number;
      if (pointerInside) {
        targetX = pointerX;
        targetY = pointerY;
      } else {
        [targetX, targetY] = calculateOrbitPosition(
          gl.canvas.width,
          gl.canvas.height,
          elapsed,
          speed,
          DEFAULT_CURSOR_ORBIT_FACTOR
        );
      }

      // Apply smoothing to cursor movement
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);

      // Render the scene
      renderer.render({ scene, camera });
    }

    animationFrameId = requestAnimationFrame(update);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    containerRef,
    color,
    cursorBallColor,
    speed,
    enableMouseInteraction,
    hoverSmoothness,
    animationSize,
    ballCount,
    clumpFactor,
    cursorBallSize,
    enableTransparency
  ]);
}
