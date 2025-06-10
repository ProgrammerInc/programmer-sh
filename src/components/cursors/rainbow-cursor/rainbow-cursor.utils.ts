/**
 * Rainbow Cursor Utilities Module
 *
 * Utility functions for the Rainbow Cursor component, including particle creation,
 * color manipulation, size calculations, and canvas operations.
 *
 * @module RainbowCursorUtils
 */
import type { CursorPosition, Particle } from './rainbow-cursor.types';

/**
 * Creates a new Particle at the specified position.
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @returns A new Particle object
 */
export const createParticle = (x: number, y: number): Particle => ({
  position: { x, y }
});

/**
 * Interpolates between two colors.
 * Converts hex colors to RGB, calculates intermediate values, and converts back to hex.
 *
 * @param color1 - First color in hex format (e.g. '#FF0000')
 * @param color2 - Second color in hex format (e.g. '#00FF00')
 * @param factor - Interpolation factor (0-1 where 0 is color1 and 1 is color2)
 * @returns Interpolated color in rgb format
 */
export const interpolateColors = (color1: string, color2: string, factor: number): string => {
  const r1 = parseInt(color1.substr(1, 2), 16);
  const g1 = parseInt(color1.substr(3, 2), 16);
  const b1 = parseInt(color1.substr(5, 2), 16);

  const r2 = parseInt(color2.substr(1, 2), 16);
  const g2 = parseInt(color2.substr(3, 2), 16);
  const b2 = parseInt(color2.substr(5, 2), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Calculates the current size based on pulse animation.
 * Uses the sine function to create a smooth pulsing effect.
 *
 * @param baseSize - Base size in pixels
 * @param time - Current time for animation
 * @param pulseSpeed - Speed of pulsing
 * @param pulseMin - Minimum scale factor
 * @param pulseMax - Maximum scale factor
 * @returns Current size with pulse effect applied
 */
export const getPulseSize = (
  baseSize: number,
  time: number,
  pulseSpeed: number,
  pulseMin: number,
  pulseMax: number
): number => {
  const pulse = Math.sin(time * pulseSpeed);
  const scaleFactor = pulseMin + ((pulse + 1) * (pulseMax - pulseMin)) / 2;
  return baseSize * scaleFactor;
};

/**
 * Sets up canvas styles based on whether it's attached to a wrapper element or the body.
 * Applies basic styles and adjusts position accordingly.
 *
 * @param canvas - Canvas element to style
 * @param hasWrapperEl - Whether the canvas is attached to a wrapper element
 * @param styles - Basic canvas styles to apply
 */
export const setupCanvasStyles = (
  canvas: HTMLCanvasElement,
  hasWrapperEl: boolean,
  styles: Record<string, string>
): void => {
  Object.entries(styles).forEach(([property, value]) => {
    Object.assign(canvas.style, { [property]: value });
  });

  canvas.style.position = hasWrapperEl ? 'absolute' : 'fixed';
};

/**
 * Resizes the canvas to match the container dimensions.
 * If attached to a wrapper element, uses its dimensions; otherwise, uses the window dimensions.
 *
 * @param canvas - Canvas element to resize
 * @param hasWrapperEl - Whether the canvas is attached to a wrapper element
 * @param element - Optional wrapper element
 */
export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  hasWrapperEl: boolean,
  element?: HTMLElement
): void => {
  if (hasWrapperEl && element) {
    canvas.width = element.clientWidth;
    canvas.height = element.clientHeight;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
};

/**
 * Updates cursor position based on mouse event and container.
 * If attached to a wrapper element, adjusts coordinates accordingly.
 *
 * @param e - Mouse event
 * @param hasWrapperEl - Whether the cursor is attached to a wrapper element
 * @param element - Optional wrapper element
 * @returns New cursor position
 */
export const updateCursorPosition = (
  e: MouseEvent,
  hasWrapperEl: boolean,
  element?: HTMLElement
): CursorPosition => {
  if (hasWrapperEl && element) {
    const boundingRect = element.getBoundingClientRect();
    return {
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
    };
  }

  return {
    x: e.clientX,
    y: e.clientY
  };
};
