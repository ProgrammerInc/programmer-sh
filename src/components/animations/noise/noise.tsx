'use client';

import { cn } from '@/utils/app.utils';
import React, { memo } from 'react';
import {
  DEFAULT_PATTERN_ALPHA,
  DEFAULT_PATTERN_REFRESH_INTERVAL,
  DEFAULT_PATTERN_SCALE_X,
  DEFAULT_PATTERN_SCALE_Y,
  DEFAULT_PATTERN_SIZE,
  NOISE_CANVAS_CLASS
} from './noise.constants';
import { useNoiseAnimation } from './noise.hooks';
import styles from './noise.module.css';
import { NoiseProps } from './noise.types';

/**
 * Noise component creates a canvas-based animated noise/grain effect
 *
 * @example
 * <Noise
 *   patternSize={300}
 *   patternAlpha={20}
 * />
 *
 * @param {NoiseProps} props Component properties including noise pattern configuration options
 * @returns A memoized React component that renders animated noise pattern
 */
export const NoiseComponent: React.FC<NoiseProps> = ({
  patternSize = DEFAULT_PATTERN_SIZE,
  patternScaleX = DEFAULT_PATTERN_SCALE_X,
  patternScaleY = DEFAULT_PATTERN_SCALE_Y,
  patternRefreshInterval = DEFAULT_PATTERN_REFRESH_INTERVAL,
  patternAlpha = DEFAULT_PATTERN_ALPHA,
  className
}) => {
  // Use the custom hook for noise animation logic
  const { canvasRef } = useNoiseAnimation(
    patternSize,
    patternScaleX,
    patternScaleY,
    patternRefreshInterval,
    patternAlpha
  );

  return <canvas className={cn(styles[NOISE_CANVAS_CLASS], className)} ref={canvasRef} />;
};

// Export memoized component to prevent unnecessary re-renders
export const Noise = memo(NoiseComponent);

// Add display name for better debugging
Noise.displayName = 'Noise';

export default Noise;
