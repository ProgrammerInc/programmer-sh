/**
 * Constants for the Starfall animation component
 */

/**
 * Default settings for the Starfall component
 */
export const DEFAULT_SETTINGS = {
  /** Default number of stars */
  STAR_COUNT: 50,
  /** Default color of the stars */
  PRIMARY_COLOR: '#ffffff'
};

/**
 * Animation settings for stars
 */
export const ANIMATION_SETTINGS = {
  /** Minimum star tail length */
  MIN_TAIL_LENGTH: 5,
  /** Maximum additional tail length */
  MAX_ADDITIONAL_TAIL_LENGTH: 2.5,
  /** Minimum fall duration in seconds */
  MIN_FALL_DURATION: 6,
  /** Maximum additional fall duration in seconds */
  MAX_ADDITIONAL_DURATION: 6,
  /** Maximum initial delay in seconds */
  MAX_FALL_DELAY: 10
};

/**
 * CSS classes for the Starfall component
 */
export const CSS_CLASSES = {
  /** Main container class */
  CONTAINER: 'starfall-container',
  /** Star element class */
  STAR: 'starfall-star',
  /** Star wrapper class */
  STAR_WRAPPER: 'starfall-star-wrapper',
  /** Star glow effect class */
  STAR_GLOW: 'starfall-star-glow'
};

/**
 * Style constants for the Starfall component
 */
export const STYLE_SETTINGS = {
  /** Star width in em units */
  STAR_WIDTH: '6em',
  /** Animation starting position in em units */
  ANIMATION_START: '104em',
  /** Animation ending position in em units */
  ANIMATION_END: '-30em',
  /** Glow width in em units */
  GLOW_WIDTH: '1em',
  /** Glow position offset in em units */
  GLOW_OFFSET: 'calc(-1em)'
};
