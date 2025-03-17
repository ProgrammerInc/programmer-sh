'use client';

import { memo, useRef } from 'react';

import { DEFAULT_SETTINGS } from './swarm-effect.constants';
import { useImageParticles, useMouseInteraction, useParticleAnimation } from './swarm-effect.hooks';
import styles from './swarm-effect.module.css';
import { SwarmEffectProps } from './swarm-effect.types';

/**
 * SwarmEffect component creates an interactive particle effect from an image
 *
 * The component loads an image and converts it to interactive particles that
 * respond to mouse movement with various effects.
 *
 * @param props - Component properties
 * @returns A React component with interactive particle swarm effect
 */
export const SwarmEffectComponent = ({
  src,
  particleSize = DEFAULT_SETTINGS.PARTICLE_SIZE,
  particleSpacing = DEFAULT_SETTINGS.PARTICLE_SPACING,
  particleColor = DEFAULT_SETTINGS.PARTICLE_COLOR,
  displacementRadius = DEFAULT_SETTINGS.DISPLACEMENT_RADIUS,
  hoverEffect = DEFAULT_SETTINGS.HOVER_EFFECT,
  className,
  ...props
}: SwarmEffectProps) => {
  // Reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load image and extract particles
  const { particles, isLoading } = useImageParticles(canvasRef, src, particleSpacing);

  // Handle mouse interactions
  const mousePosition = useMouseInteraction(canvasRef);

  // Animate particles with mouse interaction effects
  useParticleAnimation(
    canvasRef,
    particles,
    mousePosition,
    particleSize,
    particleColor,
    displacementRadius,
    hoverEffect
  );

  // Combine class names
  const containerClassName = className
    ? `${styles['swarm-effect-container']} ${className}`
    : styles['swarm-effect-container'];

  return (
    <div className={containerClassName} {...props}>
      <canvas
        ref={canvasRef}
        className={styles['swarm-effect-canvas']}
        style={{ opacity: particles.length ? 1 : 0 }}
      />
      <img src={src} alt="" className={styles['swarm-effect-hidden-image']} />
    </div>
  );
};

/**
 * Memoized SwarmEffect component for optimal performance
 */
export const SwarmEffect = memo(SwarmEffectComponent);

/**
 * Set display name for debugging purposes
 */
SwarmEffect.displayName = 'SwarmEffect';

export default SwarmEffect;
