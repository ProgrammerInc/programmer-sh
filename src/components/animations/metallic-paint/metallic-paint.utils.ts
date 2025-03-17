/**
 * Utility functions for the Metallic Paint animation component
 */

import {
  DISTANCE_FIELD_ALPHA,
  DISTANCE_FIELD_CONSTANT,
  DISTANCE_FIELD_ITERATIONS,
  MAX_IMAGE_SIZE,
  MIN_IMAGE_SIZE
} from './metallic-paint.constants';
import { ParsedImageResult } from './metallic-paint.types';

/**
 * Creates a WebGL shader of the specified type
 *
 * @param gl - The WebGL rendering context
 * @param sourceCode - The GLSL source code for the shader
 * @param type - The type of shader (VERTEX_SHADER or FRAGMENT_SHADER)
 * @returns The created shader or null if compilation failed
 */
export function createShader(
  gl: WebGL2RenderingContext,
  sourceCode: string,
  type: number
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * Retrieves all uniform locations from a WebGL program
 *
 * @param program - The WebGL program
 * @param gl - The WebGL rendering context
 * @returns Record of uniform names to locations
 */
export function getUniforms(
  program: WebGLProgram,
  gl: WebGL2RenderingContext
): Record<string, WebGLUniformLocation> {
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

  for (let i = 0; i < uniformCount; i++) {
    const uniformName = gl.getActiveUniform(program, i)?.name;
    if (!uniformName) continue;
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName) as WebGLUniformLocation;
  }

  return uniforms;
}

/**
 * Checks if a pixel is inside the shape mask
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param width - Image width
 * @param height - Image height
 * @param shapeMask - Boolean array representing shape mask
 * @returns Whether the pixel is inside the shape
 */
export function isInsideShape(
  x: number,
  y: number,
  width: number,
  height: number,
  shapeMask: boolean[]
): boolean {
  if (x < 0 || x >= width || y < 0 || y >= height) return false;
  return shapeMask[y * width + x];
}

/**
 * Gets the value from a distance field array at a specific position
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param width - Image width
 * @param height - Image height
 * @param shapeMask - Boolean array representing shape mask
 * @param arr - Float32Array containing distance field values
 * @returns Distance field value at position
 */
export function getDistanceValue(
  x: number,
  y: number,
  width: number,
  height: number,
  shapeMask: boolean[],
  arr: Float32Array
): number {
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  if (!shapeMask[y * width + x]) return 0;
  return arr[y * width + x];
}

/**
 * Creates a boundary mask for a shape
 *
 * @param width - Image width
 * @param height - Image height
 * @param shapeMask - Boolean array representing shape mask
 * @returns Boundary mask as boolean array
 */
export function createBoundaryMask(width: number, height: number, shapeMask: boolean[]): boolean[] {
  const boundaryMask = new Array(width * height).fill(false);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!shapeMask[idx]) continue;

      let isBoundary = false;
      for (let ny = y - 1; ny <= y + 1 && !isBoundary; ny++) {
        for (let nx = x - 1; nx <= x + 1 && !isBoundary; nx++) {
          if (!isInsideShape(nx, ny, width, height, shapeMask)) {
            isBoundary = true;
          }
        }
      }

      if (isBoundary) {
        boundaryMask[idx] = true;
      }
    }
  }

  return boundaryMask;
}

/**
 * Creates an interior mask for a shape
 *
 * @param width - Image width
 * @param height - Image height
 * @param shapeMask - Boolean array representing shape mask
 * @returns Interior mask as boolean array
 */
export function createInteriorMask(width: number, height: number, shapeMask: boolean[]): boolean[] {
  const interiorMask = new Array(width * height).fill(false);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (
        shapeMask[idx] &&
        shapeMask[idx - 1] &&
        shapeMask[idx + 1] &&
        shapeMask[idx - width] &&
        shapeMask[idx + width]
      ) {
        interiorMask[idx] = true;
      }
    }
  }

  return interiorMask;
}

/**
 * Creates a distance field for a shape
 *
 * @param width - Image width
 * @param height - Image height
 * @param shapeMask - Boolean array representing shape mask
 * @param boundaryMask - Boolean array representing boundary mask
 * @returns Float32Array containing distance field values
 */
export function createDistanceField(
  width: number,
  height: number,
  shapeMask: boolean[],
  boundaryMask: boolean[]
): Float32Array {
  const u = new Float32Array(width * height).fill(0);
  const newU = new Float32Array(width * height).fill(0);

  // Run multiple iterations to calculate distance field
  for (let iter = 0; iter < DISTANCE_FIELD_ITERATIONS; iter++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (!shapeMask[idx] || boundaryMask[idx]) {
          newU[idx] = 0;
          continue;
        }
        const sumN =
          getDistanceValue(x + 1, y, width, height, shapeMask, u) +
          getDistanceValue(x - 1, y, width, height, shapeMask, u) +
          getDistanceValue(x, y + 1, width, height, shapeMask, u) +
          getDistanceValue(x, y - 1, width, height, shapeMask, u);
        newU[idx] = (DISTANCE_FIELD_CONSTANT + sumN) / 4;
      }
    }
    u.set(newU);
  }

  return u;
}

/**
 * Parses a logo image file to generate a distance field visualization
 *
 * @param file - The image file to process
 * @returns Promise resolving to parsed image data and PNG blob
 */
export function parseLogoImage(file: File): Promise<ParsedImageResult> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  return new Promise((resolve, reject) => {
    if (!file || !ctx) {
      reject(new Error('Invalid file or context'));
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      if (file.type === 'image/svg+xml') {
        img.width = 1000;
        img.height = 1000;
      }

      let width = img.naturalWidth;
      let height = img.naturalHeight;

      // Resize image if needed
      if (
        width > MAX_IMAGE_SIZE ||
        height > MAX_IMAGE_SIZE ||
        width < MIN_IMAGE_SIZE ||
        height < MIN_IMAGE_SIZE
      ) {
        if (width > height) {
          if (width > MAX_IMAGE_SIZE) {
            height = Math.round((height * MAX_IMAGE_SIZE) / width);
            width = MAX_IMAGE_SIZE;
          } else if (width < MIN_IMAGE_SIZE) {
            height = Math.round((height * MIN_IMAGE_SIZE) / width);
            width = MIN_IMAGE_SIZE;
          }
        } else {
          if (height > MAX_IMAGE_SIZE) {
            width = Math.round((width * MAX_IMAGE_SIZE) / height);
            height = MAX_IMAGE_SIZE;
          } else if (height < MIN_IMAGE_SIZE) {
            width = Math.round((width * MIN_IMAGE_SIZE) / height);
            height = MIN_IMAGE_SIZE;
          }
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Create shape mask from image
      const shapeCanvas = document.createElement('canvas');
      shapeCanvas.width = width;
      shapeCanvas.height = height;
      const shapeCtx = shapeCanvas.getContext('2d')!;
      shapeCtx.drawImage(img, 0, 0, width, height);

      const shapeImageData = shapeCtx.getImageData(0, 0, width, height);
      const data = shapeImageData.data;
      const shapeMask = new Array(width * height).fill(false);

      // Create shape mask based on non-white, non-transparent pixels
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx4 = (y * width + x) * 4;
          const r = data[idx4];
          const g = data[idx4 + 1];
          const b = data[idx4 + 2];
          const a = data[idx4 + 3];
          shapeMask[y * width + x] = !(
            (r === 255 && g === 255 && b === 255 && a === 255) ||
            a === 0
          );
        }
      }

      // Create boundary and interior masks
      const boundaryMask = createBoundaryMask(width, height, shapeMask);
      const interiorMask = createInteriorMask(width, height, shapeMask);

      // Calculate distance field
      const distanceField = createDistanceField(width, height, shapeMask, boundaryMask);

      // Find max value in distance field
      let maxVal = 0;
      for (let i = 0; i < width * height; i++) {
        if (distanceField[i] > maxVal) maxVal = distanceField[i];
      }

      // Create output image with distance field visualization
      const outImg = ctx.createImageData(width, height);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          const px = idx * 4;
          if (!shapeMask[idx]) {
            outImg.data[px] = 255;
            outImg.data[px + 1] = 255;
            outImg.data[px + 2] = 255;
            outImg.data[px + 3] = 255;
          } else {
            const raw = distanceField[idx] / maxVal;
            const remapped = Math.pow(raw, DISTANCE_FIELD_ALPHA);
            const gray = 255 * (1 - remapped);
            outImg.data[px] = gray;
            outImg.data[px + 1] = gray;
            outImg.data[px + 2] = gray;
            outImg.data[px + 3] = 255;
          }
        }
      }
      ctx.putImageData(outImg, 0, 0);

      // Convert canvas to blob
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Failed to create PNG blob'));
          return;
        }
        resolve({
          imageData: outImg,
          pngBlob: blob
        });
      }, 'image/png');
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Resizes the canvas for the metallic paint effect
 *
 * @param canvasEl - The canvas element
 * @param gl - The WebGL rendering context
 * @param uniforms - Uniform locations
 * @param imageData - The image data
 * @param devicePixelRatio - Current device pixel ratio
 */
export function resizeCanvas(
  canvasEl: HTMLCanvasElement,
  gl: WebGL2RenderingContext,
  uniforms: Record<string, WebGLUniformLocation>,
  imageData: ImageData,
  devicePixelRatio: number
): void {
  if (!canvasEl || !gl || !uniforms || !imageData) return;

  const imgRatio = imageData.width / imageData.height;
  gl.uniform1f(uniforms.u_img_ratio, imgRatio);

  const side = 1000;
  canvasEl.width = side * devicePixelRatio;
  canvasEl.height = side * devicePixelRatio;
  gl.viewport(0, 0, canvasEl.height, canvasEl.height);
  gl.uniform1f(uniforms.u_ratio, 1);
  gl.uniform1f(uniforms.u_img_ratio, imgRatio);
}

/**
 * Creates and binds a texture from image data
 *
 * @param gl - The WebGL rendering context
 * @param uniforms - Uniform locations
 * @param imageData - The image data to create texture from
 * @returns The created texture
 */
export function createAndBindTexture(
  gl: WebGL2RenderingContext,
  uniforms: Record<string, WebGLUniformLocation>,
  imageData: ImageData
): WebGLTexture | null {
  // Clean up existing texture if present
  const existingTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);
  if (existingTexture) {
    gl.deleteTexture(existingTexture);
  }

  const imageTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, imageTexture);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

  try {
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      imageData?.width,
      imageData?.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      imageData?.data
    );

    gl.uniform1i(uniforms.u_image_texture, 0);
    return imageTexture;
  } catch (e) {
    console.error('Error uploading texture:', e);
    return null;
  }
}
