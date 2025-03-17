/**
 * Custom hooks for the Aurora component
 */

import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';
import { useCallback, useEffect, useRef } from 'react';
import { DEFAULT_AURORA_CONFIG, FRAGMENT_SHADER, VERTEX_SHADER } from './aurora.constants';
import { AuroraProps } from './aurora.types';

/**
 * Hook to set up and manage the Aurora WebGL effect
 *
 * @param props - Aurora component properties
 * @returns Object containing refs and container element
 */
export function useAurora(props: AuroraProps) {
  const {
    backgroundColor = DEFAULT_AURORA_CONFIG.backgroundColor,
    colorStops = DEFAULT_AURORA_CONFIG.colorStops,
    amplitude = DEFAULT_AURORA_CONFIG.amplitude,
    blend = DEFAULT_AURORA_CONFIG.blend,
    speed = DEFAULT_AURORA_CONFIG.speed
  } = props;

  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Creates a handler for window resize events
   *
   * @param renderer - OGL renderer instance
   * @param program - Shader program
   * @param container - DOM element containing the canvas
   * @returns Resize event handler function
   */
  const createResizeHandler = useCallback(
    (renderer: Renderer, program: Program, container: HTMLDivElement) => {
      return () => {
        if (!container) return;
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        renderer.setSize(width, height);
        program.uniforms.uResolution.value = [width, height];
      };
    },
    []
  );

  /**
   * Set up the WebGL context and animation loop
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize WebGL renderer with appropriate settings
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = backgroundColor;

    // Convert hex color strings to RGB arrays for shader
    const colorStopsArray = colorStops.map(hex => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    // Create shader program with uniforms
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uBlend: { value: blend }
      }
    });

    // Handler for window resize events
    const resize = createResizeHandler(renderer, program, container);
    window.addEventListener('resize', resize);

    // Set up geometry for full-screen effect
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete (geometry.attributes as Record<string, unknown>).uv;
    }

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    // Animation loop
    let animationId = 0;
    const update = (t: number) => {
      animationId = requestAnimationFrame(update);
      const { time = t * 0.01, speed: currentSpeed = speed } = propsRef.current;
      program.uniforms.uTime.value = time * currentSpeed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? amplitude;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      const currentStops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = currentStops.map((hex: string) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      renderer.render({ scene: mesh });
    };
    animationId = requestAnimationFrame(update);

    // Initial resize to set correct dimensions
    resize();

    // Clean up resources when component unmounts
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
      // Clean up WebGL resources
      geometry.remove();
      mesh.geometry.remove();
      mesh.program.remove();
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [backgroundColor, blend, amplitude, colorStops, speed, createResizeHandler]);

  return {
    containerRef
  };
}
