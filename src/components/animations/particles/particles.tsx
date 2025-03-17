'use client';

import React, { useRef } from 'react';

import { cn } from '@/utils/app.utils';

import {
  DEFAULT_ALPHA_PARTICLES,
  DEFAULT_CAMERA_DISTANCE,
  DEFAULT_DISABLE_ROTATION,
  DEFAULT_MOVE_PARTICLES_ON_HOVER,
  DEFAULT_PARTICLE_BASE_SIZE,
  DEFAULT_PARTICLE_COLORS,
  DEFAULT_PARTICLE_COUNT,
  DEFAULT_PARTICLE_HOVER_FACTOR,
  DEFAULT_PARTICLE_SPREAD,
  DEFAULT_SIZE_RANDOMNESS,
  DEFAULT_SPEED
} from './particles.constants';
import { useParticlesAnimation } from './particles.hooks';
import styles from './particles.module.css';
import { ParticlesProps } from './particles.types';

/**
 * Particles component that renders 3D particles with WebGL
 *
 * @component
 * @example
 * ```tsx
 * <Particles
 *   particleCount={500}
 *   particleColors={['#ff0000', '#00ff00', '#0000ff']}
 *   moveParticlesOnHover={true}
 * />
 * ```
 */
export const Particles = React.memo<ParticlesProps>(
  ({
    particleCount = DEFAULT_PARTICLE_COUNT,
    particleSpread = DEFAULT_PARTICLE_SPREAD,
    speed = DEFAULT_SPEED,
    particleColors = DEFAULT_PARTICLE_COLORS,
    moveParticlesOnHover = DEFAULT_MOVE_PARTICLES_ON_HOVER,
    particleHoverFactor = DEFAULT_PARTICLE_HOVER_FACTOR,
    alphaParticles = DEFAULT_ALPHA_PARTICLES,
    particleBaseSize = DEFAULT_PARTICLE_BASE_SIZE,
    sizeRandomness = DEFAULT_SIZE_RANDOMNESS,
    cameraDistance = DEFAULT_CAMERA_DISTANCE,
    disableRotation = DEFAULT_DISABLE_ROTATION,
    className,
    ...rest
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Use the custom hook to handle all the animation logic
    useParticlesAnimation(containerRef, {
      particleCount,
      particleSpread,
      speed,
      particleColors,
      moveParticlesOnHover,
      particleHoverFactor,
      alphaParticles,
      particleBaseSize,
      sizeRandomness,
      cameraDistance,
      disableRotation
    });

    return (
      <div ref={containerRef} className={cn(styles['particles-container'], className)} {...rest} />
    );
  }
);

// Display name for debugging
Particles.displayName = 'Particles';

export default Particles;
