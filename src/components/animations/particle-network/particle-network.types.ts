/**
 * Types for the Particle Network animation component
 */

/**
 * Represents a single particle in the network
 *
 * @interface Particle
 * @property {number} x - X coordinate of the particle
 * @property {number} y - Y coordinate of the particle
 * @property {number} vx - Velocity in the X direction
 * @property {number} vy - Velocity in the Y direction
 * @property {number} size - Size of the particle
 */
export interface Particle {
  /**
   * X coordinate of the particle
   */
  x: number;

  /**
   * Y coordinate of the particle
   */
  y: number;

  /**
   * Velocity in the X direction
   */
  vx: number;

  /**
   * Velocity in the Y direction
   */
  vy: number;

  /**
   * Size of the particle
   */
  size: number;
}

/**
 * Props for the Particle Network component
 *
 * @interface ParticleNetworkProps
 * @property {number} [particleCount] - Number of particles to display
 * @property {number} [particleSize] - Size of each particle in pixels
 * @property {string} [particleColor] - Color of particles (CSS color string)
 * @property {string} [lineColor] - Color of connection lines (CSS color string)
 * @property {number} [maxDistance] - Maximum distance for particle connections
 * @property {number} [speed] - Movement speed of particles
 * @property {string} [className] - Additional CSS class(es) to apply
 * @property {boolean} [interactive] - Whether particles react to mouse movement
 */
export interface ParticleNetworkProps {
  /**
   * Number of particles to display
   */
  particleCount?: number;

  /**
   * Size of each particle in pixels
   */
  particleSize?: number;

  /**
   * Color of particles (CSS color string)
   */
  particleColor?: string;

  /**
   * Color of connection lines (CSS color string)
   */
  lineColor?: string;

  /**
   * Maximum distance for particle connections
   */
  maxDistance?: number;

  /**
   * Movement speed of particles
   */
  speed?: number;

  /**
   * Additional CSS class(es) to apply
   */
  className?: string;

  /**
   * Whether particles react to mouse movement
   */
  interactive?: boolean;
}

/**
 * Mouse position type
 *
 * @interface MousePosition
 * @property {number} x - X coordinate of the mouse
 * @property {number} y - Y coordinate of the mouse
 */
export interface MousePosition {
  x: number;
  y: number;
}
