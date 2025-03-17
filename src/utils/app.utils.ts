/**
 * Application Utility Functions
 *
 * This module provides common utility functions used throughout the application.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names with Tailwind's class merging
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Ensures a URL has https:// prefix
 *
 * @param url - URL to process
 * @returns URL with https:// prefix if not already present
 */
export const ensureHttps = (url: string): string => {
  if (!url) return url;
  return url.startsWith('http') ? url : `https://${url}`;
};

/**
 * Generates an array of unique random numbers within a range
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @param count - Number of random numbers to generate
 * @returns Array of unique random numbers
 */
export const genRandomNumbers = (min: number, max: number, count: number): number[] => {
  const arr: number[] = [];

  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
};

/**
 * Options for RGB color format
 */
export type RgbFormat = 'array' | 'object';

/**
 * RGB color array type
 */
export type RgbArray = [number, number, number];

/**
 * RGBA color array type
 */
export type RgbaArray = [number, number, number, number];

/**
 * RGB color object type
 */
export interface RgbObject {
  r: number;
  g: number;
  b: number;
}

/**
 * RGBA color object type
 */
export interface RgbaObject extends RgbObject {
  a: number;
}

/**
 * RGB color (either array or object format)
 */
export type RgbColor = RgbArray | RgbObject;

/**
 * RGBA color (either array or object format)
 */
export type RgbaColor = RgbaArray | RgbaObject;

/**
 * Any RGB(A) color format
 */
export type AnyRgbColor = RgbColor | RgbaColor;

/**
 * Converts a hex color string to RGB/RGBA values
 *
 * @param hex - Hex color string (e.g., '#ff0000' or 'ff0000')
 * @param convertToHue - Whether to convert values to 0-1 range instead of 0-255
 * @param alpha - Optional alpha value to include (null means RGB, not RGBA)
 * @param format - Output format ('array' or 'object')
 * @returns RGB/RGBA values in specified format
 * @throws Error if the hex color is invalid
 */
export const hexToRgb = (
  hex: string,
  convertToHue = false,
  alpha: number | null = null,
  format: RgbFormat = 'array'
): AnyRgbColor => {
  // Remove the hash if it exists
  const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle both 3-digit and 6-digit hex formats
  const normalizedHex =
    sanitizedHex.length === 3
      ? sanitizedHex
          .split('')
          .map(char => char + char)
          .join('')
      : sanitizedHex;

  if (normalizedHex.length !== 6 && normalizedHex.length !== 3) {
    throw new Error('Invalid hex color');
  }

  let r = parseInt(normalizedHex.substring(0, 2), 16);
  let g = parseInt(normalizedHex.substring(2, 4), 16);
  let b = parseInt(normalizedHex.substring(4, 6), 16);

  // Convert to 0-1 range if requested
  if (convertToHue) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
  }

  if (alpha !== null) {
    if (format === 'object') {
      return { r, g, b, a: alpha } as RgbaObject;
    } else {
      return [r, g, b, alpha] as RgbaArray;
    }
  } else {
    if (format === 'object') {
      return { r, g, b } as RgbObject;
    } else {
      return [r, g, b] as RgbArray;
    }
  }
};

/**
 * Converts a hex color string to an RGB array
 *
 * @param hex - Hex color string (e.g., '#ff0000' or 'ff0000')
 * @returns RGB values as a [r, g, b] array
 * @throws Error if the hex color is invalid
 */
export const hexToRgbArray = (hex: string): RgbArray => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    throw new Error('Invalid hex color');
  }

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
};

/**
 * Converts a hex color string to an RGB object
 *
 * @param hex - Hex color string (e.g., '#ff0000' or 'ff0000')
 * @returns RGB values as {r, g, b} object
 * @throws Error if the hex color is invalid
 */
export const hexToRgbObject = (hex: string): RgbObject => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    throw new Error('Invalid hex color');
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
};

/**
 * Converts a hex color string to normalized RGBA values (0-1 range)
 *
 * @param hex - Hex color string (e.g., '#ff0000' or 'ff0000')
 * @returns RGBA values as [r, g, b, a] array in 0-1 range
 * @throws Error if the hex color is invalid
 */
export const hexToVec4 = (hex: string): RgbaArray => {
  const hexStr = hex.replace('#', '');

  let r = 0,
    g = 0,
    b = 0,
    a = 1;

  if (hexStr.length === 6) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255;
    g = parseInt(hexStr.slice(2, 4), 16) / 255;
    b = parseInt(hexStr.slice(4, 6), 16) / 255;
  } else if (hexStr.length === 8) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255;
    g = parseInt(hexStr.slice(2, 4), 16) / 255;
    b = parseInt(hexStr.slice(4, 6), 16) / 255;
    a = parseInt(hexStr.slice(6, 8), 16) / 255;
  }

  return [r, g, b, a];
};

/**
 * Validates an email address format
 *
 * @param email - Email address to validate
 * @returns Whether the email format is valid
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
