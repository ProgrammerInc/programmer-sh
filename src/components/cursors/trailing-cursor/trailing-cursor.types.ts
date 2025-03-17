/**
 * TrailingCursor Types Module
 *
 * Type definitions for the TrailingCursor component, including component props,
 * particle properties, and position interfaces.
 *
 * @module TrailingCursorTypes
 */

/**
 * Props for the TrailingCursor component
 */
export interface TrailingCursorProps {
  /**
   * Target element to attach the cursor to
   */
  element?: HTMLElement;

  /**
   * Number of particles in the trail
   * @default 15
   */
  particles?: number;

  /**
   * Rate at which particles follow the cursor
   * @default 0.4
   */
  rate?: number;

  /**
   * Base64 or URL string for the particle image
   */
  baseImageSrc?: string;
}

/**
 * Particle interface for trailing cursor effect
 */
export interface Particle {
  position: {
    x: number;
    y: number;
  };
  image: HTMLImageElement;
  move: (context: CanvasRenderingContext2D) => void;
}

/**
 * Current cursor position
 */
export interface CursorPosition {
  x: number;
  y: number;
}
