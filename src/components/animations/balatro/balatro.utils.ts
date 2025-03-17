/**
 * Utility functions for the Balatro component
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind's class merging
 *
 * @param inputs - Class values to be merged
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a hex color string to RGBA vector
 *
 * @param hex - Hex color string (e.g., '#FF5500')
 * @returns RGBA vector as [r, g, b, a] with values from 0-1
 */
export function hexToVec4(hex: string): [number, number, number, number] {
  // Ensure the hex has a # at the start
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Parse the RGB components
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  // Return with alpha = 1
  return [r, g, b, 1];
}

/**
 * Creates configuration for WebGL canvas styling
 *
 * @returns Object with CSS properties for the canvas
 */
export function createCanvasStyles() {
  return {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  } as const;
}

/**
 * Sets up canvas accessibility attributes
 *
 * @param canvas - The WebGL canvas element
 */
export function setupCanvasAccessibility(canvas: HTMLCanvasElement) {
  canvas.setAttribute('aria-hidden', 'true');
}

/**
 * Safely cleans up WebGL context
 *
 * @param gl - The WebGL rendering context
 */
export function cleanupWebGLContext(gl: WebGLRenderingContext) {
  gl.getExtension('WEBGL_lose_context')?.loseContext();
}
