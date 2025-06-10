/**
 * Waves Animation Component Utilities
 *
 * Contains noise generation and point calculation utilities for the waves animation.
 */
import { Point } from './waves.types';

/**
 * Calculate the actual position of a point based on its wave and cursor offsets
 *
 * @param point - The point to calculate position for
 * @returns The calculated position
 */
export const calculateMovedPoint = (point: Point): { x: number; y: number } => {
  return {
    x: point.x + point.wave.x + point.cursor.x,
    y: point.y + point.wave.y + point.cursor.y
  };
};

/**
 * Type for gradient vectors used in Perlin noise calculations
 */
type GradientVector = [number, number, number];

/**
 * Perlin Noise implementation for wave animation
 * Adapted from classic Perlin noise algorithm
 */
export class Noise {
  private perm: number[] = [];
  private gradP: GradientVector[] = [];
  private grad3: GradientVector[] = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 1, -1],
    [0, -1, -1]
  ];

  /**
   * Initialize noise generator with seed
   *
   * @param seed - Random seed value
   */
  constructor(seed: number = Math.random()) {
    if (seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }

    const p: number[] = [];
    for (let i = 0; i < 256; i++) {
      let v: number;
      if (i & 1) {
        v = p[i - 1];
      } else {
        v = Math.floor(seed * 16807 * Math.pow(2, -31)) & 255;
        seed = Math.floor(seed * 48271 * Math.pow(2, -31));
      }
      p.push(v);
    }

    // To remove the need for index wrapping, double the permutation table length
    this.perm = new Array(512);
    this.gradP = new Array(512);

    for (let i = 0; i < 512; i++) {
      const v = p[i & 255];
      this.perm[i] = v;
      this.gradP[i] = this.grad3[v % 12];
    }
  }

  /**
   * Get 2D Perlin noise value for a position
   *
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns Noise value between -1 and 1
   */
  perlin2(x: number, y: number): number {
    // Find unit grid cell containing point
    let X = Math.floor(x);
    let Y = Math.floor(y);
    // Get relative coordinates within cell
    x = x - X;
    y = y - Y;
    // Wrap the integer cells at 255
    X = X & 255;
    Y = Y & 255;

    // Calculate noise contributions from each corner
    const n00 = this.dot2(this.gradP[X + this.perm[Y]], x, y);
    const n01 = this.dot2(this.gradP[X + this.perm[Y + 1]], x, y - 1);
    const n10 = this.dot2(this.gradP[X + 1 + this.perm[Y]], x - 1, y);
    const n11 = this.dot2(this.gradP[X + 1 + this.perm[Y + 1]], x - 1, y - 1);

    // Compute the fade curve value
    const u = this.fade(x);

    // Interpolate the four results along y
    const nx0 = this.lerp(n00, n10, u);
    const nx1 = this.lerp(n01, n11, u);
    // Interpolate the two y results along x
    return this.lerp(nx0, nx1, this.fade(y));
  }

  /**
   * Calculate dot product of gradient and coordinates
   */
  private dot2(grad: GradientVector, x: number, y: number): number {
    return grad[0] * x + grad[1] * y;
  }

  /**
   * Fade function for smoother interpolation
   */
  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  /**
   * Linear interpolation
   */
  private lerp(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b;
  }
}
