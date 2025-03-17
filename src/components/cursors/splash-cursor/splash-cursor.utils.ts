/**
 * Utility functions for the SplashCursor component
 */
import {
  ColorRGB,
  FramebufferType,
  Material,
  SimulationConfig,
  WebGLContext
} from './splash-cursor.types';

/**
 * Converts HSV color to RGB
 * @param h - Hue value (0-1)
 * @param s - Saturation value (0-1)
 * @param v - Value/Brightness (0-1)
 * @returns RGB color object
 */
export function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
  let r = 0, g = 0, b = 0;
  
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return { r, g, b };
}

/**
 * Generates a random color in RGB format
 * @returns RGB color object with random values
 */
export function generateColor(): ColorRGB {
  const c = HSVtoRGB(Math.random(), 1.0, 1.0);
  return c;
}

/**
 * Initializes WebGL context with specific parameters
 * @param canvas - The canvas element
 * @param params - WebGL context parameters
 * @returns WebGL rendering context or null if initialization fails
 */
export function getWebGLContext(canvas: HTMLCanvasElement, params: Record<string, boolean>): WebGLRenderingContext | null {
  return (
    canvas.getContext('webgl2', params) ||
    canvas.getContext('webgl', params) ||
    canvas.getContext('experimental-webgl', params)
  ) as WebGLRenderingContext | null;
}

/**
 * Compiles a WebGL shader from source
 * @param gl - WebGL rendering context
 * @param type - Shader type (vertex or fragment)
 * @param source - Shader source code
 * @returns The compiled shader
 */
export function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Could not compile shader: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * Creates a WebGL program with vertex and fragment shaders
 * @param gl - WebGL rendering context
 * @param vertexSource - Vertex shader source code
 * @param fragmentSource - Fragment shader source code
 * @returns The compiled WebGL program
 */
export function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Could not link program: ' + gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

/**
 * Creates a WebGL material with a program and custom uniforms
 * @param gl - WebGL rendering context
 * @param vertexShader - Vertex shader source
 * @param fragmentShaderSource - Fragment shader source
 * @returns Material object with program and uniform locations
 */
export function createMaterial(
  gl: WebGLRenderingContext,
  vertexShader: string,
  fragmentShaderSource: string
): Material | null {
  const program = createProgram(gl, vertexShader, fragmentShaderSource);
  if (!program) return null;
  
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  
  for (let i = 0; i < uniformCount; i++) {
    const uniformInfo = gl.getActiveUniform(program, i);
    if (!uniformInfo) continue;
    
    uniforms[uniformInfo.name] = gl.getUniformLocation(program, uniformInfo.name);
  }
  
  return {
    program,
    uniforms
  };
}

/**
 * Creates a WebGL framebuffer with texture attachments
 * @param gl - WebGL rendering context
 * @param texId - Texture ID to attach
 * @returns Framebuffer object
 */
export function createFramebuffer(gl: WebGLRenderingContext, texId: WebGLTexture): WebGLFramebuffer | null {
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texId, 0);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  return fbo;
}

/**
 * Updates mouse position based on an event
 * @param e - Mouse or touch event
 * @param canvas - Canvas element for reference
 * @returns Coordinates as [x, y] in canvas space
 */
export function updatePointerPosition(
  e: MouseEvent | TouchEvent, 
  canvas: HTMLCanvasElement
): [number, number] {
  const rect = canvas.getBoundingClientRect();
  let clientX = 0;
  let clientY = 0;
  
  if ('touches' in e) {
    if (e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  return [
    (clientX - rect.left) / rect.width,
    (clientY - rect.top) / rect.height
  ];
}

/**
 * Creates a double framebuffer for ping-pong rendering technique
 * @param gl - WebGL rendering context
 * @param width - Width of the framebuffer
 * @param height - Height of the framebuffer
 * @param format - Texture format
 * @param type - Framebuffer type
 * @param minFilter - Texture minification filter
 * @param magFilter - Texture magnification filter
 * @returns Framebuffer object with read and write buffers
 */
export function createDoubleFBO(
  context: WebGLContext,
  width: number,
  height: number,
  format: number,
  type: FramebufferType,
  minFilter: number = context.gl.LINEAR,
  magFilter: number = context.gl.LINEAR
) {
  const { gl, ext } = context;
  let filtering = type === FramebufferType.HALF_FLOAT ? gl.NEAREST : minFilter;
  
  let fbo1 = createFBO(context, width, height, format, type, filtering, magFilter);
  let fbo2 = createFBO(context, width, height, format, type, filtering, magFilter);
  
  return {
    width,
    height,
    texelSizeX: 1.0 / width,
    texelSizeY: 1.0 / height,
    get read() {
      return fbo1;
    },
    set read(value) {
      fbo1 = value;
    },
    get write() {
      return fbo2;
    },
    set write(value) {
      fbo2 = value;
    },
    swap() {
      const temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    }
  };
}

/**
 * Creates a WebGL framebuffer with a texture
 * @param gl - WebGL rendering context
 * @param width - Width of the framebuffer
 * @param height - Height of the framebuffer
 * @param format - Texture format
 * @param type - Framebuffer type
 * @param minFilter - Texture minification filter
 * @param magFilter - Texture magnification filter
 * @returns Framebuffer object with texture
 */
export function createFBO(
  context: WebGLContext,
  width: number,
  height: number,
  format: number,
  type: FramebufferType,
  minFilter: number = context.gl.LINEAR,
  magFilter: number = context.gl.LINEAR
) {
  const { gl, ext } = context;
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  let internalFormat = format;
  let dataType = gl.UNSIGNED_BYTE;
  
  if (type === FramebufferType.HALF_FLOAT) {
    if (ext.textureHalfFloat) {
      internalFormat = gl.RGBA;
      dataType = ext.textureHalfFloat.HALF_FLOAT_OES;
    } else {
      internalFormat = gl.RGBA;
      dataType = gl.UNSIGNED_BYTE;
    }
  }
  
  if (type === FramebufferType.FLOAT) {
    if (ext.textureFloat) {
      dataType = gl.FLOAT;
    } else {
      dataType = gl.UNSIGNED_BYTE;
    }
  }
  
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, dataType, null);
  
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  return {
    texture,
    fbo,
    width,
    height,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    }
  };
}

/**
 * Gets an appropriate framebuffer type based on WebGL extensions support
 * @param gl - WebGL rendering context
 * @returns Appropriate framebuffer type constant
 */
export function getFramebufferType(context: WebGLContext): FramebufferType {
  const { gl, ext } = context;
  
  if (ext.textureHalfFloat && ext.supportLinearFiltering) {
    return FramebufferType.HALF_FLOAT;
  }
  
  if (ext.textureFloat) {
    return FramebufferType.FLOAT;
  }
  
  return FramebufferType.UNSIGNED_BYTE;
}

/**
 * Supports linear filtering for floating-point textures
 * @param gl - WebGL rendering context
 * @returns Boolean indicating support
 */
export function supportsLinearFiltering(gl: WebGLRenderingContext): boolean {
  const halfFloatTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, halfFloatTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  
  const halfFloatFramebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, halfFloatFramebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, halfFloatTexture, 0);
  
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status === gl.FRAMEBUFFER_COMPLETE;
}

/**
 * Initializes required WebGL extensions
 * @param gl - WebGL rendering context
 * @returns Object with required extensions
 */
export function initializeExtensions(gl: WebGLRenderingContext) {
  const textureFloat = gl.getExtension('OES_texture_float');
  const textureHalfFloat = gl.getExtension('OES_texture_half_float');
  const textureHalfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
  
  let supportLinearFiltering = false;
  if (textureHalfFloat) {
    supportLinearFiltering = supportsLinearFiltering(gl);
  }
  
  return {
    textureFloat,
    textureHalfFloat,
    textureHalfFloatLinear,
    supportLinearFiltering
  };
}

/**
 * Checks if the device has a touch screen
 * @returns Boolean indicating touch support
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Resizes a canvas element to match its display size
 * @param canvas - Canvas element to resize
 * @returns Whether the canvas was resized
 */
export function resizeCanvas(canvas: HTMLCanvasElement): boolean {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  
  return false;
}

/**
 * Creates an index.ts file to export all modules
 */
export function createQuad(gl: WebGLRenderingContext): void {
  const positions = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);
  const buffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);
}

/**
 * Defines WebGL extensions and framebuffer support
 * @param gl - WebGL rendering context
 * @returns WebGL context object with extensions and support flags
 */
export function initializeWebGLContext(gl: WebGLRenderingContext): WebGLContext {
  const ext = initializeExtensions(gl);
  
  return {
    gl,
    ext,
    supportRenderTextureFormat: {},
    framebufferType: getFramebufferType({ gl, ext } as WebGLContext)
  };
}
