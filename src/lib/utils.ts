import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function to merge Tailwind classes
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Helper to ensure URLs have https:// prefix
export const ensureHttps = (url: string): string => {
  if (!url) return url;
  return url.startsWith('http') ? url : `https://${url}`;
};

// Helper function to generate random numbers
export const genRandomNumbers = (min: number, max: number, count: number) => {
  const arr = [];

  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
};

// Helper function to convert hex color to RGB array
export const hexToRgb = (
  hex: string,
  convertToHue = false,
  alpha: number = null,
  format: 'array' | 'object' = 'array'
):
  | [number, number, number]
  | [number, number, number, number]
  | { r: number; g: number; b: number }
  | { r: number; g: number; b: number; a: number } => {
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

  // Convert to RGB values
  if (convertToHue) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
  }

  if (alpha !== null) {
    if (format === 'object') {
      return { r, g, b, a: alpha };
    } else {
      return [r, g, b, alpha];
    }
  } else {
    if (format === 'object') {
      return { r, g, b };
    } else {
      return [r, g, b];
    }
  }
};

// Helper function to convert hex color to RGB array
export const hexToRgbArray = (hex: string): [number, number, number] => {
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

// Helper function to convert hex color to RGB object
export const hexToRgbObject = (hex: string): { r: number; g: number; b: number } => {
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

export const hexToVec4 = (hex: string): [number, number, number, number] => {
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

// Helper function to validate an email address
export const isValidEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
