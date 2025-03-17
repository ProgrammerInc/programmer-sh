'use client';

import { cn } from '@/utils/app.utils';
import { memo } from 'react';
import {
  DEFAULT_FORCE_HOVER_STATE,
  DEFAULT_HOVER_INTENSITY,
  DEFAULT_HUE,
  DEFAULT_ROTATE_ON_HOVER,
  ORB_CONTAINER_CLASS
} from './orb.constants';
import { useOrbAnimation } from './orb.hooks';
import styles from './orb.module.css';
import { OrbProps } from './orb.types';

/**
 * Orb component creates a WebGL-based animated orb effect with hover interactions
 *
 * @example
 * <Orb
 *   hue={180}
 *   hoverIntensity={0.3}
 *   rotateOnHover={true}
 * />
 *
 * @param props - Component properties
 * @returns A React component that renders an animated orb
 */
const OrbComponent = ({
  hue = DEFAULT_HUE,
  hoverIntensity = DEFAULT_HOVER_INTENSITY,
  rotateOnHover = DEFAULT_ROTATE_ON_HOVER,
  forceHoverState = DEFAULT_FORCE_HOVER_STATE,
  className
}: OrbProps) => {
  // Use the custom hook for orb animation logic
  const { containerRef } = useOrbAnimation(hue, hoverIntensity, rotateOnHover, forceHoverState);

  return <div ref={containerRef} className={cn(styles[ORB_CONTAINER_CLASS], className)} />;
};

// Export memoized component to prevent unnecessary re-renders
export const Orb = memo(OrbComponent);

// Add display name for better debugging
Orb.displayName = 'Orb';

export default Orb;
