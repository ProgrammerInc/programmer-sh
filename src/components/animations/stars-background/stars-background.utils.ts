/**
 * Utility functions for the Stars Background animation component
 */

import {
  ANIMATION_SETTINGS,
  DEFAULT_SETTINGS,
  STAR_APPEARANCE
} from './stars-background.constants';
import { CanvasDimensions, StarProps } from './stars-background.types';

/**
 * Generates a single star with random properties
 *
 * @param canvasDimensions - Width and height of the canvas
 * @param shouldTwinkle - Whether the star should twinkle
 * @param minTwinkleSpeed - Minimum speed for twinkling animation
 * @param maxTwinkleSpeed - Maximum speed for twinkling animation
 * @returns Star properties object
 */
export const generateStar = (
  canvasDimensions: CanvasDimensions,
  shouldTwinkle: boolean,
  minTwinkleSpeed: number,
  maxTwinkleSpeed: number
): StarProps => {
  return {
    x: Math.random() * canvasDimensions.width,
    y: Math.random() * canvasDimensions.height,
    radius: Math.random() * STAR_APPEARANCE.MAX_ADDITIONAL_RADIUS + STAR_APPEARANCE.MIN_RADIUS,
    opacity: Math.random() * STAR_APPEARANCE.MAX_ADDITIONAL_OPACITY + STAR_APPEARANCE.MIN_OPACITY,
    twinkleSpeed: shouldTwinkle
      ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
      : null
  };
};

/**
 * Generates an array of stars with random properties
 *
 * @param canvasDimensions - Width and height of the canvas
 * @param starDensity - Density of stars per pixel area
 * @param allStarsTwinkle - Whether all stars should twinkle
 * @param twinkleProbability - Probability of a star twinkling if not all stars twinkle
 * @param minTwinkleSpeed - Minimum speed for twinkling animation
 * @param maxTwinkleSpeed - Maximum speed for twinkling animation
 * @returns Array of star properties
 */
export const generateStars = (
  canvasDimensions: CanvasDimensions,
  starDensity: number = DEFAULT_SETTINGS.STAR_DENSITY,
  allStarsTwinkle: boolean = DEFAULT_SETTINGS.ALL_STARS_TWINKLE,
  twinkleProbability: number = DEFAULT_SETTINGS.TWINKLE_PROBABILITY,
  minTwinkleSpeed: number = DEFAULT_SETTINGS.MIN_TWINKLE_SPEED,
  maxTwinkleSpeed: number = DEFAULT_SETTINGS.MAX_TWINKLE_SPEED
): StarProps[] => {
  const area = canvasDimensions.width * canvasDimensions.height;
  const numStars = Math.floor(area * starDensity);

  return Array.from({ length: numStars }, () => {
    const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
    return generateStar(canvasDimensions, shouldTwinkle, minTwinkleSpeed, maxTwinkleSpeed);
  });
};

/**
 * Updates star opacity based on the twinkling effect
 *
 * @param star - Star object to update
 * @param currentTime - Current timestamp for the animation
 * @returns Updated star object
 */
export const updateStarTwinkling = (star: StarProps, currentTime: number): StarProps => {
  if (star.twinkleSpeed !== null) {
    const newOpacity =
      ANIMATION_SETTINGS.BASE_TWINKLE_OPACITY +
      Math.abs(
        Math.sin((currentTime * ANIMATION_SETTINGS.FREQUENCY_MULTIPLIER) / star.twinkleSpeed) *
          ANIMATION_SETTINGS.TWINKLE_AMPLITUDE
      );

    return {
      ...star,
      opacity: newOpacity
    };
  }

  return star;
};

/**
 * Draws a single star on the canvas
 *
 * @param ctx - Canvas 2D rendering context
 * @param star - Star properties to draw
 */
export const drawStar = (ctx: CanvasRenderingContext2D, star: StarProps): void => {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fillStyle = STAR_APPEARANCE.COLOR.replace('{opacity}', star.opacity.toString());
  ctx.fill();
};

/**
 * Creates a combined class name string with optional additional classes
 *
 * @param baseClass - Base CSS class
 * @param additionalClass - Optional additional CSS classes
 * @returns Combined class string
 */
export const createClassNames = (baseClass: string, additionalClass?: string): string => {
  return additionalClass ? `${baseClass} ${additionalClass}` : baseClass;
};
