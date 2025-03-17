/**
 * TrailingCursor Utilities Module
 *
 * Utility functions for the TrailingCursor component including particle creation,
 * canvas setup, and position calculation functions.
 *
 * @module TrailingCursorUtils
 */
import type { Particle } from './trailing-cursor.types';

/**
 * Creates a particle for the trailing cursor effect
 *
 * @param x - Initial x position
 * @param y - Initial y position
 * @param image - Image to use for the particle
 * @returns A new Particle object
 */
export function createParticle(x: number, y: number, image: HTMLImageElement): Particle {
  return {
    position: { x, y },
    image,
    move(context: CanvasRenderingContext2D) {
      context.drawImage(this.image, this.position.x, this.position.y);
    }
  };
}

/**
 * Sets up the canvas element based on target element or body.
 * Configures canvas size, styles, and position.
 *
 * @param canvas - Canvas element to set up
 * @param targetElement - Target element to attach canvas to
 * @param hasWrapperEl - Whether a wrapper element is provided
 * @returns The configured canvas
 */
export function setupCanvas(
  canvas: HTMLCanvasElement,
  targetElement: HTMLElement,
  hasWrapperEl: boolean
): HTMLCanvasElement {
  // Set common styles
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  canvas.style.transform = 'translateZ(0)';

  if (hasWrapperEl) {
    canvas.style.position = 'absolute';
    targetElement.appendChild(canvas);
    canvas.width = targetElement.clientWidth;
    canvas.height = targetElement.clientHeight;
  } else {
    canvas.style.position = 'fixed';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  return canvas;
}

/**
 * Calculates cursor position relative to target element
 *
 * @param e - Mouse event containing cursor information
 * @param element - Optional wrapper element
 * @param hasWrapperEl - Whether a wrapper element is provided
 * @returns Calculated cursor position
 */
export function calculateCursorPosition(
  e: MouseEvent,
  element?: HTMLElement,
  hasWrapperEl = false
): { x: number; y: number } {
  if (hasWrapperEl && element) {
    const boundingRect = element.getBoundingClientRect();
    return {
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
    };
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
}
