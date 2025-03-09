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
export const hexToRgbArray = (hex: string): [number, number, number] => {
  // Remove the # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Convert to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  return [r, g, b];
};

// Helper function to convert hex color to RGB object
export const hexToRgbObject = (hex: string): { r: number; g: number; b: number } => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

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
