/**
 * Types for the SplashCursor component
 */

/**
 * RGB Color representation
 */
export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Framebuffer type enum
 */
export enum FramebufferType {
  HALF_FLOAT,
  FLOAT,
  UNSIGNED_BYTE
}

/**
 * Simulation configuration options
 */
export interface SimulationConfig {
  SIM_RESOLUTION: number;
  DYE_RESOLUTION: number;
  CAPTURE_RESOLUTION: number;
  DENSITY_DISSIPATION: number;
  VELOCITY_DISSIPATION: number;
  PRESSURE: number;
  PRESSURE_ITERATIONS: number;
  CURL: number;
  SPLAT_RADIUS: number;
  SPLAT_FORCE: number;
  SHADING: boolean;
  COLOR_UPDATE_SPEED: number;
  PAUSED?: boolean;
  BACK_COLOR: ColorRGB;
  TRANSPARENT: boolean;
}

/**
 * Props for the SplashCursor component
 */
export interface SplashCursorProps {
  config?: Partial<SimulationConfig>;
}

/**
 * Pointer interface for tracking cursor/touch inputs
 */
export interface Pointer {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}

/**
 * Default values for a new pointer
 */
export const PointerPrototype: Partial<Pointer> = {
  id: -1,
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  down: false,
  moved: false
};

/**
 * Material interface for WebGL shader programs
 */
export interface Material {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

/**
 * WebGL extensions interface
 */
export interface WebGLExtensions {
  textureFloat: WebGLExtension | null;
  textureHalfFloat: WebGLExtension | null;
  textureHalfFloatLinear: WebGLExtension | null;
  supportLinearFiltering: boolean;
}

/**
 * Generic WebGL Extension type
 */
export interface WebGLExtension {
  [key: string]: unknown;
}

/**
 * WebGL extensions and context information
 */
export interface WebGLContext {
  gl: WebGLRenderingContext;
  ext: WebGLExtensions;
  supportRenderTextureFormat: Record<string, boolean>;
  framebufferType: FramebufferType;
}

/**
 * WebGL context and extensions
 */
export interface WebGLContextWithExt {
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  ext: {
    formatRGBA: FormatWithInternalFormat | null;
    formatRG: FormatWithInternalFormat | null;
    formatR: FormatWithInternalFormat | null;
    halfFloatTexType: number;
    supportLinearFiltering: boolean;
  };
}

/**
 * Format with internal format for WebGL textures
 */
export interface FormatWithInternalFormat {
  internalFormat: number;
  format: number;
}

/**
 * FBO (Framebuffer Object) interface
 */
export interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

/**
 * DoubleFBO for ping-pong rendering
 */
export interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

/**
 * Resolution object with width and height
 */
export interface Resolution {
  width: number;
  height: number;
}
