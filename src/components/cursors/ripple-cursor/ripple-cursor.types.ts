/**
 * Type definitions for the Ripple Cursor component.
 */

/**
 * Represents a single ripple effect instance.
 */
export interface Ripple {
  /**
   * Unique identifier for the ripple.
   */
  id: string;

  /**
   * X coordinate of the ripple center.
   */
  x: number;

  /**
   * Y coordinate of the ripple center.
   */
  y: number;
}

/**
 * Props for the RippleCursor component.
 */
export interface RippleCursorProps {
  /**
   * Maximum size of the ripple in pixels.
   * @default 50
   */
  maxSize?: number;

  /**
   * Duration of the ripple animation in milliseconds.
   * @default 1000
   */
  duration?: number;

  /**
   * Whether the ripple has a blur effect.
   * @default true
   */
  blur?: boolean;

  /**
   * Color of the ripple in hex format.
   * @default '#64ffda'
   */
  color?: string;
}

/**
 * State type for the ripple reducer.
 */
export type RippleState = Ripple[];

/**
 * Action types for the ripple reducer.
 */
export type RippleAction =
  | { type: 'ADD_RIPPLE'; payload: Ripple }
  | { type: 'REMOVE_RIPPLE'; payload: string };
