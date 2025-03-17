import React from 'react';

/**
 * Props interface for the GridMotion component
 */
export interface GridMotionProps {
  /** Array of items to display in the grid (strings or React nodes) */
  items?: (string | React.ReactNode)[];

  /** Color for the background gradient (default: 'black') */
  gradientColor?: string;
}
