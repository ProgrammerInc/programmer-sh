/**
 * Custom hooks for the BackgroundBeams component
 */

import { useMemo } from 'react';
import { DEFAULT_ANIMATION, DEFAULT_GRADIENT } from './background-beams.constants';
import styles from './background-beams.module.css';
import { cn, createGradientAnimation, randomDelay, randomDuration } from './background-beams.utils';

/**
 * Hook to generate container class name with proper composition
 *
 * @param className - Additional class names to apply
 * @returns Combined class name string
 */
export function useBeamsContainerClassName(className?: string): string {
  return useMemo(() => cn(styles['background-beams-container'], className), [className]);
}

/**
 * Hook to generate SVG class name
 *
 * @returns SVG class name string
 */
export function useBeamsSvgClassName(): string {
  return useMemo(() => styles['background-beams-svg'], []);
}

/**
 * Hook to generate gradient animation properties for a beam
 *
 * @param index - Index of the beam
 * @returns Animation properties for the beam gradient
 */
export function useBeamGradientAnimation(index: number) {
  return useMemo(() => {
    // Create base animation with random variance
    const gradientAnimation = createGradientAnimation(DEFAULT_GRADIENT);

    // Create animation timing properties
    const animationTiming = {
      duration: randomDuration(DEFAULT_ANIMATION.baseDuration, DEFAULT_ANIMATION.randomDuration),
      ease: DEFAULT_ANIMATION.ease,
      repeat: DEFAULT_ANIMATION.repeat,
      delay: randomDelay(DEFAULT_ANIMATION.maxDelay)
    };

    return {
      id: `linearGradient-${index}`,
      animation: gradientAnimation,
      timing: animationTiming
    };
  }, [index]);
}
