/**
 * Type definitions for the Squares animation component
 */

/**
 * Type for canvas stroke style
 */
export type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

/**
 * Interface for grid offset tracking
 */
export interface GridOffset {
  /** X-axis offset */
  x: number;
  /** Y-axis offset */
  y: number;
}

/**
 * Props for the Squares animation component
 */
export interface SquaresProps {
  /** Direction in which the squares animate */
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  /** Animation speed */
  speed?: number;
  /** Color of the square borders */
  borderColor?: CanvasStrokeStyle;
  /** Size of each square in pixels */
  squareSize?: number;
  /** Fill color when hovering over a square */
  hoverFillColor?: CanvasStrokeStyle;
  /** Class name for additional styling */
  className?: string;
}
