/**
 * Constants for the Rain Drops animation component
 */
import { BeamOptions } from './rain-drops.types';

/**
 * Default beam configurations for the rain effect
 */
export const DEFAULT_BEAMS: BeamOptions[] = [
  {
    initialX: 10,
    translateX: 10,
    duration: 7,
    repeatDelay: 3,
    delay: 2
  },
  {
    initialX: 600,
    translateX: 600,
    duration: 3,
    repeatDelay: 3,
    delay: 4
  },
  {
    initialX: 100,
    translateX: 100,
    duration: 7,
    repeatDelay: 7,
    className: 'h-6'
  },
  {
    initialX: 400,
    translateX: 400,
    duration: 5,
    repeatDelay: 14,
    delay: 4
  },
  {
    initialX: 800,
    translateX: 800,
    duration: 11,
    repeatDelay: 2,
    className: 'h-20'
  },
  {
    initialX: 1000,
    translateX: 1000,
    duration: 4,
    repeatDelay: 2,
    className: 'h-12'
  },
  {
    initialX: 1200,
    translateX: 1200,
    duration: 6,
    repeatDelay: 4,
    delay: 2,
    className: 'h-6'
  }
];

/**
 * Default shadow effect for the container
 */
export const DEFAULT_CONTAINER_SHADOW =
  '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset';

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /**
   * Class for the rain drops container
   */
  CONTAINER: 'rain-drops__container',

  /**
   * Class for the bottom surface
   */
  SURFACE: 'rain-drops__surface',

  /**
   * Class for the stars background
   */
  STARS: 'rain-drops__stars',

  /**
   * Class for rain beams
   */
  BEAM: 'rain-drops__beam',

  /**
   * Class for the explosion effect
   */
  EXPLOSION: 'rain-drops__explosion',

  /**
   * Class for explosion particles
   */
  EXPLOSION_PARTICLE: 'rain-drops__explosion-particle'
};

/**
 * Default animation settings
 */
export const ANIMATION_SETTINGS = {
  /**
   * Default duration for rain beam animation
   */
  DEFAULT_BEAM_DURATION: 8,

  /**
   * Number of explosion particles to create
   */
  EXPLOSION_PARTICLE_COUNT: 20,

  /**
   * Maximum X direction value for explosion particle
   */
  MAX_PARTICLE_DIRECTION_X: 40,

  /**
   * Minimum Y direction value for explosion particle
   */
  MIN_PARTICLE_DIRECTION_Y: 10,

  /**
   * Maximum Y direction value for explosion particle
   */
  MAX_PARTICLE_DIRECTION_Y: 50,

  /**
   * Collision check interval in milliseconds
   */
  COLLISION_CHECK_INTERVAL: 50,

  /**
   * Time to reset collision state in milliseconds
   */
  COLLISION_RESET_TIMEOUT: 2000,

  /**
   * Minimum particle animation duration
   */
  MIN_PARTICLE_DURATION: 0.5,

  /**
   * Maximum additional particle animation duration
   */
  MAX_ADDITIONAL_PARTICLE_DURATION: 1.5
};
