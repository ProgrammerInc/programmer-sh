/**
 * Utility functions for the Circular Gallery component
 */

import { Texture } from 'ogl';
import { GL } from './circular-gallery.types';

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func - The function to debounce
 * @param wait - The time to wait in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number;
  return function(this: unknown, ...args: Parameters<T>): void {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Linear interpolation between two values
 * @param p1 - Start value
 * @param p2 - End value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

/**
 * Automatically bind all methods to a class instance
 * @param instance - The class instance
 */
export function autoBind<T extends object>(instance: T): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof (instance as Record<string, unknown>)[key] === 'function') {
      (instance as Record<string, unknown>)[key] = ((instance as Record<string, unknown>)[key] as ((...args: unknown[]) => unknown)).bind(instance);
    }
  });
}

/**
 * Extract font size from a CSS font string
 * @param font - CSS font string (e.g., 'bold 30px monospace')
 * @returns The font size as a number
 */
export function getFontSize(font: string): number {
  const match = font.match(/\d+px/);
  return match ? parseInt(match[0], 10) : 30;
}

/**
 * Create a texture from text
 * @param gl - WebGL context
 * @param text - Text to render
 * @param font - CSS font string
 * @param color - Text color
 * @returns Texture object with dimensions
 */
export function createTextTexture(
  gl: GL,
  text: string,
  font: string = 'bold 30px monospace',
  color: string = 'black'
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get 2d context');

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);

  canvas.width = textWidth + 20;
  canvas.height = textHeight;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = font;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { image: canvas });

  return { texture, width: canvas.width, height: canvas.height };
}
