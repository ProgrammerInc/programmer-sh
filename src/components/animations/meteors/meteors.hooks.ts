/**
 * Custom hooks for the Meteors animation component
 */

import { useEffect } from 'react';
import { METEOR_COLOR_STYLE } from './meteors.constants';

/**
 * Hook to manage the meteor color CSS variable
 *
 * @param color - Optional custom color for the meteors
 */
export function useMeteorColor(color?: string): void {
  useEffect(() => {
    // Set CSS variable for custom color if provided
    if (color) {
      document.documentElement.style.setProperty(METEOR_COLOR_STYLE, color);
    }

    // Cleanup function to remove the CSS variable when component unmounts
    return () => {
      if (color) {
        document.documentElement.style.removeProperty(METEOR_COLOR_STYLE);
      }
    };
  }, [color]);
}
