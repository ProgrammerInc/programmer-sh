/**
 * Utility functions for the BackgroundBoxes component
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DEFAULT_COLORS } from './background-boxes.constants';

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
 * Returns a random color from the colors array
 *
 * @param colors - Array of color CSS variables
 * @returns A random color CSS variable
 */
export function getRandomColor(colors: string[] = DEFAULT_COLORS): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Creates a new array with the specified length filled with a default value
 *
 * @param length - Length of the array
 * @param fill - Value to fill the array with
 * @returns A new array with the specified length
 */
export function createArray<T>(length: number, fill: T): T[] {
  return new Array(length).fill(fill);
}

/**
 * Determines if a plus icon should be shown at specific row and column indices
 *
 * @param rowIndex - Index of the row
 * @param colIndex - Index of the column
 * @returns Boolean indicating whether the icon should be shown
 */
export function shouldShowIcon(rowIndex: number, colIndex: number): boolean {
  return rowIndex % 2 === 0 && colIndex % 2 === 0;
}
