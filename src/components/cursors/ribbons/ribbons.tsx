'use client';

import { memo } from 'react';

import { CONTAINER_CLASS_NAME, DEFAULT_VALUES } from './ribbons.constants';
import { useRibbons } from './ribbons.hooks';
import type { RibbonsProps } from './ribbons.types';

/**
 * Ribbons component creates flowing ribbon trails that follow the cursor movement.
 * Uses OGL library for high-performance WebGL rendering.
 *
 * @param props - Configuration options for the ribbons effect
 * @returns React component with ribbons effect
 */
export const Ribbons = memo(function Ribbons({
  colors = DEFAULT_VALUES.colors,
  baseSpring = DEFAULT_VALUES.baseSpring,
  baseFriction = DEFAULT_VALUES.baseFriction,
  baseThickness = DEFAULT_VALUES.baseThickness,
  offsetFactor = DEFAULT_VALUES.offsetFactor,
  maxAge = DEFAULT_VALUES.maxAge,
  pointCount = DEFAULT_VALUES.pointCount,
  speedMultiplier = DEFAULT_VALUES.speedMultiplier,
  enableFade = DEFAULT_VALUES.enableFade,
  enableShaderEffect = DEFAULT_VALUES.enableShaderEffect,
  effectAmplitude = DEFAULT_VALUES.effectAmplitude,
  backgroundColor = DEFAULT_VALUES.backgroundColor
}: RibbonsProps) {
  // Use the ribbons hook to manage the effect
  const containerRef = useRibbons({
    colors,
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    maxAge,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
    backgroundColor
  });

  return <div ref={containerRef} className={CONTAINER_CLASS_NAME} />;
});

export default Ribbons;
