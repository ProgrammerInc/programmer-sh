/**
 * Custom hooks for the ShinyText animation component
 */

import { useMemo } from 'react';

/**
 * Hook to memoize the animation duration based on speed
 *
 * @param {number} speed - Animation speed in seconds
 * @returns {string} CSS animation duration string
 */
export const useAnimationDuration = (speed: number): string => {
  return useMemo(() => `${speed}s`, [speed]);
};
