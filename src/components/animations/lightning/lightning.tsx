'use client';

import { memo } from 'react';
import {
  DEFAULT_HUE,
  DEFAULT_INTENSITY,
  DEFAULT_SIZE,
  DEFAULT_SPEED,
  DEFAULT_X_OFFSET
} from './lightning.constants';
import { useLightningEffect } from './lightning.hooks';
import { LightningProps } from './lightning.types';

/**
 * Lightning animation component that renders an electric effect using WebGL shaders.
 *
 * This component creates a lightning-like visual effect that can be customized
 * with different colors, speeds, and intensities. The effect uses WebGL for
 * efficient rendering and smooth animation.
 *
 * @param {LightningProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export const Lightning = memo(function Lightning({
  hue = DEFAULT_HUE,
  xOffset = DEFAULT_X_OFFSET,
  speed = DEFAULT_SPEED,
  intensity = DEFAULT_INTENSITY,
  size = DEFAULT_SIZE
}: LightningProps) {
  const { canvasRef } = useLightningEffect(hue, xOffset, speed, intensity, size);

  return <canvas ref={canvasRef} className="w-full h-full relative" />;
});

export default Lightning;
