/**
 * Utility functions for the Starfall animation component
 */

import { ANIMATION_SETTINGS } from './starfall.constants';
import { Star } from './starfall.types';

/**
 * Generates an array of stars with randomized properties
 *
 * @param count - Number of stars to generate
 * @returns Array of Star objects with randomized properties
 */
export const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => {
    const topOffset = Math.random() * 100;
    const fallDuration =
      Math.random() * ANIMATION_SETTINGS.MAX_ADDITIONAL_DURATION +
      ANIMATION_SETTINGS.MIN_FALL_DURATION;
    const fallDelay = Math.random() * ANIMATION_SETTINGS.MAX_FALL_DELAY;

    return {
      id: i,
      topOffset,
      fallDuration,
      fallDelay
    };
  });
};

/**
 * Creates classes for the starfall container
 *
 * @param baseClass - Base class name
 * @param additionalClass - Additional class name to append
 * @returns Combined class string
 */
export const createContainerClasses = (baseClass: string, additionalClass = ''): string => {
  const baseClasses = `absolute inset-0 w-full h-full -rotate-45 pointer-events-none ${baseClass}`;
  return additionalClass ? `${baseClasses} ${additionalClass}` : baseClasses;
};

/**
 * Creates classes for a star element
 *
 * @param baseClass - Base class name
 * @returns Class string for the star
 */
export const createStarClasses = (baseClass: string): string => {
  return `${baseClass} absolute h-[2px] bg-gradient-to-r from-current to-transparent rounded-full drop-shadow-[0_0_6px_currentColor]`;
};

/**
 * Creates classes for a star glow element
 *
 * @param baseClass - Base class name
 * @param rotation - Optional rotation angle in degrees
 * @returns Class string for the star glow
 */
export const createStarGlowClasses = (baseClass: string, rotation?: number): string => {
  let rotationClass = '';

  if (rotation) {
    rotationClass = rotation > 0 ? `rotate-${rotation}` : `-rotate-${Math.abs(rotation)}`;
  }

  return `${baseClass} absolute top-0 left-[calc(-1em)] w-[1em] h-full bg-gradient-to-r from-transparent via-current to-transparent rounded-inherit ${rotationClass} animate-blink`;
};
