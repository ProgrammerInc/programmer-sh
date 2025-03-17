'use client';

import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { memo, useEffect, useRef } from 'react';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './balatro.constants';
import {
  useAccessibilityLabel,
  useContainerClassName,
  useMouseMoveHandler,
  useResizeHandler,
  useShaderUniforms
} from './balatro.hooks';
import styles from './balatro.module.css';
import { BalatroProps } from './balatro.types';
import { cleanupWebGLContext, setupCanvasAccessibility } from './balatro.utils';

/**
 * BalatroCore component - internal implementation for the Balatro animation
 *
 * Renders a colorful abstract shader animation inspired by Balatro's visuals
 * using WebGL and custom fragment shaders.
 *
 * @param props - Component properties
 * @returns JSX Element
 */
const BalatroCore = (props: BalatroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerClassName = useContainerClassName();
  const accessibilityLabel = useAccessibilityLabel();

  // Use custom hooks for animation handlers
  const handleMouseMove = useMouseMoveHandler(props.mouseInteraction);
  const handleResize = useResizeHandler();
  const uniforms = useShaderUniforms(props);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0); // Transparent background

    // Initial sizing
    renderer.setSize(container.offsetWidth, container.offsetHeight);

    // Create the triangle geometry for rendering
    const geometry = new Triangle(gl);

    // Setup the shader program with our uniforms
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms
    });

    // Create the mesh and add canvas to container
    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    // Style the canvas to fill container
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    setupCanvasAccessibility(gl.canvas);

    // Update initial resolution
    program.uniforms.iResolution.value = [
      gl.canvas.width,
      gl.canvas.height,
      gl.canvas.width / gl.canvas.height
    ];

    // Bind resize handler
    const resizeHandler = () => handleResize(container, renderer, program);
    window.addEventListener('resize', resizeHandler);

    // Create bound mousemove handler
    const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, container, program);
    container.addEventListener('mousemove', mouseMoveHandler);

    // Animation loop
    let animationFrameId: number;
    function update(time: number) {
      animationFrameId = requestAnimationFrame(update);
      program.uniforms.iTime.value = time * 0.001;
      renderer.render({ scene: mesh });
    }
    animationFrameId = requestAnimationFrame(update);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeHandler);
      container.removeEventListener('mousemove', mouseMoveHandler);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      cleanupWebGLContext(gl);
    };
  }, [
    props.spinRotation,
    props.spinSpeed,
    props.offset,
    props.color1,
    props.color2,
    props.color3,
    props.contrast,
    props.lighting,
    props.spinAmount,
    props.pixelFilter,
    props.spinEase,
    props.isRotate,
    props.mouseInteraction,
    handleMouseMove,
    handleResize,
    uniforms
  ]);

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      role="presentation"
      aria-label={accessibilityLabel}
    >
      <span className={styles['sr-only']}>
        Decorative abstract shader animation inspired by Balatro
      </span>
    </div>
  );
};

/**
 * Balatro component - creates a colorful abstract shader animation
 * inspired by the game Balatro
 *
 * Features:
 * - Colorful abstract flowing patterns with customizable colors
 * - Interactive with mouse movement
 * - Customizable speed, rotation, and visual parameters
 * - Hardware-accelerated WebGL rendering for smooth performance
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Balatro />
 *
 * // Custom configuration
 * <Balatro
 *   color1="#FF5733"
 *   color2="#33FF57"
 *   isRotate={true}
 *   spinSpeed={5.0}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns A memoized React component
 */
export const Balatro = memo(BalatroCore);

// Add displayName to help with debugging
Balatro.displayName = 'Balatro';

// Export both as default and named export for different import patterns
export default Balatro;
