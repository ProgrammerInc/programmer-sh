/**
 * Type definitions for the Meta Balls animation component
 */

import { Vec3 } from 'ogl';

/**
 * Props for the Meta Balls component
 *
 * @interface MetaBallsProps
 */
export interface MetaBallsProps {
  /** Custom color for the metaballs. Default: '#ffffff' */
  color?: string;

  /** Animation speed factor. Default: 0.3 */
  speed?: number;

  /** Whether to enable mouse interaction with the metaballs. Default: true */
  enableMouseInteraction?: boolean;

  /** Smoothness of hovering effect (lower = snappier). Default: 0.05 */
  hoverSmoothness?: number;

  /** Size of the animation relative to screen. Default: 30 */
  animationSize?: number;

  /** Number of metaballs to render (max 50). Default: 15 */
  ballCount?: number;

  /** How closely the balls clump together. Default: 1 */
  clumpFactor?: number;

  /** Size of the cursor-following metaball. Default: 3 */
  cursorBallSize?: number;

  /** Color of the cursor metaball. Default: '#ffffff' */
  cursorBallColor?: string;

  /** Whether to enable transparency. Default: false */
  enableTransparency?: boolean;
}

/**
 * Parameters for each individual metaball
 *
 * @interface BallParams
 */
export interface BallParams {
  /** Starting angle in radians */
  st: number;

  /** Factor that controls rotation speed */
  dtFactor: number;

  /** Base scale for the ball's orbital radius */
  baseScale: number;

  /** Toggle for sin/cos variation (0 or 1) */
  toggle: number;

  /** Radius of the metaball */
  radius: number;
}

/**
 * Mouse position tracking data
 *
 * @interface MouseBallPosition
 */
export interface MouseBallPosition {
  /** X coordinate */
  x: number;

  /** Y coordinate */
  y: number;
}

/**
 * Shader uniform values type
 *
 * @interface ShaderUniforms
 */
export interface ShaderUniforms {
  iTime: { value: number };
  iResolution: { value: Vec3 };
  iMouse: { value: Vec3 };
  iColor: { value: Vec3 };
  iCursorColor: { value: Vec3 };
  iAnimationSize: { value: number };
  iBallCount: { value: number };
  iCursorBallSize: { value: number };
  iMetaBalls: { value: Vec3[] };
  iClumpFactor: { value: number };
  enableTransparency: { value: boolean };
}

/**
 * RGB color tuple type
 */
export type RGBColor = [number, number, number];
