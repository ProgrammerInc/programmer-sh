/**
 * Type definitions for the Swarm Effect animation component
 */

import { HTMLAttributes } from 'react';

/**
 * Properties for a single particle in the swarm
 */
export interface Particle {
  /** Current x-coordinate */
  x: number;
  /** Current y-coordinate */
  y: number;
  /** Original x-coordinate */
  originX: number;
  /** Original y-coordinate */
  originY: number;
}

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  /** X-coordinate relative to canvas */
  x: number;
  /** Y-coordinate relative to canvas */
  y: number;
}

/**
 * Available hover effect types
 */
export type HoverEffectType = 'scatter' | 'gather' | 'none';

/**
 * Props for the SwarmEffect component
 */
export interface SwarmEffectProps extends HTMLAttributes<HTMLDivElement> {
  /** Source image URL to create particles from */
  src: string;
  /** Size of each particle in pixels */
  particleSize?: number;
  /** Spacing between particles in pixels */
  particleSpacing?: number;
  /** Color of the particles */
  particleColor?: string;
  /** Radius around cursor that affects particles */
  displacementRadius?: number;
  /** Effect when hovering over particles */
  hoverEffect?: HoverEffectType;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Canvas dimensions information
 */
export interface CanvasDimensions {
  /** Width of the canvas in pixels */
  width: number;
  /** Height of the canvas in pixels */
  height: number;
}
