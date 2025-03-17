/**
 * Special type definitions for OGL compatibility
 *
 * This file contains type definitions to handle OGL library's specific
 * requirements while maintaining type safety.
 */

import { Renderer } from 'ogl';

/**
 * OGL's rendering context type
 * This is a specialized version of WebGLRenderingContext that OGL uses internally.
 * We define it here to avoid using 'any' while still allowing proper typing.
 */
export interface OGLRendererContext extends WebGLRenderingContext {
  /** Renderer instance attached to context by OGL */
  renderer: Renderer;
  /** Canvas element attached to context */
  canvas: HTMLCanvasElement;
  /** Additional properties that OGL may add */
  [key: string]: unknown;
}

/**
 * Type assertion helper to convert WebGLRenderingContext to OGLRendererContext
 * @param context - Standard WebGL context
 * @returns The same context cast as OGL's expected type
 */
export function asOGLRendererContext(context: WebGLRenderingContext): OGLRendererContext {
  return context as unknown as OGLRendererContext;
}
