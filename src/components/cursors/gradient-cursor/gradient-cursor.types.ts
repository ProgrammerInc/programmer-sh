/**
 * GradientCursor
 *
 * Type definitions for the GradientCursor component
 *
 * @module GradientCursor/Types
 */

/**
 * Interface representing a gradient particle
 */
export interface GradientParticle {
  /** Unique identifier for the particle */
  id: number;
  /** X-coordinate position */
  x: number;
  /** Y-coordinate position */
  y: number;
  /** Size of the particle */
  size: number;
  /** Intensity/opacity of the particle (0-1) */
  intensity: number;
}

/**
 * State for the GradientCursor component
 */
export interface GradientCursorState {
  /** Current hue value (0-360) */
  hue: number;
  /** Array of particles for the cursor trail */
  particles: GradientParticle[];
}
