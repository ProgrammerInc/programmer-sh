/**
 * Custom hooks for the Starry Background animation component
 */

import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SETTINGS } from './starry-background.constants';
import { MousePosition, StarProperties } from './starry-background.types';
import { generateStars } from './starry-background.utils';

/**
 * Hook to generate and memoize star properties
 *
 * @param starCount - Number of stars to generate
 * @returns Array of star property objects
 */
export const useStars = (starCount = DEFAULT_SETTINGS.STAR_COUNT): StarProperties[] => {
  return useMemo(() => generateStars(starCount), [starCount]);
};

/**
 * Hook to handle mouse movement for parallax effect
 *
 * @param containerRef - Reference to the container element
 * @param enableParallax - Whether the parallax effect is enabled
 * @returns Current mouse position coordinates
 */
export const useParallaxEffect = (
  containerRef: RefObject<HTMLDivElement>,
  enableParallax: boolean
): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setMousePosition({ x, y });
    },
    [containerRef]
  );

  useEffect(() => {
    if (!enableParallax) return;

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [enableParallax, containerRef, handleMouseMove]);

  return mousePosition;
};
