/**
 * Vortex Animation Component Utilities
 */

/**
 * Generate a random number between 0 and n
 *
 * @param n - Maximum value (exclusive)
 * @returns Random number between 0 and n
 */
export const rand = (n: number): number => n * Math.random();

/**
 * Generate a random number between -n and n
 *
 * @param n - Range value
 * @returns Random number between -n and n
 */
export const randRange = (n: number): number => n - rand(2 * n);

/**
 * Calculate a fade effect that transitions from 0 to 1 and back to 0
 *
 * @param t - Current time/position
 * @param m - Maximum time/position value
 * @returns Value between 0 and 1
 */
export const fadeInOut = (t: number, m: number): number => {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
};

/**
 * Linear interpolation between two values
 *
 * @param n1 - First value
 * @param n2 - Second value
 * @param speed - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export const lerp = (n1: number, n2: number, speed: number): number =>
  (1 - speed) * n1 + speed * n2;

/**
 * Check if point is outside canvas bounds
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param canvas - Canvas element
 * @returns True if outside bounds
 */
export const checkBounds = (x: number, y: number, canvas: HTMLCanvasElement): boolean => {
  return x > canvas.width || x < 0 || y > canvas.height || y < 0;
};

/**
 * Handle canvas resize
 *
 * @param canvas - Canvas element to resize
 * @param center - Center point reference to update
 * @param ctx - Optional canvas context
 */
export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  center: [number, number],
  ctx?: CanvasRenderingContext2D
): void => {
  const { innerWidth, innerHeight } = window;

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  center[0] = 0.5 * canvas.width;
  center[1] = 0.5 * canvas.height;
};

/**
 * Apply glow effect to canvas
 *
 * @param canvas - Canvas element
 * @param ctx - Canvas rendering context
 * @param blurValue1 - First blur level
 * @param blurValue2 - Second blur level
 * @param brightness - Brightness percentage
 */
export const renderGlow = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  blurValue1: string,
  blurValue2: string,
  brightness: string
): void => {
  ctx.save();
  ctx.filter = `blur(${blurValue1}) brightness(${brightness})`;
  ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(canvas, 0, 0);
  ctx.restore();

  ctx.save();
  ctx.filter = `blur(${blurValue2}) brightness(${brightness})`;
  ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(canvas, 0, 0);
  ctx.restore();
};

/**
 * Render final composite image to screen
 *
 * @param canvas - Canvas element
 * @param ctx - Canvas rendering context
 */
export const renderToScreen = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(canvas, 0, 0);
  ctx.restore();
};
