/**
 * Utility functions for the Liquid Chrome animation component
 */

import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { asOGLRendererContext } from './liquid-chrome.ogl-types';
import { MouseMoveHandler, TouchMoveHandler } from './liquid-chrome.types';

/**
 * Creates a WebGL renderer with appropriate settings
 * @returns Configured OGL renderer
 */
export function createRenderer(): Renderer {
  // Enable built-in antialiasing
  return new Renderer({ antialias: true });
}

/**
 * Sets up the WebGL context with initial settings
 * @param gl - WebGL rendering context
 */
export function setupGLContext(gl: WebGLRenderingContext): void {
  gl.clearColor(1, 1, 1, 1);
}

/**
 * Creates a triangle mesh with the provided shader program
 * @param gl - WebGL rendering context
 * @param program - Compiled shader program
 * @returns OGL mesh
 */
export function createMesh(gl: WebGLRenderingContext, program: Program): Mesh {
  // Convert WebGL context to OGL-compatible context using the helper function
  const oglContext = asOGLRendererContext(gl);

  // Create geometry with the WebGL context
  const geometry = new Triangle(oglContext);

  // Create and return the mesh
  return new Mesh(oglContext, {
    geometry,
    program
  });
}

/**
 * Creates a mouse move handler function
 * @param container - The container element
 * @param mouseUniform - The uniform array to update with mouse position
 * @returns A function to handle mouse movement
 */
export function createMouseMoveHandler(
  container: HTMLDivElement,
  mouseUniform: Float32Array
): MouseMoveHandler {
  return (event: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    mouseUniform[0] = x;
    mouseUniform[1] = y;
  };
}

/**
 * Creates a touch move handler function
 * @param container - The container element
 * @param mouseUniform - The uniform array to update with touch position
 * @returns A function to handle touch movement
 */
export function createTouchMoveHandler(
  container: HTMLDivElement,
  mouseUniform: Float32Array
): TouchMoveHandler {
  return (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const rect = container.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width;
      const y = 1 - (touch.clientY - rect.top) / rect.height;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }
  };
}
