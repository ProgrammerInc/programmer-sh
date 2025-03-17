/**
 * Type definitions for the Magnet Lines animation component
 */

import { CSSProperties } from 'react';

/**
 * Props for the MagnetLines component
 *
 * @interface MagnetLinesProps
 */
export interface MagnetLinesProps {
  /** Number of rows in the grid. Default: 9 */
  rows?: number;

  /** Number of columns in the grid. Default: 9 */
  columns?: number;

  /** Size of the container (CSS value). Default: '80vmin' */
  containerSize?: string;

  /** Color of the lines (CSS color value). Default: '#efefef' */
  lineColor?: string;

  /** Width of each line (CSS value). Default: '1vmin' */
  lineWidth?: string;

  /** Height of each line (CSS value). Default: '6vmin' */
  lineHeight?: string;

  /** Base angle for the lines in degrees. Default: -10 */
  baseAngle?: number;

  /** Additional CSS class name */
  className?: string;

  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Pointer position coordinates
 */
export interface PointerPosition {
  /** X coordinate */
  x: number;

  /** Y coordinate */
  y: number;
}
