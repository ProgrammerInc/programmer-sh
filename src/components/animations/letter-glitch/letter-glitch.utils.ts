import { LETTERS_AND_SYMBOLS } from './letter-glitch.constants';
import { RGB } from './letter-glitch.types';

/**
 * Gets a random character from the predefined letters and symbols array.
 *
 * @returns {string} A random character
 */
export function getRandomChar(): string {
  return LETTERS_AND_SYMBOLS[Math.floor(Math.random() * LETTERS_AND_SYMBOLS.length)];
}

/**
 * Gets a random color from the provided array of colors.
 *
 * @param {string[]} colors - Array of color strings to choose from
 * @returns {string} A random color from the provided array
 */
export function getRandomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Converts a hexadecimal color string to an RGB object.
 * Supports both short (#RGB) and long (#RRGGBB) hex formats.
 *
 * @param {string} hex - The hexadecimal color string
 * @returns {RGB | null} An RGB object or null if the format is invalid
 */
export function hexToRgb(hex: string): RGB | null {
  // Convert shorthand hex to full format
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => {
    return r + r + g + g + b + b;
  });

  // Extract RGB components
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * Linearly interpolates between two RGB colors.
 *
 * @param {RGB} start - The starting RGB color
 * @param {RGB} end - The ending RGB color
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {string} The interpolated color as an RGB string
 */
export function interpolateColor(start: RGB, end: RGB, factor: number): string {
  const result = {
    r: Math.round(start.r + (end.r - start.r) * factor),
    g: Math.round(start.g + (end.g - start.g) * factor),
    b: Math.round(start.b + (end.b - start.b) * factor)
  };

  return `rgb(${result.r}, ${result.g}, ${result.b})`;
}

/**
 * Calculates the grid dimensions based on canvas size and character dimensions.
 *
 * @param {number} width - The canvas width
 * @param {number} height - The canvas height
 * @param {number} charWidth - The width of each character
 * @param {number} charHeight - The height of each character
 * @returns {{ columns: number, rows: number }} The calculated grid dimensions
 */
export function calculateGrid(
  width: number,
  height: number,
  charWidth: number,
  charHeight: number
): { columns: number; rows: number } {
  const columns = Math.ceil(width / charWidth);
  const rows = Math.ceil(height / charHeight);
  return { columns, rows };
}
