'use client';

import { cn } from '@/utils/app.utils';
import { memo } from 'react';
import {
  DEFAULT_INTERACTION_RADIUS,
  DEFAULT_PARTICLE_COLORS,
  DEFAULT_PARTICLE_COUNT,
  DEFAULT_SIZE_RANGE,
  DEFAULT_SPEED,
  PARTICLE_VEIL_CONTAINER_CLASS
} from './particle-veil.constants';
import { useParticleVeilAnimation } from './particle-veil.hooks';
import styles from './particle-veil.module.css';
import { ParticleVeilProps } from './particle-veil.types';

/**
 * Particle Veil component creates an interactive canvas animation with
 * particles that respond to mouse movement
 *
 * @example
 * <ParticleVeil
 *   particleCount={150}
 *   particleColors={['#ff0000', '#00ff00', '#0000ff']}
 *   interactionRadius={120}
 * />
 *
 * @param props - Component properties
 * @returns A React component that renders an animated particle veil
 */
const ParticleVeilComponent = ({
  className,
  particleCount = DEFAULT_PARTICLE_COUNT,
  particleColors = DEFAULT_PARTICLE_COLORS,
  interactionRadius = DEFAULT_INTERACTION_RADIUS,
  speed = DEFAULT_SPEED,
  sizeRange = DEFAULT_SIZE_RANGE,
  ...props
}: ParticleVeilProps) => {
  // Use the custom hook for particle veil animation logic
  const { canvasRef } = useParticleVeilAnimation(
    particleCount,
    particleColors,
    interactionRadius,
    speed,
    sizeRange
  );

  return (
    <canvas
      ref={canvasRef}
      className={cn(styles[PARTICLE_VEIL_CONTAINER_CLASS], className)}
      {...props}
    />
  );
};

// Export memoized component to prevent unnecessary re-renders
export const ParticleVeil = memo(ParticleVeilComponent);

// Add display name for better debugging
ParticleVeil.displayName = 'ParticleVeil';

export default ParticleVeil;
