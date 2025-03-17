/**
 * Utility functions for the Orb animation component
 */

import { Program, Renderer, Triangle, Vec3 } from 'ogl';
import { ORB_HOVER_DETECTION_RADIUS } from './orb.constants';

// Define OGL's extended WebGL context type
type OGLRenderingContext = WebGLRenderingContext & {
  renderer: Renderer;
  canvas: HTMLCanvasElement;
};

/**
 * Resize handler for WebGL canvas
 *
 * @param container - The container element
 * @param renderer - OGL renderer instance
 * @param gl - WebGL context from OGL
 * @param program - OGL shader program
 */
export const resizeOrbCanvas = (
  container: HTMLElement,
  renderer: Renderer,
  gl: OGLRenderingContext,
  program: Program
) => {
  const dpr = window.devicePixelRatio || 1;
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width * dpr, height * dpr);
  gl.canvas.style.width = width + 'px';
  gl.canvas.style.height = height + 'px';
  program.uniforms.iResolution.value.set(
    gl.canvas.width,
    gl.canvas.height,
    gl.canvas.width / gl.canvas.height
  );
};

/**
 * Initialize the WebGL renderer and canvas
 *
 * @param container - The container element
 * @returns Object containing renderer and WebGL context or null if initialization failed
 */
export const initializeOrbRenderer = (container: HTMLElement) => {
  const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
  const gl = renderer.gl as OGLRenderingContext;
  gl.clearColor(0, 0, 0, 0);
  container.appendChild(gl.canvas);

  return { renderer, gl };
};

/**
 * Create the geometry and shader program
 *
 * @param gl - WebGL context from OGL
 * @param vertexShader - Vertex shader source
 * @param fragmentShader - Fragment shader source
 * @param uniforms - Initial uniform values
 * @returns Created program and geometry
 */
export const createOrbProgram = (
  gl: OGLRenderingContext,
  vertexShader: string,
  fragmentShader: string,
  uniforms: Record<string, { value: number | Vec3 }>
) => {
  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms
  });

  return { geometry, program };
};

/**
 * Calculate if mouse position is hovering over the orb
 *
 * @param container - The container element
 * @param mouseX - Mouse X position
 * @param mouseY - Mouse Y position
 * @returns Boolean indicating if mouse is hovering over the orb
 */
export const isHoveringOverOrb = (
  container: HTMLElement,
  mouseX: number,
  mouseY: number
): boolean => {
  const rect = container.getBoundingClientRect();
  const x = mouseX - rect.left;
  const y = mouseY - rect.top;
  const width = rect.width;
  const height = rect.height;
  const size = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const uvX = ((x - centerX) / size) * 2.0;
  const uvY = ((y - centerY) / size) * 2.0;

  return Math.sqrt(uvX * uvX + uvY * uvY) < ORB_HOVER_DETECTION_RADIUS;
};

/**
 * Clean up WebGL resources
 *
 * @param gl - WebGL context from OGL
 * @param container - The container element
 */
export const cleanupOrbResources = (gl: OGLRenderingContext, container: HTMLElement) => {
  if (gl.canvas instanceof HTMLCanvasElement) {
    container.removeChild(gl.canvas);
  }
  gl.getExtension('WEBGL_lose_context')?.loseContext();
};
