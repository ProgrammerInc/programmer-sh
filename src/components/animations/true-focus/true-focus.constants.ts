/**
 * True Focus Animation Component Constants
 */

/**
 * CSS classes for different elements of the component
 */
export const CSS_CLASSES = {
  CONTAINER: 'true-focus-container',
  WORD: 'true-focus-word',
  HIGHLIGHT: 'true-focus-highlight',
  CORNER: 'true-focus-corner',
  CORNER_TOP_LEFT: 'true-focus-corner-top-left',
  CORNER_TOP_RIGHT: 'true-focus-corner-top-right',
  CORNER_BOTTOM_LEFT: 'true-focus-corner-bottom-left',
  CORNER_BOTTOM_RIGHT: 'true-focus-corner-bottom-right'
} as const;

/**
 * Default settings for the True Focus component
 */
export const DEFAULT_SETTINGS = {
  /**
   * Default text content
   */
  SENTENCE: 'True Focus',

  /**
   * Default manual mode setting
   */
  MANUAL_MODE: false,

  /**
   * Default blur amount in pixels
   */
  BLUR_AMOUNT: 5,

  /**
   * Default border color
   */
  BORDER_COLOR: 'green',

  /**
   * Default glow color
   */
  GLOW_COLOR: 'rgba(0, 255, 0, 0.6)',

  /**
   * Default animation duration in seconds
   */
  ANIMATION_DURATION: 0.5,

  /**
   * Default pause between animations in seconds
   */
  PAUSE_BETWEEN_ANIMATIONS: 1
} as const;

/**
 * Animation settings for framer-motion
 */
export const ANIMATION_SETTINGS = {
  /**
   * Default transition settings
   */
  TRANSITION: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
} as const;
