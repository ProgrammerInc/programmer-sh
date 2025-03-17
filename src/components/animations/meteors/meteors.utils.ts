/**
 * Utility functions for the Meteors animation component
 */

import { METEOR_ANIMATION, METEOR_POSITION } from './meteors.constants';

/**
 * Generates a random meteor animation delay within the defined range
 *
 * @returns Random animation delay in seconds as a string (e.g., '0.5s')
 */
export function getRandomMeteorDelay(): string {
  const delay =
    Math.random() * (METEOR_ANIMATION.MAX_DELAY - METEOR_ANIMATION.MIN_DELAY) +
    METEOR_ANIMATION.MIN_DELAY;
  return `${delay}s`;
}

/**
 * Generates a random meteor animation duration within the defined range
 *
 * @returns Random animation duration in seconds as a string (e.g., '5s')
 */
export function getRandomMeteorDuration(): string {
  const duration = Math.floor(
    Math.random() * (METEOR_ANIMATION.MAX_DURATION - METEOR_ANIMATION.MIN_DURATION) +
      METEOR_ANIMATION.MIN_DURATION
  );
  return `${duration}s`;
}

/**
 * Generates a random left position for a meteor within the defined range
 *
 * @returns Random left position in pixels as a string (e.g., '-500px')
 */
export function getRandomMeteorPosition(): string {
  const position = Math.floor(
    Math.random() * (METEOR_POSITION.MAX_LEFT - METEOR_POSITION.MIN_LEFT) + METEOR_POSITION.MIN_LEFT
  );
  return `${position}px`;
}
