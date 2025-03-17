import { HTMLAttributes } from 'react';

/**
 * Props for the AuroraCanvas component
 *
 * @property {string[]} [colors] - Array of colors to use for aurora particles
 * @property {number} [speed=0.2] - Speed of particle movement
 * @property {number} [layers=3] - Number of aurora layers to create
 * @property {boolean} [interactive=true] - Whether particles react to mouse movement
 * @property {number} [particleDensity=25] - Number of particles per layer
 * @property {number} [interactiveDistance=200] - Maximum distance for mouse interaction in pixels
 * @property {number} [interactiveForce=0.01] - Strength of mouse interaction effect
 * @property {string} [ariaLabel] - Accessible label for the canvas
 */
export interface AuroraCanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  colors?: string[];
  speed?: number;
  layers?: number;
  interactive?: boolean;
  particleDensity?: number;
  interactiveDistance?: number;
  interactiveForce?: number;
  ariaLabel?: string;
}

/**
 * Particle object used in the AuroraCanvas animation
 *
 * @property {number} x - X position
 * @property {number} y - Y position
 * @property {number} vx - Velocity X component
 * @property {number} vy - Velocity Y component
 * @property {number} size - Particle size
 * @property {string} color - Particle color
 * @property {number} layer - Layer index (affects z-order and behavior)
 */
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  layer: number;
}
