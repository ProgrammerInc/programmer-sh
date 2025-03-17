/**
 * Types for the Lightning animation component.
 */

/**
 * Props interface for the Lightning animation component.
 */
export interface LightningProps {
  /**
   * The hue value (0-360) for the lightning color.
   * @default 230
   */
  hue?: number;

  /**
   * Horizontal offset for the lightning effect.
   * @default 0
   */
  xOffset?: number;

  /**
   * Animation speed multiplier.
   * @default 1
   */
  speed?: number;

  /**
   * Intensity of the lightning effect.
   * @default 1
   */
  intensity?: number;

  /**
   * Size multiplier for the lightning effect.
   * @default 1
   */
  size?: number;
}

/**
 * WebGL shader compilation result.
 */
export interface ShaderCompilationResult {
  /**
   * Whether the shader compilation was successful.
   */
  success: boolean;

  /**
   * The compiled shader object or null if compilation failed.
   */
  shader: WebGLShader | null;

  /**
   * Error message if compilation failed.
   */
  error?: string;
}

/**
 * WebGL program linking result.
 */
export interface ProgramLinkingResult {
  /**
   * Whether the program linking was successful.
   */
  success: boolean;

  /**
   * The linked program object or null if linking failed.
   */
  program: WebGLProgram | null;

  /**
   * Error message if linking failed.
   */
  error?: string;
}

/**
 * WebGL uniform locations for the lightning shader.
 */
export interface LightningUniforms {
  /**
   * Location for the resolution uniform.
   */
  iResolution: WebGLUniformLocation | null;

  /**
   * Location for the time uniform.
   */
  iTime: WebGLUniformLocation | null;

  /**
   * Location for the hue uniform.
   */
  uHue: WebGLUniformLocation | null;

  /**
   * Location for the x-offset uniform.
   */
  uXOffset: WebGLUniformLocation | null;

  /**
   * Location for the speed uniform.
   */
  uSpeed: WebGLUniformLocation | null;

  /**
   * Location for the intensity uniform.
   */
  uIntensity: WebGLUniformLocation | null;

  /**
   * Location for the size uniform.
   */
  uSize: WebGLUniformLocation | null;
}
