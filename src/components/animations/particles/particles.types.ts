/**
 * Types for the Particles animation component
 */

/**
 * Props for the Particles component
 *
 * @interface ParticlesProps
 * @property {number} [particleCount] - Number of particles to render
 * @property {number} [particleSpread] - Spread factor for particle distribution
 * @property {number} [speed] - Animation speed factor
 * @property {string[]} [particleColors] - Colors for particles (hex format)
 * @property {boolean} [moveParticlesOnHover] - Whether particles react to mouse position
 * @property {number} [particleHoverFactor] - Strength of hover effect
 * @property {boolean} [alphaParticles] - Whether particles have alpha transparency
 * @property {number} [particleBaseSize] - Base size of particles
 * @property {number} [sizeRandomness] - Randomness factor for particle sizes
 * @property {number} [cameraDistance] - Distance of camera from particles
 * @property {boolean} [disableRotation] - Whether to disable automatic rotation
 * @property {string} [className] - Additional CSS class for container
 */
export interface ParticlesProps {
  /**
   * Number of particles to render
   * @default 200
   */
  particleCount?: number;

  /**
   * Spread factor for particle distribution
   * @default 10
   */
  particleSpread?: number;

  /**
   * Animation speed factor
   * @default 0.1
   */
  speed?: number;

  /**
   * Colors for particles (hex format)
   * @default ['#ffffff', '#ffffff', '#ffffff']
   */
  particleColors?: string[];

  /**
   * Whether particles react to mouse position
   * @default false
   */
  moveParticlesOnHover?: boolean;

  /**
   * Strength of hover effect
   * @default 1
   */
  particleHoverFactor?: number;

  /**
   * Whether particles have alpha transparency
   * @default false
   */
  alphaParticles?: boolean;

  /**
   * Base size of particles
   * @default 100
   */
  particleBaseSize?: number;

  /**
   * Randomness factor for particle sizes
   * @default 1
   */
  sizeRandomness?: number;

  /**
   * Distance of camera from particles
   * @default 20
   */
  cameraDistance?: number;

  /**
   * Whether to disable automatic rotation
   * @default false
   */
  disableRotation?: boolean;

  /**
   * Additional CSS class for container
   */
  className?: string;
}

/**
 * Mouse position coordinates
 *
 * @interface MousePosition
 * @property {number} x - X coordinate [-1, 1]
 * @property {number} y - Y coordinate [-1, 1]
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * RGB color values normalized to [0, 1] range
 *
 * @type RGBColor
 */
export type RGBColor = [number, number, number];
