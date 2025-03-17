/**
 * Utility functions for the Particles animation component
 */

import { RGBColor } from './particles.types';

/**
 * Convert a hex color string to RGB values normalized to [0, 1]
 *
 * @param hex - Hex color string (with or without leading #)
 * @returns RGB color values as a tuple of numbers in range [0, 1]
 */
export const hexToRgb = (hex: string): RGBColor => {
  hex = hex.replace(/^#/, '');

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;

  return [r, g, b];
};

/**
 * Generate positions for particles in a uniform sphere distribution
 *
 * @param count - Number of particles to generate positions for
 * @returns Float32Array containing the x, y, z positions
 */
export const generateSpherePositions = (count: number): Float32Array => {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number, len: number;

    // Generate points in a uniform sphere using rejection sampling
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      len = x * x + y * y + z * z;
    } while (len > 1 || len === 0);

    // Scale by random cube root for uniform distribution
    const r = Math.cbrt(Math.random());
    positions.set([x * r, y * r, z * r], i * 3);
  }

  return positions;
};

/**
 * Generate random values for particle attributes
 *
 * @param count - Number of particles
 * @returns Float32Array containing 4 random values per particle
 */
export const generateRandomValues = (count: number): Float32Array => {
  const randoms = new Float32Array(count * 4);

  for (let i = 0; i < count; i++) {
    randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
  }

  return randoms;
};

/**
 * Generate color values for particles
 *
 * @param count - Number of particles
 * @param palette - Color palette as array of hex strings
 * @returns Float32Array containing RGB values for particles
 */
export const generateColorValues = (count: number, palette: string[]): Float32Array => {
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const colorHex = palette[Math.floor(Math.random() * palette.length)];
    const colorRgb = hexToRgb(colorHex);
    colors.set(colorRgb, i * 3);
  }

  return colors;
};

/**
 * Interface for WebGL renderer from OGL library
 */
interface Renderer {
  setSize: (width: number, height: number) => void;
  gl: WebGLRenderingContext;
}

/**
 * Interface for Camera from OGL library
 */
interface Camera {
  perspective: (options: { aspect: number }) => void;
}

/**
 * Handle canvas resize to maintain proper aspect ratio
 *
 * @param canvas - Canvas HTML element
 * @param renderer - OGL Renderer instance
 * @param camera - OGL Camera instance
 */
export const handleCanvasResize = (
  canvas: HTMLCanvasElement,
  renderer: Renderer,
  camera: Camera
): void => {
  const container = canvas.parentElement;
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.perspective({ aspect: canvas.width / canvas.height });
};

/**
 * Calculate mouse position relative to canvas in normalized device coordinates
 *
 * @param event - Mouse event
 * @param container - Container element
 * @returns Object with normalized x and y coordinates in range [-1, 1]
 */
export const calculateMousePosition = (
  event: MouseEvent,
  container: HTMLElement
): { x: number; y: number } => {
  const rect = container.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  return { x, y };
};

/**
 * Clean up WebGL resources
 *
 * @param canvas - Canvas element
 * @param container - Container element
 */
export const cleanupWebGLResources = (canvas: HTMLCanvasElement, container: HTMLElement): void => {
  if (container.contains(canvas)) {
    container.removeChild(canvas);
  }
};
