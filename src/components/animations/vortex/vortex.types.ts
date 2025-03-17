/**
 * Vortex Animation Component Types
 */

import { ReactNode } from 'react';

/**
 * Particle properties array indexes
 */
export enum ParticlePropIndex {
  X = 0,
  Y = 1,
  VX = 2,
  VY = 3,
  LIFE = 4,
  TTL = 5,
  SPEED = 6,
  RADIUS = 7,
  HUE = 8
}

/**
 * Point type definition
 */
export type Point = [number, number];

/**
 * Vortex component own props
 */
export interface VortexOwnProps {
  /**
   * Child content to display on top of the vortex
   */
  children?: ReactNode;

  /**
   * Additional className for the content container
   */
  className?: string;

  /**
   * Additional className for the canvas container
   */
  containerClassName?: string;

  /**
   * Number of particles in the vortex
   * @default 700
   */
  particleCount?: number;

  /**
   * Range for vertical particle distribution
   * @default 400
   */
  rangeY?: number;

  /**
   * Base hue value for particles (0-360)
   * @default 220
   */
  baseHue?: number;

  /**
   * Base movement speed of particles
   * @default 0.0
   */
  baseSpeed?: number;

  /**
   * Range of random speed variation
   * @default 1.5
   */
  rangeSpeed?: number;

  /**
   * Base radius of particles
   * @default 1
   */
  baseRadius?: number;

  /**
   * Range of random radius variation
   * @default 2
   */
  rangeRadius?: number;

  /**
   * Background color for the canvas
   * @default '#000000'
   */
  backgroundColor?: string;
}

/**
 * Vortex component props
 * Combines own props with HTML div attributes
 */
export type VortexProps = VortexOwnProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof VortexOwnProps>;
