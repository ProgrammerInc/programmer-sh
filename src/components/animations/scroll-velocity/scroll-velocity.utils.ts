/**
 * Utility functions for the Scroll Velocity animation component
 */
import { RefObject, useLayoutEffect, useState } from 'react';

/**
 * Utility function to join class names, filtering out falsy values
 *
 * @param classes - Array of class names, some of which may be falsy
 * @returns Joined string of valid class names
 */
export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Calculates the element width and updates on resize
 *
 * @param ref - Reference to the HTML element to measure
 * @returns The current width of the element in pixels
 */
export const useElementWidth = (ref: RefObject<HTMLElement>): number => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    // Initial measurement
    updateWidth();

    // Update on resize
    window.addEventListener('resize', updateWidth);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
};

/**
 * Wraps a value within a range, creating an endless loop effect
 *
 * @param min - Minimum value of the range
 * @param max - Maximum value of the range
 * @param v - Current value to wrap
 * @returns Wrapped value that stays within the range
 */
export const wrapValue = (min: number, max: number, v: number): number => {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
};
