/**
 * MagicTrailCursor
 *
 * Type definitions for the MagicTrailCursor component
 *
 * @module MagicTrailCursor/Types
 */

import { RefObject } from 'react';

/**
 * Interface for a point in the magic trail
 */
export interface TrailPoint {
  x: number;
  y: number;
  age: number;
  color: string;
}

/**
 * Interface for a particle in the magic trail
 */
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

/**
 * Interface for position coordinates
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Interface for the MagicTrailCursor component props
 */
export interface MagicTrailCursorProps {
  /** Additional CSS class names */
  className?: string;
  /** Array of colors to use for the trail */
  colors?: string[];
  /** Maximum number of particles */
  particleCount?: number;
  /** Maximum length of the trail */
  trailLength?: number;
  /** Rate at which trail points decay (0-1) */
  decay?: number;
  /** Smoothing factor for cursor movement (0-1) */
  smoothing?: number;
  /** Reference to the container element */
  containerRef?: RefObject<HTMLElement | null>;
  /** Optional key for proper remounting */
  key?: string | number;
}

/**
 * Interface for the state of a MagicTrailCursor instance
 */
export interface MagicTrailCursorState {
  /** Reference to the canvas element */
  canvasRef: RefObject<HTMLCanvasElement>;
  /** Flag to track if the component is mounted */
  isMounted: boolean;
}
