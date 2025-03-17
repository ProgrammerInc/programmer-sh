/**
 * Type definitions for the Metallic Paint animation component
 */

/**
 * Configuration parameters for the metallic paint shader
 *
 * @interface ShaderParams
 * @property {number} patternScale - Controls the scale of the pattern (higher values = smaller stripes)
 * @property {number} refraction - Controls the amount of color refraction (higher values = more color separation)
 * @property {number} edge - Controls the edge detection threshold (higher values = more defined edges)
 * @property {number} patternBlur - Controls the blur amount between stripe boundaries (higher values = more blur)
 * @property {number} liquid - Controls the liquid-like movement effect intensity (higher values = more movement)
 * @property {number} speed - Controls the animation speed
 */
export interface ShaderParams {
  patternScale: number;
  refraction: number;
  edge: number;
  patternBlur: number;
  liquid: number;
  speed: number;
}

/**
 * Properties for the MetallicPaint component
 *
 * @interface MetallicPaintProps
 * @property {ImageData} imageData - The image data to apply the metallic paint effect to
 * @property {ShaderParams} [params] - Optional shader parameters to customize the effect
 */
export interface MetallicPaintProps {
  imageData: ImageData;
  params?: ShaderParams;
}

/**
 * Result of the parseLogoImage function
 *
 * @interface ParsedImageResult
 * @property {ImageData} imageData - The processed image data with distance field
 * @property {Blob} pngBlob - The PNG blob representation of the processed image
 */
export interface ParsedImageResult {
  imageData: ImageData;
  pngBlob: Blob;
}

/**
 * WebGL shader uniform locations record type
 *
 * @type {Record<string, WebGLUniformLocation>}
 */
export type UniformLocations = Record<string, WebGLUniformLocation>;
