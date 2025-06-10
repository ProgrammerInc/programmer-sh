/**
 * Utility functions for the Waves animation component
 */

/**
 * Gradient class for the Perlin noise algorithm
 */
export class WavesGrad {
  x: number;
  y: number;
  z: number;

  /**
   * Creates a new gradient vector
   * @param x The x component of the gradient
   * @param y The y component of the gradient
   * @param z The z component of the gradient
   */
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Calculate the dot product of this gradient with a 2D vector
   * @param x X component of the vector
   * @param y Y component of the vector
   * @returns The dot product
   */
  dot2(x: number, y: number): number {
    return this.x * x + this.y * y;
  }
}

/**
 * Perlin noise implementation for smooth wave animations
 */
export class WavesNoise {
  grad3: WavesGrad[];
  p: number[];
  perm: number[];
  gradP: WavesGrad[];

  /**
   * Creates a new Perlin noise generator
   * @param seed Random seed for the noise generator
   */
  constructor(seed = 0) {
    this.grad3 = [
      new WavesGrad(1, 1, 0),
      new WavesGrad(-1, 1, 0),
      new WavesGrad(1, -1, 0),
      new WavesGrad(-1, -1, 0),
      new WavesGrad(1, 0, 1),
      new WavesGrad(-1, 0, 1),
      new WavesGrad(1, 0, -1),
      new WavesGrad(-1, 0, -1),
      new WavesGrad(0, 1, 1),
      new WavesGrad(0, -1, 1),
      new WavesGrad(0, 1, -1),
      new WavesGrad(0, -1, -1)
    ];
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
      142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
      203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
      74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
      220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209,
      76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198,
      173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
      207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
      154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79,
      113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
      191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29,
      24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
    ];
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }

  /**
   * Seed the noise generator
   * @param seed Seed value
   */
  seed(seed: number): void {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (let i = 0; i < 256; i++) {
      const v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }

  /**
   * Fade function for Perlin noise
   * @param t Value to fade
   * @returns Faded value
   */
  fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  /**
   * Linear interpolation
   * @param a First value
   * @param b Second value
   * @param t Interpolation factor (0-1)
   * @returns Interpolated value
   */
  lerp(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b;
  }

  /**
   * 2D Perlin noise
   * @param x X coordinate
   * @param y Y coordinate
   * @returns Noise value (-1 to 1)
   */
  perlin2(x: number, y: number): number {
    let X = Math.floor(x),
      Y = Math.floor(y);
    x -= X;
    y -= Y;
    X &= 255;
    Y &= 255;
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
    const u = this.fade(x);
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));
  }
}

/**
 * Calculate the position of a point with wave and cursor influence
 * @param point The point to calculate position for
 * @param withCursor Whether to include cursor influence
 * @returns The calculated position
 */
export const calculatePointPosition = (
  point: {
    x: number;
    y: number;
    wave: { x: number; y: number };
    cursor: { x: number; y: number };
  },
  withCursor = true
): { x: number; y: number } => {
  const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
  const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
};

/**
 * Set up the wave grid
 * @param width Container width
 * @param height Container height
 * @param xGap Horizontal gap between points
 * @param yGap Vertical gap between points
 * @returns Array of wave points
 */
export const createWaveGrid = (
  width: number,
  height: number,
  xGap: number,
  yGap: number
): Array<
  Array<{
    x: number;
    y: number;
    wave: { x: number; y: number };
    cursor: { x: number; y: number; vx: number; vy: number };
  }>
> => {
  const lines: Array<
    Array<{
      x: number;
      y: number;
      wave: { x: number; y: number };
      cursor: { x: number; y: number; vx: number; vy: number };
    }>
  > = [];

  const oWidth = width + 200;
  const oHeight = height + 30;
  const totalLines = Math.ceil(oWidth / xGap);
  const totalPoints = Math.ceil(oHeight / yGap);
  const xStart = (width - xGap * totalLines) / 2;
  const yStart = (height - yGap * totalPoints) / 2;

  for (let i = 0; i <= totalLines; i++) {
    const pts: {
      x: number;
      y: number;
      wave: { x: number; y: number };
      cursor: { x: number; y: number; vx: number; vy: number };
    }[] = [];
    for (let j = 0; j <= totalPoints; j++) {
      pts.push({
        x: xStart + xGap * i,
        y: yStart + yGap * j,
        wave: { x: 0, y: 0 },
        cursor: { x: 0, y: 0, vx: 0, vy: 0 }
      });
    }
    lines.push(pts);
  }

  return lines;
};

/**
 * Update mouse tracking data
 * @param x Current mouse X position
 * @param y Current mouse Y position
 * @param boundingRect Container bounding rectangle
 * @param mouse Current mouse state object to update
 */
export const updateMouseTracking = (
  x: number,
  y: number,
  boundingRect: { left: number; top: number },
  mouse: {
    x: number;
    y: number;
    lx: number;
    ly: number;
    sx: number;
    sy: number;
    set: boolean;
  }
): void => {
  mouse.x = x - boundingRect.left;
  mouse.y = y - boundingRect.top + window.scrollY;

  if (!mouse.set) {
    mouse.sx = mouse.x;
    mouse.sy = mouse.y;
    mouse.lx = mouse.x;
    mouse.ly = mouse.y;
    mouse.set = true;
  }
};
