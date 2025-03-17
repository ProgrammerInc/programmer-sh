/**
 * Custom hooks for the Starfall animation component
 */

import { useMemo } from 'react';
import { STYLE_SETTINGS } from './starfall.constants';
import { Star } from './starfall.types';
import { generateStars } from './starfall.utils';

/**
 * Hook to generate and memoize star data
 *
 * @param starCount - Number of stars to generate
 * @returns Memoized array of Star objects
 */
export const useStars = (starCount: number): Star[] => {
  return useMemo(() => generateStars(starCount), [starCount]);
};

/**
 * Hook to create and memoize star animation styles
 *
 * @param star - Star object with animation properties
 * @returns Memoized animation properties
 */
export const useStarAnimation = (star: Star) => {
  return useMemo(
    () => ({
      initial: { x: STYLE_SETTINGS.ANIMATION_START },
      animate: { x: STYLE_SETTINGS.ANIMATION_END },
      transition: {
        duration: star.fallDuration,
        delay: star.fallDelay,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop'
      }
    }),
    [star.fallDuration, star.fallDelay]
  );
};

/**
 * Hook to create and memoize star positioning and styling
 *
 * @param star - Star object with positioning properties
 * @param primaryColor - Color of the star
 * @returns Memoized style object
 */
export const useStarStyles = (star: Star, primaryColor: string) => {
  return useMemo(
    () => ({
      top: `${star.topOffset}vh`,
      width: STYLE_SETTINGS.STAR_WIDTH,
      color: primaryColor,
      willChange: 'transform'
    }),
    [star.topOffset, primaryColor]
  );
};
