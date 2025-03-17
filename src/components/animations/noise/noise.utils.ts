/**
 * Utility functions for the Noise animation component
 */

/**
 * Generates random pixel data for the noise pattern
 *
 * @param size - Size of the pattern (width and height) in pixels
 * @param alpha - Alpha transparency value (0-255)
 * @returns ImageData object containing the random noise pattern
 */
export const generateNoisePattern = (
  size: number,
  alpha: number,
  ctx: CanvasRenderingContext2D
): ImageData => {
  const patternData = ctx.createImageData(size, size);
  const patternPixelDataLength = size * size * 4;

  for (let i = 0; i < patternPixelDataLength; i += 4) {
    const value = Math.random() * 255;
    patternData.data[i] = value; // R
    patternData.data[i + 1] = value; // G
    patternData.data[i + 2] = value; // B
    patternData.data[i + 3] = alpha; // A
  }

  return patternData;
};

/**
 * Resizes the canvas to match the window dimensions with pixel ratio correction
 *
 * @param canvas - The canvas element to resize
 * @param scaleX - Horizontal scale factor
 * @param scaleY - Vertical scale factor
 */
export const resizeCanvas = (canvas: HTMLCanvasElement, scaleX: number, scaleY: number): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;

  ctx.scale(scaleX, scaleY);
};

/**
 * Draws the noise pattern onto the canvas
 *
 * @param canvas - The main canvas element
 * @param patternCanvas - The canvas containing the noise pattern
 */
export const drawNoisePattern = (
  canvas: HTMLCanvasElement,
  patternCanvas: HTMLCanvasElement
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const pattern = ctx.createPattern(patternCanvas, 'repeat');

  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};
