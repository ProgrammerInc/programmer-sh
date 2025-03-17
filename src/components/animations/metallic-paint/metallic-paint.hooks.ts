/**
 * Hooks for the Metallic Paint animation component
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_PARAMS,
  FRAGMENT_SHADER_SOURCE,
  VERTEX_SHADER_SOURCE
} from './metallic-paint.constants';
import { ShaderParams, UniformLocations } from './metallic-paint.types';
import {
  createAndBindTexture,
  createShader,
  getUniforms,
  resizeCanvas
} from './metallic-paint.utils';

/**
 * Hook for setting up and managing the metallic paint shader effect
 *
 * @param canvasRef - Reference to the canvas element
 * @param imageData - The image data to render
 * @param params - Shader parameters
 * @returns WebGL context and uniform locations
 */
export function useMetallicPaintEffect(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageData: ImageData,
  params: ShaderParams = DEFAULT_PARAMS
): {
  gl: WebGL2RenderingContext | null;
  uniforms: UniformLocations | null;
} {
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);
  const [uniforms, setUniforms] = useState<UniformLocations | null>(null);
  const totalAnimationTime = useRef(0);
  const lastRenderTime = useRef(0);
  const textureRef = useRef<WebGLTexture | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  // Update shader uniforms with current parameters
  const updateUniforms = useCallback(() => {
    if (!gl || !uniforms) return;
    gl.uniform1f(uniforms.u_edge, params.edge);
    gl.uniform1f(uniforms.u_patternBlur, params.patternBlur);
    gl.uniform1f(uniforms.u_time, 0);
    gl.uniform1f(uniforms.u_patternScale, params.patternScale);
    gl.uniform1f(uniforms.u_refraction, params.refraction);
    gl.uniform1f(uniforms.u_liquid, params.liquid);
  }, [gl, uniforms, params]);

  // Initialize WebGL and shaders
  useEffect(() => {
    function initShader() {
      const canvas = canvasRef.current;
      const gl = canvas?.getContext('webgl2', {
        antialias: true,
        alpha: true
      });
      if (!canvas || !gl) {
        return;
      }

      // Create shaders
      const vertexShader = createShader(gl, VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER);
      const fragmentShader = createShader(gl, FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (!program || !vertexShader || !fragmentShader) {
        return;
      }

      // Store program in ref for cleanup
      programRef.current = program;

      // Link shaders to program
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        return null;
      }

      // Get uniform locations
      const uniformLocations = getUniforms(program, gl);
      setUniforms(uniformLocations);

      // Set up vertex buffer
      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      // Use program and set up attributes
      gl.useProgram(program);

      const positionLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLocation);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      setGl(gl);
    }

    initShader();
    updateUniforms();

    // Cleanup function to release WebGL resources
    return () => {
      if (gl) {
        // Delete program
        if (programRef.current) {
          gl.deleteProgram(programRef.current);
          programRef.current = null;
        }

        // Delete texture
        if (textureRef.current) {
          gl.deleteTexture(textureRef.current);
          textureRef.current = null;
        }
      }
    };
  }, [canvasRef, updateUniforms, gl]);

  // Update uniforms when params change
  useEffect(() => {
    if (!gl || !uniforms) return;
    updateUniforms();
  }, [gl, params, uniforms, updateUniforms]);

  // Handle animation rendering
  useEffect(() => {
    if (!gl || !uniforms) return;

    let renderId: number;

    function render(currentTime: number) {
      const deltaTime = currentTime - lastRenderTime.current;
      lastRenderTime.current = currentTime;

      totalAnimationTime.current += deltaTime * params.speed;
      gl!.uniform1f(uniforms.u_time, totalAnimationTime.current);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      renderId = requestAnimationFrame(render);
    }

    lastRenderTime.current = performance.now();
    renderId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(renderId);
    };
  }, [gl, params.speed, uniforms]);

  // Handle canvas resizing
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl || !gl || !uniforms || !imageData) return;

    function handleResize() {
      resizeCanvas(canvasEl, gl, uniforms, imageData, window.devicePixelRatio);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gl, uniforms, imageData, canvasRef]);

  // Create and bind texture when image data changes
  useEffect(() => {
    if (!gl || !uniforms || !imageData) return;

    const texture = createAndBindTexture(gl, uniforms, imageData);
    textureRef.current = texture;

    return () => {
      if (texture) {
        gl.deleteTexture(texture);
        textureRef.current = null;
      }
    };
  }, [gl, uniforms, imageData]);

  return { gl, uniforms };
}
