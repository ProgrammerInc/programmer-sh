/**
 * Utility functions for the BackgroundLines component
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
 * Generates a random number within a specified range
 *
 * @param max - Maximum value (exclusive)
 * @returns Random number between 0 and max
 */
export function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Generates a random animation delay
 *
 * @param maxDelay - Maximum delay in seconds
 * @returns Random delay in seconds
 */
export function randomDelay(maxDelay: number): number {
  return getRandomNumber(maxDelay);
}

/**
 * Generates a random animation repeat delay
 *
 * @param min - Minimum delay in seconds
 * @param max - Maximum delay in seconds
 * @returns Random repeat delay in seconds
 */
export function randomRepeatDelay(min: number, max: number): number {
  return min + getRandomNumber(max);
}

/**
 * Creates transition properties for path animation
 *
 * @param duration - Duration of the animation in seconds
 * @param ease - Easing function for the animation
 * @param repeat - Number of times to repeat the animation
 * @param repeatType - Type of repeat behavior
 * @param maxDelay - Maximum random delay in seconds
 * @param maxRepeatDelay - Maximum random repeat delay in seconds
 * @returns Animation transition properties
 */
export function createPathTransition(
  duration = 10,
  ease = 'linear',
  repeat = Infinity,
  repeatType = 'loop' as const,
  maxDelay = 10,
  maxRepeatDelay = 12
) {
  return {
    duration,
    ease,
    repeat,
    repeatType,
    delay: randomDelay(maxDelay),
    repeatDelay: randomRepeatDelay(2, maxRepeatDelay)
  };
}
