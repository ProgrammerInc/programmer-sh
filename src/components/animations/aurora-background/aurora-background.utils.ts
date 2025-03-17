/**
 * Utility functions for the Aurora Background component
 *
 * @module AuroraBackground
 */

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for combining class names with Tailwind merge support
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates the dynamic aurora CSS styles based on configuration
 *
 * @param blurAmount - Amount of blur to apply in pixels
 * @param opacity - Opacity value between 0 and 1
 * @returns - CSS class string with dynamically inserted values
 */
export function generateAuroraStyles(blurAmount: number, opacity: number): string {
  const opacityPercent = opacity * 100;
  return `filter blur-[${blurAmount}px] opacity-${opacityPercent}`;
}
