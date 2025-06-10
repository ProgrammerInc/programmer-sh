/* eslint-disable no-secrets/no-secrets */
import { useCallback, useEffect, useRef } from 'react';
import { FRAGMENT_SHADER, FULL_SCREEN_QUAD_VERTICES, VERTEX_SHADER } from './lightning.constants';
import { LightningUniforms } from './lightning.types';
import {
  compileShader,
  createProgram,
  getUniformLocations,
  resizeCanvas,
  setupVertexBuffer
} from './lightning.utils';

/**
 * Custom hook to manage the WebGL lightning effect.
 *
 * @param {number} hue - The hue value for the lightning color
 * @param {number} xOffset - Horizontal offset for the lightning effect
 * @param {number} speed - Animation speed multiplier
 * @param {number} intensity - Intensity of the lightning effect
 * @param {number} size - Size multiplier for the lightning effect
 * @returns {{ canvasRef: React.RefObject<HTMLCanvasElement> }} Object containing canvas ref
 */
export function useLightningEffect(
  hue: number,
  xOffset: number,
  speed: number,
  intensity: number,
  size: number
) {
  // Canvas reference
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation references
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // WebGL references
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<LightningUniforms | null>(null);

  /**
   * Handles window resize events.
   */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !glRef.current) return;

    resizeCanvas(canvas);
    glRef.current.viewport(0, 0, canvas.width, canvas.height);
  }, []);

  /**
   * Sets up the WebGL context, shaders, and buffers.
   */
  const setupWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    // Get WebGL context
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return false;
    }
    glRef.current = gl;

    // Compile shaders
    const vertexResult = compileShader(gl, VERTEX_SHADER, gl.VERTEX_SHADER);
    const fragmentResult = compileShader(gl, FRAGMENT_SHADER, gl.FRAGMENT_SHADER);

    if (!vertexResult.success || !fragmentResult.success) {
      console.error('Shader compilation error:', vertexResult.error || fragmentResult.error);
      return false;
    }

    // Create and link program
    const programResult = createProgram(gl, vertexResult.shader!, fragmentResult.shader!);
    if (!programResult.success) {
      console.error('Program linking error:', programResult.error);
      return false;
    }
    programRef.current = programResult.program;
    gl.useProgram(programResult.program);

    // Setup vertex buffer
    if (!setupVertexBuffer(gl, FULL_SCREEN_QUAD_VERTICES, programResult.program)) {
      console.error('Failed to setup vertex buffer');
      return false;
    }

    // Get uniform locations
    uniformsRef.current = getUniformLocations(gl, programResult.program);

    // Record start time
    startTimeRef.current = performance.now();

    return true;
  }, []);

  /**
   * Render function for the animation frame.
   */
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    const uniforms = uniformsRef.current;

    if (!canvas || !gl || !uniforms || !programRef.current) return;

    // Update canvas size if needed
    handleResize();

    // Set time and resolution uniforms
    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTimeRef.current) / 1000.0;

    gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.iTime, elapsedTime);
    gl.uniform1f(uniforms.uHue, hue);
    gl.uniform1f(uniforms.uXOffset, xOffset);
    gl.uniform1f(uniforms.uSpeed, speed);
    gl.uniform1f(uniforms.uIntensity, intensity);
    gl.uniform1f(uniforms.uSize, size);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Request next frame
    animationRef.current = requestAnimationFrame(render);
  }, [hue, xOffset, speed, intensity, size, handleResize]);

  /**
   * Initialize the effect on component mount.
   */
  const initializeEffect = useCallback(() => {
    if (setupWebGL()) {
      animationRef.current = requestAnimationFrame(render);
    }
  }, [setupWebGL, render]);

  /**
   * Clean up resources on component unmount.
   */
  const cleanupEffect = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const gl = glRef.current;
    if (gl && programRef.current) {
      // Clean up WebGL resources
      gl.useProgram(null);
      gl.deleteProgram(programRef.current);
      programRef.current = null;
    }
  }, []);

  // Setup effect on component mount
  useEffect(() => {
    initializeEffect();
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cleanupEffect();
      window.removeEventListener('resize', handleResize);
    };
  }, [initializeEffect, cleanupEffect, handleResize]);

  return { canvasRef };
}
