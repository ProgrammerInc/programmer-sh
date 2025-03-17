/**
 * Constants for the Waves animation component
 */

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /** Container class name */
  CONTAINER: 'waves-container',
  /** Canvas class name */
  CANVAS: 'waves-canvas',
  /** Cursor class name */
  CURSOR: 'waves-cursor'
} as const;

/**
 * Default values for the Waves component
 */
export const DEFAULT_VALUES = {
  /** Default line color */
  LINE_COLOR: 'black',
  /** Default background color */
  BACKGROUND_COLOR: 'transparent',
  /** Default wave speed X */
  WAVE_SPEED_X: 0.0125,
  /** Default wave speed Y */
  WAVE_SPEED_Y: 0.005,
  /** Default wave amplitude X */
  WAVE_AMP_X: 32,
  /** Default wave amplitude Y */
  WAVE_AMP_Y: 16,
  /** Default gap between wave lines on X axis */
  X_GAP: 32,
  /** Default gap between points on Y axis */
  Y_GAP: 32,
  /** Default friction for cursor influence */
  FRICTION: 0.05,
  /** Default tension for cursor influence */
  TENSION: 0.85,
  /** Default maximum cursor movement */
  MAX_CURSOR_MOVE: 1.5
} as const;

/**
 * Perlin noise configuration constants
 */
export const NOISE_CONSTANTS = {
  /** Noise perlin multiplier */
  PERLIN_MULTIPLIER: 12,
  /** Noise X scale factor */
  X_SCALE: 0.002,
  /** Noise Y scale factor */
  Y_SCALE: 0.0015
} as const;

/**
 * Animation timing constants
 */
export const ANIMATION_CONSTANTS = {
  /** Mouse smoothing factor */
  MOUSE_SMOOTHING: 0.1,
  /** Velocity smoothing factor */
  VELOCITY_SMOOTHING: 0.1,
  /** Maximum velocity */
  MAX_VELOCITY: 100,
  /** Minimum influence distance */
  MIN_INFLUENCE_DISTANCE: 175,
  /** Cursor influence scaling factor */
  CURSOR_INFLUENCE_FACTOR: 0.00065,
  /** Position rounding factor for optimization */
  POSITION_ROUNDING: 10,
  /** Wave distortion frequency */
  WAVE_DISTORTION: 0.001
} as const;

/**
 * Seed for the Perlin noise algorithm
 */
export const getRandomSeed = (): number => Math.random();
