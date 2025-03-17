import { HTMLAttributes } from 'react';

/**
 * Properties for the BackgroundBoxes component
 *
 * @interface BackgroundBoxesProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 */
export interface BackgroundBoxesProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS class names */
  className?: string;

  /** Number of rows in the grid (default: 150) */
  rowCount?: number;

  /** Number of columns in the grid (default: 100) */
  colCount?: number;
}
