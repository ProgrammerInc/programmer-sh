'use client';

import { cn } from '@/utils/app.utils';
import { memo } from 'react';
import {
  DEFAULT_INTERACTIVE,
  DEFAULT_LINE_COLOR,
  DEFAULT_MAX_DISTANCE,
  DEFAULT_PARTICLE_COLOR,
  DEFAULT_PARTICLE_COUNT,
  DEFAULT_PARTICLE_SIZE,
  DEFAULT_SPEED,
  PARTICLE_NETWORK_CONTAINER_CLASS
} from './particle-network.constants';
import { useParticleNetworkAnimation } from './particle-network.hooks';
import styles from './particle-network.module.css';
import { ParticleNetworkProps } from './particle-network.types';

/**
 * Particle Network component creates an interactive canvas-based particle animation
 *
 * @example
 * <ParticleNetwork
 *   particleCount={100}
 *   particleColor="#4a90e2"
 *   interactive={true}
 * />
 *
 * @param props - Component properties
 * @returns A React component that renders an animated particle network
 */
const ParticleNetworkComponent = ({
  particleCount = DEFAULT_PARTICLE_COUNT,
  particleSize = DEFAULT_PARTICLE_SIZE,
  particleColor = DEFAULT_PARTICLE_COLOR,
  lineColor = DEFAULT_LINE_COLOR,
  maxDistance = DEFAULT_MAX_DISTANCE,
  speed = DEFAULT_SPEED,
  className = '',
  interactive = DEFAULT_INTERACTIVE
}: ParticleNetworkProps) => {
  // Use the custom hook for particle network animation logic
  const { canvasRef } = useParticleNetworkAnimation(
    particleCount,
    particleSize,
    particleColor,
    lineColor,
    maxDistance,
    speed,
    interactive
  );

  return (
    <canvas ref={canvasRef} className={cn(styles[PARTICLE_NETWORK_CONTAINER_CLASS], className)} />
  );
};

// Export memoized component to prevent unnecessary re-renders
export const ParticleNetwork = memo(ParticleNetworkComponent);

// Add display name for better debugging
ParticleNetwork.displayName = 'ParticleNetwork';

export default ParticleNetwork;
