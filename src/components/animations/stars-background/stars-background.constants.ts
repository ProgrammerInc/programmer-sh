/**
 * Constants for the Stars Background animation component
 */

/**
 * Default settings for the StarsBackground component
 */
export const DEFAULT_SETTINGS = {
  /** Default density of stars per pixel area */
  STAR_DENSITY: 0.00015,
  /** Default setting for whether all stars should twinkle */
  ALL_STARS_TWINKLE: true,
  /** Default probability of a star twinkling if not all stars twinkle */
  TWINKLE_PROBABILITY: 0.7,
  /** Default minimum speed for twinkling animation */
  MIN_TWINKLE_SPEED: 0.5,
  /** Default maximum speed for twinkling animation */
  MAX_TWINKLE_SPEED: 1
};

/**
 * Star appearance settings
 */
export const STAR_APPEARANCE = {
  /** Minimum radius of a star in pixels */
  MIN_RADIUS: 0.5,
  /** Maximum additional radius of a star in pixels */
  MAX_ADDITIONAL_RADIUS: 0.05,
  /** Minimum opacity of a star */
  MIN_OPACITY: 0.5,
  /** Maximum additional opacity of a star */
  MAX_ADDITIONAL_OPACITY: 0.5,
  /** Base color of stars */
  COLOR: 'rgba(255, 255, 255, {opacity})'
};

/**
 * Animation settings for the twinkling effect
 */
export const ANIMATION_SETTINGS = {
  /** Frequency multiplier for the sine wave used in twinkling */
  FREQUENCY_MULTIPLIER: 0.001,
  /** Base opacity for twinkling stars */
  BASE_TWINKLE_OPACITY: 0.5,
  /** Amplitude of the opacity variation in twinkling */
  TWINKLE_AMPLITUDE: 0.5
};

/**
 * CSS classes for the StarsBackground component
 */
export const CSS_CLASSES = {
  /** Main canvas class */
  CANVAS: 'stars-background-canvas'
};
