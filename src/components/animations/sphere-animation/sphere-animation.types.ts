/**
 * Type definitions for the Sphere Animation component
 */

import anime from 'animejs';

/**
 * Props for the SphereAnimation component
 *
 * @property {string} className - Optional additional CSS class names
 * @property {ColorScheme} colorScheme - The color scheme to use for the animation (default: 'default')
 */
export interface SphereAnimationProps {
  className?: string;
  colorScheme?: ColorScheme;
}

/**
 * Supported color schemes for the sphere animation
 */
export type ColorScheme = 'default' | string;

/**
 * Color scheme definition
 *
 * @property {string[]} gradient - Array of gradient colors
 * @property {string[]} stroke - Array of stroke colors
 */
export interface ColorSchemeDefinition {
  gradient: string[];
  stroke: string[];
}

/**
 * Map of color schemes by name
 */
export interface ColorSchemeMap {
  [key: string]: ColorSchemeDefinition;
}

/**
 * Animation references
 */
export interface AnimationRefs {
  anime: anime.AnimeInstance[];
}
