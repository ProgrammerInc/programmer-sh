import React from 'react';

/**
 * Possible grid pattern types
 */
export type GridPatternType = 'dots' | 'lines' | 'squares' | 'crosshatch' | 'diamonds';

/**
 * Props interface for the GridPattern component
 */
export interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Type of grid pattern to render (default: 'dots') */
  gridType?: GridPatternType;

  /** Size of the grid cells in pixels (default: 20) */
  gridSize?: number;

  /** Opacity of the grid pattern (default: 0.2) */
  opacity?: number;

  /** Color of the grid pattern (default: 'currentColor') */
  color?: string;

  /** Whether to animate the grid pattern (default: false) */
  animate?: boolean;

  /** Additional CSS class name */
  className?: string;
}
