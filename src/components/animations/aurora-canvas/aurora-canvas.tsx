'use client';

import { memo, useRef } from 'react';
import {
  DEFAULT_COLORS,
  DEFAULT_INTERACTIVE_DISTANCE,
  DEFAULT_INTERACTIVE_FORCE,
  DEFAULT_LAYERS,
  DEFAULT_PARTICLE_DENSITY,
  DEFAULT_SPEED
} from './aurora-canvas.constants';
import { useAuroraCanvasAnimation, useCanvasClassName } from './aurora-canvas.hooks';
import { AuroraCanvasProps } from './aurora-canvas.types';

/**
 * AuroraCanvas component creates beautiful aurora-like particles on a canvas
 * with optional interactive mouse effects.
 *
 * This component renders a canvas with glowing particles that move in an aurora-like
 * pattern. Particles can be configured with different colors, speeds, and densities.
 * When interactive mode is enabled, particles will react to mouse movements.
 *
 * @example
 * ```tsx
 * // Basic usage with default settings
 * <AuroraCanvas />
 *
 * // Custom colors and behavior
 * <AuroraCanvas
 *   colors={['#ff0099', '#00ff87', '#60efff']}
 *   speed={0.3}
 *   layers={5}
 *   interactive={true}
 *   ariaLabel="Interactive aurora particle animation"
 * />
 *
 * // Non-interactive version
 * <AuroraCanvas
 *   interactive={false}
 *   className="my-custom-class"
 * />
 * ```
 */
export const AuroraCanvas = memo(function AuroraCanvas({
  colors = DEFAULT_COLORS,
  speed = DEFAULT_SPEED,
  layers = DEFAULT_LAYERS,
  interactive = true,
  particleDensity = DEFAULT_PARTICLE_DENSITY,
  interactiveDistance = DEFAULT_INTERACTIVE_DISTANCE,
  interactiveForce = DEFAULT_INTERACTIVE_FORCE,
  className,
  ariaLabel = 'Decorative aurora particle animation',
  ...props
}: AuroraCanvasProps) {
  // Canvas reference
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use custom hooks for class names and animation
  const canvasClassName = useCanvasClassName(className);

  // Use the animation hook to handle canvas setup and animation
  useAuroraCanvasAnimation(
    canvasRef,
    colors,
    speed,
    layers,
    particleDensity,
    interactive,
    interactiveDistance,
    interactiveForce
  );

  return (
    <canvas
      ref={canvasRef}
      className={canvasClassName}
      aria-label={ariaLabel}
      role="img"
      {...props}
    />
  );
});

AuroraCanvas.displayName = 'AuroraCanvas';

export default AuroraCanvas;
