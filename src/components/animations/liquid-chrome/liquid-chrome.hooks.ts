/**
 * Custom hooks for the Liquid Chrome animation component
 */

import { Program } from 'ogl';
import { useEffect, useRef } from 'react';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './liquid-chrome.constants';
import {
  createMesh,
  createMouseMoveHandler,
  createRenderer,
  createTouchMoveHandler,
  setupGLContext
} from './liquid-chrome.utils';

/**
 * Hook to set up and manage the Liquid Chrome WebGL animation
 * @param baseColor - RGB color array for the base color (0-1 scale)
 * @param speed - Animation speed multiplier
 * @param amplitude - Amplitude of distortion
 * @param frequencyX - X-axis frequency modifier
 * @param frequencyY - Y-axis frequency modifier
 * @param interactive - Whether to enable mouse/touch interaction
 * @returns containerRef to attach to the container element
 */
export function useLiquidChromeEffect(
  baseColor: [number, number, number],
  speed: number,
  amplitude: number,
  frequencyX: number,
  frequencyY: number,
  interactive: boolean
) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = createRenderer();
    const gl = renderer.gl;
    setupGLContext(gl);

    // Create program with uniforms
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ])
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) }
      }
    });

    const mesh = createMesh(gl, program);

    // Resize handler
    const resizeHandler = () => {
      const scale = 1;
      renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);
      const resUniform = program.uniforms.uResolution.value as Float32Array;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    // Mouse and touch event handlers
    const mouseUniform = program.uniforms.uMouse.value as Float32Array;
    const handleMouseMove = createMouseMoveHandler(container, mouseUniform);
    const handleTouchMove = createTouchMoveHandler(container, mouseUniform);

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleTouchMove);
    }

    // Animation loop
    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);
      // Multiply time by speed to adjust the animation rate
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeHandler);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      // Release WebGL context to prevent memory leaks
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return containerRef;
}
