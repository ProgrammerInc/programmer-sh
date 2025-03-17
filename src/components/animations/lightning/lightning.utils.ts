import {
  LightningUniforms,
  ProgramLinkingResult,
  ShaderCompilationResult
} from './lightning.types';

/**
 * Compiles a WebGL shader from source code.
 *
 * @param {WebGLRenderingContext} gl - The WebGL context
 * @param {string} source - Shader source code
 * @param {number} type - Shader type (gl.VERTEX_SHADER or gl.FRAGMENT_SHADER)
 * @returns {ShaderCompilationResult} Result containing success status and shader or error
 */
export function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
): ShaderCompilationResult {
  const shader = gl.createShader(type);
  if (!shader) {
    return { success: false, shader: null, error: 'Failed to create shader' };
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader) || 'Unknown error';
    gl.deleteShader(shader);
    return { success: false, shader: null, error };
  }

  return { success: true, shader };
}

/**
 * Creates and links a WebGL program from vertex and fragment shaders.
 *
 * @param {WebGLRenderingContext} gl - The WebGL context
 * @param {WebGLShader} vertexShader - Compiled vertex shader
 * @param {WebGLShader} fragmentShader - Compiled fragment shader
 * @returns {ProgramLinkingResult} Result containing success status and program or error
 */
export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): ProgramLinkingResult {
  const program = gl.createProgram();
  if (!program) {
    return { success: false, program: null, error: 'Failed to create program' };
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program) || 'Unknown error';
    return { success: false, program: null, error };
  }

  return { success: true, program };
}

/**
 * Sets up a buffer with vertex data for a full-screen quad.
 *
 * @param {WebGLRenderingContext} gl - The WebGL context
 * @param {Float32Array} vertices - Vertex data
 * @param {WebGLProgram} program - WebGL program
 * @returns {boolean} Whether the setup was successful
 */
export function setupVertexBuffer(
  gl: WebGLRenderingContext,
  vertices: Float32Array,
  program: WebGLProgram
): boolean {
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    return false;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  return true;
}

/**
 * Gets all uniform locations needed for the lightning shader.
 *
 * @param {WebGLRenderingContext} gl - The WebGL context
 * @param {WebGLProgram} program - WebGL program
 * @returns {LightningUniforms} Object containing all uniform locations
 */
export function getUniformLocations(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): LightningUniforms {
  return {
    iResolution: gl.getUniformLocation(program, 'iResolution'),
    iTime: gl.getUniformLocation(program, 'iTime'),
    uHue: gl.getUniformLocation(program, 'uHue'),
    uXOffset: gl.getUniformLocation(program, 'uXOffset'),
    uSpeed: gl.getUniformLocation(program, 'uSpeed'),
    uIntensity: gl.getUniformLocation(program, 'uIntensity'),
    uSize: gl.getUniformLocation(program, 'uSize')
  };
}

/**
 * Resizes a canvas to match its display size.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to resize
 */
export function resizeCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
