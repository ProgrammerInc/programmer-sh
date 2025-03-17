/**
 * BubbleCursor Types Module
 *
 * Type definitions for the BubbleCursor component, including component props,
 * particle properties, and utility types for rendering the bubble particles.
 *
 * @module BubbleCursorTypes
 */

/**
 * Props for the BubbleCursor component.
 */
export interface BubbleCursorProps {
  /**
   * Fill color for the bubbles.
   * @default '#e6f1f7'
   */
  fillStyle?: string;

  /**
   * Stroke color for the bubbles.
   * @default '#3a92c5'
   */
  strokeStyle?: string;

  /**
   * Optional HTML element to contain the bubble cursor.
   * If provided, the canvas will be positioned absolutely within this element.
   * If not provided, the canvas will be fixed positioned in the viewport.
   */
  wrapperElement?: HTMLElement;
}

/**
 * A position in 2D space.
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
 * Properties for a velocity vector.
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
 * Properties for a bubble particle.
 */
export interface BubbleParticleProps {
  /**
   * X coordinate.
   */
  x: number;

  /**
   * Y coordinate.
   */
  y: number;

  /**
   * Fill color for the bubble.
   */
  fillStyle: string;

  /**
   * Stroke color for the bubble.
   */
  strokeStyle: string;
}
