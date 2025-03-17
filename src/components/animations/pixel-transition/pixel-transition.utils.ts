/**
 * Utility functions for the Pixel Transition animation component
 */

import { CSS_CLASSES } from './pixel-transition.constants';

/**
 * Create a pixel element for the transition grid
 *
 * @param row - Row index in the grid
 * @param col - Column index in the grid
 * @param gridSize - Size of the grid (NxN)
 * @param pixelColor - Color of the pixel
 * @returns Created pixel element
 */
export const createPixelElement = (
  row: number,
  col: number,
  gridSize: number,
  pixelColor: string
): HTMLDivElement => {
  const pixel = document.createElement('div');
  pixel.classList.add(CSS_CLASSES.PIXEL);
  pixel.classList.add('absolute', 'hidden');
  pixel.style.backgroundColor = pixelColor;

  // Calculate size and position based on grid size
  const size = 100 / gridSize;
  pixel.style.width = `${size}%`;
  pixel.style.height = `${size}%`;
  pixel.style.left = `${col * size}%`;
  pixel.style.top = `${row * size}%`;

  return pixel;
};

/**
 * Generate the pixel grid for the transition effect
 *
 * @param gridContainer - Container element for the pixel grid
 * @param gridSize - Size of the grid (NxN)
 * @param pixelColor - Color of the pixels
 */
export const generatePixelGrid = (
  gridContainer: HTMLDivElement,
  gridSize: number,
  pixelColor: string
): void => {
  // Clear existing pixels
  gridContainer.innerHTML = '';

  // Create new pixel grid
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const pixel = createPixelElement(row, col, gridSize, pixelColor);
      gridContainer.appendChild(pixel);
    }
  }
};

/**
 * Check if the current device is a touch device
 *
 * @returns True if the device supports touch input
 */
export const isTouchDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};
