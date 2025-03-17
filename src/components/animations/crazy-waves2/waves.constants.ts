/**
 * Waves Animation Component Constants
 *
 * Defines default values and settings for the waves animation.
 */

/**
 * CSS classes used in the component
 */
export const CSS_CLASSES = {
  /** Container element class */
  CONTAINER: 'container',
  /** Canvas element class */
  CANVAS: 'canvas',
  /** Content wrapper class */
  CONTENT: 'content'
} as const;

/**
 * Default settings for the waves animation
 */
export const DEFAULT_SETTINGS = {
  /** Color of the wave lines */
  LINE_COLOR: '#000000',
  /** Background color */
  BACKGROUND_COLOR: 'transparent',
  /** Speed of wave movement along X axis */
  WAVE_SPEED_X: 0.0125,
  /** Speed of wave movement along Y axis */
  WAVE_SPEED_Y: 0.005,
  /** Wave amplitude along X axis */
  WAVE_AMP_X: 32,
  /** Wave amplitude along Y axis */
  WAVE_AMP_Y: 16,
  /** Horizontal gap between points */
  X_GAP: 32,
  /** Vertical gap between points */
  Y_GAP: 32,
  /** Friction applied to cursor movement */
  FRICTION: 0.05,
  /** Tension for cursor movement spring effect */
  TENSION: 0.85,
  /** Maximum cursor movement offset */
  MAX_CURSOR_MOVE: 1.5
} as const;

/**
 * Animation settings for the waves
 */
export const ANIMATION_SETTINGS = {
  /** Factor applied to wave movement */
  WAVE_FACTOR: 2.0,
  /** Offset for perlin noise X coordinate */
  NOISE_X_OFFSET: 0.005,
  /** Offset for perlin noise Y coordinate */
  NOISE_Y_OFFSET: 0.005,
  /** Smoothing factor for cursor movement */
  CURSOR_SMOOTHING: 0.15,
  /** Minimum radius for cursor influence */
  MIN_CURSOR_RADIUS: 100,
  /** Factor for calculating distance-based effects */
  DISTANCE_FACTOR: 0.05,
  /** Factor for cursor velocity impact */
  CURSOR_VELOCITY_FACTOR: 0.2,
  /** Acceleration factor for cursor influence */
  CURSOR_ACCELERATION: 0.5,
  /** Maximum allowed smoothed velocity */
  MAX_SMOOTHED_VELOCITY: 20
} as const;
