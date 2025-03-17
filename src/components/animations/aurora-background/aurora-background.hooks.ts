/**
 * Custom hooks for the Aurora Background component
 *
 * @module AuroraBackground
 */

import { useMemo } from 'react';
import { CSS_CLASSES } from './aurora-background.constants';
import { cn } from './aurora-background.utils';

/**
 * Hook to generate the container class name with memoization
 *
 * @param className - Additional class names to apply
 * @returns Memoized container class name string
 */
export function useContainerClassName(className?: string) {
  return useMemo(() => {
    return cn(CSS_CLASSES.container, className);
  }, [className]);
}

/**
 * Hook to generate the aurora effect class name with memoization
 *
 * @param showRadialGradient - Whether to show the radial gradient effect
 * @param blurAmount - Amount of blur to apply in pixels
 * @param opacity - Opacity value between 0 and 1
 * @returns Memoized aurora class name string
 */
export function useAuroraClassName(
  showRadialGradient: boolean,
  blurAmount: number,
  opacity: number
) {
  return useMemo(() => {
    const opacityPercent = Math.round(opacity * 100);
    const dynamicStyles = `filter blur-[${blurAmount}px] opacity-${opacityPercent}`;

    return cn(
      CSS_CLASSES.auroraBase
        .replace('blur-[10px]', `blur-[${blurAmount}px]`)
        .replace('opacity-50', `opacity-${opacityPercent}`),
      showRadialGradient && CSS_CLASSES.radialGradient
    );
  }, [showRadialGradient, blurAmount, opacity]);
}
