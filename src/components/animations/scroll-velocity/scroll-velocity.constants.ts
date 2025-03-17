/**
 * Constants for the Scroll Velocity animation component
 */

/**
 * Default velocity value for text scrolling
 */
export const DEFAULT_VELOCITY = 100;

/**
 * Default damping value for spring animation
 */
export const DEFAULT_DAMPING = 50;

/**
 * Default stiffness value for spring animation
 */
export const DEFAULT_STIFFNESS = 400;

/**
 * Default number of text copies for seamless loop
 */
export const DEFAULT_NUM_COPIES = 6;

/**
 * Default velocity mapping configuration
 */
export const DEFAULT_VELOCITY_MAPPING = {
  input: [0, 1000] as [number, number],
  output: [0, 5] as [number, number]
};

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /** Main section container */
  CONTAINER: 'scroll-velocity-container',

  /** Parallax outer container */
  PARALLAX: 'parallax-container',

  /** Text scroller container */
  SCROLLER: 'scroller',

  /** Text item class */
  TEXT_ITEM: 'text-item'
};
