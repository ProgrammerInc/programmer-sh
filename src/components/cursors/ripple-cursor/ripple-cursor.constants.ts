/**
 * Constants for the Ripple Cursor component.
 */

/**
 * Default values for the RippleCursor component.
 */
export const DEFAULT_VALUES = {
  /**
   * Maximum size of the ripple in pixels.
   */
  maxSize: 50,

  /**
   * Duration of the ripple animation in milliseconds.
   */
  duration: 1000,

  /**
   * Whether the ripple has a blur effect.
   */
  blur: true,

  /**
   * Color of the ripple in hex format.
   */
  color: '#64ffda'
};

/**
 * Maximum number of ripples to keep in state.
 * Limits the number of ripples to prevent performance issues.
 */
export const MAX_RIPPLES = 30;

/**
 * Container class name for the ripple cursor component.
 */
export const CONTAINER_CLASS_NAME =
  'fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden z-[9999]';

/**
 * Ripple element class name.
 */
export const RIPPLE_CLASS_NAME = 'absolute rounded-full bg-opacity-50 animate-ripple';

/**
 * Default blur filter value when blur is enabled.
 */
export const DEFAULT_BLUR_FILTER = 'blur(4px)';
