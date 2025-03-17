/**
 * Hooks for the CircularText component
 */

import { useAnimation } from 'framer-motion';
import { useCallback, useState } from 'react';

/**
 * Hook to manage the circular text animation
 *
 * @param spinDuration - Duration of one complete rotation in seconds
 * @returns Animation controls and helper functions
 */
export const useCircularTextAnimation = (spinDuration: number) => {
  const controls = useAnimation();
  const [currentRotation, setCurrentRotation] = useState(0);

  /**
   * Create a rotation transition configuration
   *
   * @param duration - Duration of one complete rotation in seconds
   * @param from - Starting rotation angle in degrees
   * @param loop - Whether to loop the animation infinitely
   * @returns Rotation transition configuration
   */
  const getRotationTransition = useCallback(
    (duration: number, from: number, loop: boolean = true) => ({
      from: from,
      to: from + 360,
      ease: 'linear',
      duration: duration,
      type: 'tween',
      repeat: loop ? Infinity : 0
    }),
    []
  );

  /**
   * Create a complete transition configuration
   *
   * @param duration - Duration of one complete rotation in seconds
   * @param from - Starting rotation angle in degrees
   * @returns Complete transition configuration
   */
  const getTransition = useCallback(
    (duration: number, from: number) => ({
      rotate: getRotationTransition(duration, from),
      scale: {
        type: 'spring',
        damping: 20,
        stiffness: 300
      }
    }),
    [getRotationTransition]
  );

  return {
    controls,
    currentRotation,
    setCurrentRotation,
    getRotationTransition,
    getTransition
  };
};
