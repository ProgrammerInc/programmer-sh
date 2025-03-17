/**
 * ArrowCursor Component Types
 *
 * Type definitions for the ArrowCursor component.
 */

/**
 * Properties for the ArrowCursor component.
 */
export interface ArrowCursorProps {
  /**
   * Background color for the arrow indicator.
   * @default '#111827'
   */
  bgColor?: string;

  /**
   * Foreground color for the arrow indicator.
   * @default '#64ffda'
   */
  fgColor?: string;
}

/**
 * Direction of the arrow cursor.
 */
export type ArrowDirection = 'up' | 'down' | null;

/**
 * Mouse position coordinates.
 */
export interface MousePosition {
  x: number;
  y: number;
}
