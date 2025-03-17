/**
 * Constants for the Neon Cursor component.
 */

/**
 * CSS class names used in the Neon Cursor component.
 */
export const CSS_CLASSES = {
  /**
   * Main container for the cursor elements.
   */
  container: 'neon-cursor-container',

  /**
   * Main cursor dot element.
   */
  main: 'cursor-main',

  /**
   * Trailing circle element.
   */
  trail: 'cursor-trail',

  /**
   * Outer glow element.
   */
  glow: 'cursor-glow'
};

/**
 * Default values for the Neon Cursor component.
 */
export const DEFAULT_VALUES = {
  /**
   * Default cursor size in pixels.
   */
  cursorSize: 20,

  /**
   * Default trail size in pixels.
   */
  trailSize: 40,

  /**
   * Default glow size in pixels.
   */
  glowSize: 60,

  /**
   * Default primary color of the cursor.
   */
  primaryColor: 'rgb(236, 101, 23)',

  /**
   * Default hover color of the cursor.
   */
  hoverColor: 'rgb(255, 150, 50)'
};

/**
 * Animation settings for the cursor elements.
 */
export const ANIMATION_SETTINGS = {
  /**
   * Main cursor animation settings.
   */
  main: {
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 400,
      mass: 0.5
    }
  },

  /**
   * Trail animation settings.
   */
  trail: {
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 200,
      mass: 0.8
    },
    default: {
      scale: 1,
      borderWidth: '2px',
      opacity: 0.4
    },
    hover: {
      scale: 1.5,
      borderWidth: '3px',
      opacity: 0.8
    }
  },

  /**
   * Glow animation settings.
   */
  glow: {
    transition: {
      type: 'spring',
      damping: 40,
      stiffness: 150,
      mass: 1
    },
    default: {
      scale: 1,
      opacity: 0.4
    },
    hover: {
      scale: 2,
      opacity: 0.8
    }
  }
};

/**
 * Selectors for interactive elements.
 */
export const INTERACTIVE_ELEMENTS_SELECTOR = 'a, button, input, [data-hover="true"]';
