/**
 * Utility functions for the Meta Balls animation component
 */

import {
  MAX_ANGLE_FACTOR,
  MAX_BASE_SCALE,
  MAX_RADIUS,
  MIN_ANGLE_FACTOR,
  MIN_BASE_SCALE,
  MIN_RADIUS
} from './meta-balls.constants';
import { BallParams, RGBColor } from './meta-balls.types';

/**
 * Converts a hexadecimal color string to RGB values normalized to [0,1]
 *
 * @param hex - Hexadecimal color string (e.g. "#ff0000")
 * @returns Array of [r, g, b] values normalized to [0,1]
 */
export function parseHexColor(hex: string): RGBColor {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

/**
 * Returns the fractional part of a number
 *
 * @param x - Input number
 * @returns The fractional part of x (x - floor(x))
 */
export function fract(x: number): number {
  return x - Math.floor(x);
}

/**
 * Hash function that converts a number to a 3D vector
 * Produces deterministic but pseudo-random output
 *
 * @param p - Input number
 * @returns Array of 3 pseudo-random numbers in range [0,1]
 */
export function hash31(p: number): number[] {
  const r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);
  const r_yzx = [r[1], r[2], r[0]];
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    r[i] = fract(r[i] + dotVal);
  }
  return r;
}

/**
 * Hash function that converts a 3D vector to another 3D vector
 * Produces deterministic but pseudo-random output
 *
 * @param v - Input array of 3 numbers
 * @returns Array of 3 pseudo-random numbers in range [0,1]
 */
export function hash33(v: number[]): number[] {
  const p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);
  const p_yxz = [p[1], p[0], p[2]];
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    p[i] = fract(p[i] + dotVal);
  }
  const p_xxy = [p[0], p[0], p[1]];
  const p_yxx = [p[1], p[0], p[0]];
  const p_zyx = [p[2], p[1], p[0]];
  const result: number[] = [];
  for (let i = 0; i < 3; i++) {
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);
  }
  return result;
}

/**
 * Generates parameters for a metaball based on its index
 *
 * @param index - Ball index (1-based)
 * @returns Object with parameters for the ball
 */
export function generateBallParams(index: number): BallParams {
  const h1 = hash31(index);
  const st = h1[0] * (2 * Math.PI);
  const dtFactor = MIN_ANGLE_FACTOR + h1[1] * (MAX_ANGLE_FACTOR - MIN_ANGLE_FACTOR);
  const baseScale = MIN_BASE_SCALE + h1[1] * (MAX_BASE_SCALE - MIN_BASE_SCALE);
  const h2 = hash33(h1);
  const toggle = Math.floor(h2[0] * 2.0);
  const radius = MIN_RADIUS + h2[2] * (MAX_RADIUS - MIN_RADIUS);

  return { st, dtFactor, baseScale, toggle, radius };
}

/**
 * Generates an array of ball parameters for all metaballs
 *
 * @param count - Number of balls to generate parameters for
 * @returns Array of ball parameters
 */
export function generateAllBallParams(count: number): BallParams[] {
  const ballParams: BallParams[] = [];
  for (let i = 0; i < count; i++) {
    // Use 1-based indexing for the hash functions
    ballParams.push(generateBallParams(i + 1));
  }
  return ballParams;
}

/**
 * Updates the position of a metaball based on time and its parameters
 *
 * @param params - Ball parameters
 * @param time - Current animation time
 * @param speed - Animation speed factor
 * @param clumpFactor - How closely the balls clump together
 * @returns [x, y] coordinates of the ball
 */
export function updateBallPosition(
  params: BallParams,
  time: number,
  speed: number,
  clumpFactor: number
): [number, number] {
  const dt = time * speed * params.dtFactor;
  const th = params.st + dt;
  const x = Math.cos(th);
  const y = Math.sin(th + dt * params.toggle);
  const posX = x * params.baseScale * clumpFactor;
  const posY = y * params.baseScale * clumpFactor;

  return [posX, posY];
}

/**
 * Calculates target cursor position when cursor is outside the container
 *
 * @param canvasWidth - Width of the canvas
 * @param canvasHeight - Height of the canvas
 * @param time - Current animation time
 * @param speed - Animation speed factor
 * @param orbitFactor - Orbit radius factor (relative to canvas size)
 * @returns [x, y] coordinates for the cursor position
 */
export function calculateOrbitPosition(
  canvasWidth: number,
  canvasHeight: number,
  time: number,
  speed: number,
  orbitFactor: number
): [number, number] {
  const cx = canvasWidth * 0.5;
  const cy = canvasHeight * 0.5;
  const rx = canvasWidth * orbitFactor;
  const ry = canvasHeight * orbitFactor;
  const x = cx + Math.cos(time * speed) * rx;
  const y = cy + Math.sin(time * speed) * ry;

  return [x, y];
}
