/**
 * Types for the Neon Cursor component.
 */

/**
 * Properties for the NeonCursor component.
 */
export interface NeonCursorProps {
  /**
   * Optional CSS class name for additional styling.
   */
  className?: string;

  /**
   * Size of the main cursor dot in pixels.
   * @default 20
   */
  cursorSize?: number;

  /**
   * Size of the trailing circle in pixels.
   * @default 40
   */
  trailSize?: number;

  /**
   * Size of the outer glow in pixels.
   * @default 60
   */
  glowSize?: number;

  /**
   * Primary color of the cursor.
   * @default "rgb(236, 101, 23)"
   */
  primaryColor?: string;

  /**
   * Hover color of the cursor.
   * @default "rgb(255, 150, 50)"
   */
  hoverColor?: string;
}

/**
 * Position state for the cursor.
 */
export interface CursorPosition {
  /**
   * X coordinate of the cursor.
   */
  x: number;

  /**
   * Y coordinate of the cursor.
   */
  y: number;

  /**
   * Scale factor of the cursor.
   */
  scale: number;

  /**
   * Opacity of the cursor.
   */
  opacity: number;
}
