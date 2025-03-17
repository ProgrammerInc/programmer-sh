/**
 * Variable Proximity Animation Component Constants
 */

import { FalloffType } from './variable-proximity.types';

/**
 * CSS classes for different elements of the component
 */
export const CSS_CLASSES = {
  CONTAINER: 'variable-proximity-container',
  WORD: 'variable-proximity-word',
  LETTER: 'variable-proximity-letter',
  SPACE: 'variable-proximity-space',
  SR_ONLY: 'sr-only'
} as const;

/**
 * Default settings for the Variable Proximity component
 */
export const DEFAULT_SETTINGS = {
  /**
   * Default radius in pixels
   */
  RADIUS: 50,

  /**
   * Default falloff type
   */
  FALLOFF: 'linear' as FalloffType,

  /**
   * Default font family
   */
  FONT_FAMILY: '"Roboto Flex", sans-serif'
} as const;

/**
 * Animation settings
 */
export const ANIMATION_SETTINGS = {
  /**
   * Frame throttling to optimize performance (in ms)
   */
  FRAME_THROTTLE: 16 // approximately 60fps
} as const;
