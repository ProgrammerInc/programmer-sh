'use client';

import { memo, useRef } from 'react';
import {
  DEFAULT_CLASS_NAME,
  DEFAULT_DISTORTION_STRENGTH,
  DEFAULT_GRID_SIZE,
  DEFAULT_MOUSE_STRENGTH,
  DEFAULT_RELAXATION
} from './grid-distortion.constants';
import {
  useAnimationLoop,
  useCamera,
  useDataTexture,
  useImageTexture,
  useMesh,
  useMouseInteraction,
  useRenderer,
  useResizeHandler,
  useScene,
  useShaderUniforms
} from './grid-distortion.hooks';
import styles from './grid-distortion.module.css';
import { GridDistortionProps } from './grid-distortion.types';

/**
 * GridDistortion Component
 * Renders an image with interactive grid-based distortion effects
 *
 * @example
 * <GridDistortion
 *   imageSrc="/path/to/image.jpg"
 *   grid={20}
 *   strength={0.2}
 *   mouse={0.15}
 *   relaxation={0.85}
 * />
 *
 * @param props Component properties
 * @returns React component
 */
export const GridDistortion = memo(function GridDistortion({
  grid = DEFAULT_GRID_SIZE,
  mouse = DEFAULT_MOUSE_STRENGTH,
  strength = DEFAULT_DISTORTION_STRENGTH,
  relaxation = DEFAULT_RELAXATION,
  imageSrc,
  className = DEFAULT_CLASS_NAME
}: GridDistortionProps) {
  // Create container ref
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Three.js core objects using custom hooks
  const scene = useScene();
  const camera = useCamera();
  const renderer = useRenderer(containerRef);
  const uniforms = useShaderUniforms();

  // Create mesh and setup initial data texture
  const mesh = useMesh(scene, uniforms, grid);
  const initialData = useDataTexture(grid, uniforms);

  // Handle mouse interaction
  const mouseState = useMouseInteraction(containerRef);

  // Handle resize and image loading
  const handleResize = useResizeHandler(
    containerRef,
    renderer,
    camera,
    mesh,
    1, // Default aspect ratio, will be updated after image loads
    uniforms
  );

  // Setup image texture and handle loading
  const { imageAspect, error } = useImageTexture(imageSrc, uniforms, handleResize);

  // Set up animation loop
  useAnimationLoop(
    renderer,
    scene,
    camera,
    uniforms,
    mouseState,
    initialData,
    grid,
    mouse,
    strength,
    relaxation
  );

  // Render component
  return (
    <div
      ref={containerRef}
      className={`${styles['grid-distortion-container']} ${className}`}
      aria-label="Interactive grid distortion effect"
    >
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
});

export default GridDistortion;
