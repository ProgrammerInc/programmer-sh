/**
 * Constants for the Starry Background animation component
 */

/**
 * Default settings for the StarryBackground component
 */
export const DEFAULT_SETTINGS = {
  /** Default background color */
  BACKGROUND_COLOR: '#050510',
  /** Default noise opacity */
  NOISE_OPACITY: 0.06,
  /** Default parallax setting */
  ENABLE_PARALLAX: false,
  /** Default number of stars */
  STAR_COUNT: 180
};

/**
 * Star property probability settings
 */
export const STAR_PROBABILITY = {
  /** Chance of a star having glow effect */
  GLOW_CHANCE: 0.15,
  /** Chance of a star being large (4px) */
  LARGE_STAR_CHANCE: 0.05,
  /** Chance of a star being medium (3px) */
  MEDIUM_STAR_CHANCE: 0.15
};

/**
 * Animation settings for stars
 */
export const ANIMATION_SETTINGS = {
  /** Min animation duration in seconds */
  MIN_DURATION: 2,
  /** Max additional animation duration in seconds */
  MAX_ADDITIONAL_DURATION: 2,
  /** Max animation delay in seconds */
  MAX_DELAY: 20
};

/**
 * Star appearance settings
 */
export const STAR_APPEARANCE = {
  /** Min base opacity */
  MIN_OPACITY: 0.1,
  /** Max additional opacity */
  MAX_ADDITIONAL_OPACITY: 0.2,
  /** Min glow intensity */
  MIN_GLOW_INTENSITY: 0.1,
  /** Max additional glow intensity */
  MAX_ADDITIONAL_INTENSITY: 0.2,
  /** Large star size in pixels */
  LARGE_SIZE: 4,
  /** Medium star size in pixels */
  MEDIUM_SIZE: 3,
  /** Small star size in pixels */
  SMALL_SIZE: 2
};

/**
 * Parallax effect settings
 */
export const PARALLAX_SETTINGS = {
  /** Number of parallax layers */
  LAYER_COUNT: 3,
  /** Movement multiplier */
  MOVEMENT_FACTOR: -3,
  /** Transition speed */
  TRANSITION: 'transform 0.1s ease-out'
};

/**
 * CSS classes for the StarryBackground component
 */
export const CSS_CLASSES = {
  /** Main container class */
  CONTAINER: 'starry-background-container',
  /** Noise overlay class */
  NOISE_OVERLAY: 'starry-background-noise',
  /** Stars grid class */
  STARS_GRID: 'starry-background-stars-grid',
  /** Star container class */
  STAR_CONTAINER: 'starry-background-star-container',
  /** Star element class */
  STAR: 'starry-background-star',
  /** Content container class */
  CONTENT: 'starry-background-content'
};
