/**
 * Types for the Particle Veil animation component
 */

import { HTMLAttributes } from 'react';

/**
 * Props for the Particle Veil component
 *
 * @interface ParticleVeilProps
 * @extends {HTMLAttributes<HTMLCanvasElement>}
 * @property {number} [particleCount] - Number of particles to render
 * @property {string[]} [particleColors] - Colors for the particles
 * @property {number} [interactionRadius] - Mouse interaction radius in pixels
 * @property {number} [speed] - Particle movement speed
 * @property {[number, number]} [sizeRange] - Particle size range [min, max]
 */
export interface ParticleVeilProps extends HTMLAttributes<HTMLCanvasElement> {
  /**
   * Number of particles to render
   * @default 100
   */
  particleCount?: number;

  /**
   * Colors for the particles. If multiple colors are provided, they will be distributed among particles
   * @default ["#ffffff"]
   */
  particleColors?: string[];

  /**
   * Mouse interaction radius in pixels
   * @default 100
   */
  interactionRadius?: number;

  /**
   * Particle movement speed
   * @default 1
   */
  speed?: number;

  /**
   * Particle size range [min, max]
   * @default [1, 3]
   */
  sizeRange?: [number, number];
}

/**
 * Represents a single particle in the veil
 *
 * @interface Particle
 * @property {number} x - X coordinate of the particle
 * @property {number} y - Y coordinate of the particle
 * @property {number} size - Size of the particle
 * @property {number} vx - Velocity in the X direction
 * @property {number} vy - Velocity in the Y direction
 * @property {number} baseVx - Base velocity in the X direction
 * @property {number} baseVy - Base velocity in the Y direction
 * @property {number} life - Current life value (opacity) of the particle
 * @property {string} color - Color of the particle
 */
export interface Particle {
  /**
   * X coordinate of the particle
   */
  x: number;

  /**
   * Y coordinate of the particle
   */
  y: number;

  /**
   * Size of the particle
   */
  size: number;

  /**
   * Velocity in the X direction
   */
  vx: number;

  /**
   * Velocity in the Y direction
   */
  vy: number;

  /**
   * Base velocity in the X direction
   */
  baseVx: number;

  /**
   * Base velocity in the Y direction
   */
  baseVy: number;

  /**
   * Current life value (opacity) of the particle
   */
  life: number;

  /**
   * Color of the particle
   */
  color: string;
}

/**
 * Represents the mouse position
 *
 * @interface MousePosition
 * @property {number} x - X coordinate of the mouse
 * @property {number} y - Y coordinate of the mouse
 */
export interface MousePosition {
  x: number;
  y: number;
}
