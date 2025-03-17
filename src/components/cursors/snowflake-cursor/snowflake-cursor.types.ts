/**
 * Type definitions for the Snowflake Cursor component.
 */

/**
 * Props for the SnowflakeCursor component.
 */
export interface SnowflakeCursorProps {
  /**
   * Optional container element for the snowflake cursor.
   * If not provided, the body element will be used.
   */
  element?: HTMLElement;
}

/**
 * Position coordinates.
 */
export interface Position {
  /**
   * X coordinate.
   */
  x: number;

  /**
   * Y coordinate.
   */
  y: number;
}

/**
 * Velocity vector.
 */
export interface Velocity {
  /**
   * X component of velocity.
   */
  x: number;

  /**
   * Y component of velocity.
   */
  y: number;
}

/**
 * Snowflake particle state.
 */
export interface SnowflakeParticleState {
  /**
   * Current position of the particle.
   */
  position: Position;

  /**
   * Current velocity of the particle.
   */
  velocity: Velocity;

  /**
   * Remaining life span in frames.
   */
  lifeSpan: number;

  /**
   * Initial life span in frames.
   */
  initialLifeSpan: number;

  /**
   * Canvas element containing the emoji.
   */
  canv: HTMLCanvasElement;
}
