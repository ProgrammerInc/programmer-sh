/**
 * Custom hooks for the BackgroundLines component
 */

import { useMemo } from 'react';
import {
  CSS_CLASSES,
  DEFAULT_ANIMATION,
  DEFAULT_COLORS,
  DEFAULT_PATHS,
  PATH_VARIANTS
} from './background-lines.constants';
import styles from './background-lines.module.css';
import { cn, createPathTransition } from './background-lines.utils';

/**
 * Hook to generate container class name with proper composition
 *
 * @param className - Additional class name
 * @returns Combined class name string
 */
export function useContainerClassName(className?: string): string {
  return useMemo(() => cn(styles[CSS_CLASSES.container], className), [className]);
}

/**
 * Hook to generate SVG class name
 *
 * @returns SVG class name string
 */
export function useSvgClassName(): string {
  return useMemo(() => styles[CSS_CLASSES.svg], []);
}

/**
 * Hook to generate path class name
 *
 * @returns Path class name string
 */
export function usePathClassName(): string {
  return useMemo(() => styles[CSS_CLASSES.path], []);
}

/**
 * Hook to generate animation transition properties
 *
 * @param duration - Custom duration in seconds
 * @returns Animation transition properties
 */
export function useAnimationTransition(duration?: number): ReturnType<typeof createPathTransition> {
  return useMemo(
    () =>
      createPathTransition(
        duration || DEFAULT_ANIMATION.duration,
        DEFAULT_ANIMATION.ease,
        DEFAULT_ANIMATION.repeat,
        DEFAULT_ANIMATION.repeatType,
        DEFAULT_ANIMATION.maxRandomDelay,
        DEFAULT_ANIMATION.maxRandomRepeatDelay
      ),
    [duration]
  );
}

/**
 * Hook to generate path variants for animations
 *
 * @returns Path animation variants
 */
export function usePathVariants() {
  return useMemo(() => PATH_VARIANTS, []);
}

/**
 * Hook to get the collection of path data
 *
 * @returns Array of path data strings
 */
export function usePaths() {
  return useMemo(() => DEFAULT_PATHS, []);
}

/**
 * Hook to get the collection of colors
 *
 * @returns Array of color strings
 */
export function useColors() {
  return useMemo(() => DEFAULT_COLORS, []);
}
