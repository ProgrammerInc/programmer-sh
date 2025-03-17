/**
 * Rainbow Cursor Types Module
 *
 * Type definitions for the Rainbow Cursor component, including component props,
 * cursor positions, and particle interfaces.
 *
 * @module RainbowCursorTypes
 */

/**
 * Properties for the RainbowCursor component.
 */
export interface RainbowCursorProps {
  /**
   * Optional HTML element to attach the cursor to.
   * If not provided, the cursor will be attached to the document body.
   */
  element?: HTMLElement;

  /**
   * Number of particles in the rainbow trail.
   * @default 20
   */
  length?: number;

  /**
   * Array of colors for the rainbow effect.
   * @default ['#FE0000', '#FD8C00', '#FFE500', '#119F0B', '#0644B3', '#C22EDC']
   */
  colors?: string[];

  /**
   * Size of the cursor trail in pixels.
   * @default 3
   */
  size?: number;

  /**
   * Speed factor for the trailing effect. Higher values make the trail follow faster.
   * @default 0.4
   */
  trailSpeed?: number;

  /**
   * Speed of color cycling animation.
   * @default 0.002
   */
  colorCycleSpeed?: number;

  /**
   * Blur effect for the cursor in pixels.
   * @default 0
   */
  blur?: number;

  /**
   * Speed of the pulsing animation.
   * @default 0.01
   */
  pulseSpeed?: number;

  /**
   * Minimum scale factor for pulsing animation.
   * @default 0.8
   */
  pulseMin?: number;

  /**
   * Maximum scale factor for pulsing animation.
   * @default 1.2
   */
  pulseMax?: number;
}

/**
 * Cursor position type.
 */
export interface CursorPosition {
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
 * Particle in the rainbow trail.
 */
export interface Particle {
  /**
   * Position of the particle.
   */
  position: CursorPosition;
}

/**
 * Position set for drawing the rainbow trail.
 */
export interface PositionSet {
  /**
   * X coordinate.
   */
  x: number;

  /**
   * Y coordinate.
   */
  y: number;
}
