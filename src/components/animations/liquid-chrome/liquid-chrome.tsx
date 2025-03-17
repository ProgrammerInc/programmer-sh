'use client';

import React from 'react';
import {
  DEFAULT_AMPLITUDE,
  DEFAULT_BASE_COLOR,
  DEFAULT_FREQUENCY_X,
  DEFAULT_FREQUENCY_Y,
  DEFAULT_INTERACTIVE,
  DEFAULT_SPEED
} from './liquid-chrome.constants';
import { useLiquidChromeEffect } from './liquid-chrome.hooks';
import { LiquidChromeProps } from './liquid-chrome.types';

/**
 * LiquidChrome Component
 *
 * A WebGL-based animation that creates a liquid chrome effect with interactive
 * distortions that respond to mouse/touch input.
 *
 * @param baseColor - RGB color array for the base color (0-1 scale)
 * @param speed - Animation speed multiplier
 * @param amplitude - Amplitude of distortion
 * @param frequencyX - X-axis frequency modifier
 * @param frequencyY - Y-axis frequency modifier
 * @param interactive - Whether to enable mouse/touch interaction
 * @param props - Additional HTML div element props
 */
export const LiquidChrome = React.memo<LiquidChromeProps>(
  ({
    baseColor = DEFAULT_BASE_COLOR,
    speed = DEFAULT_SPEED,
    amplitude = DEFAULT_AMPLITUDE,
    frequencyX = DEFAULT_FREQUENCY_X,
    frequencyY = DEFAULT_FREQUENCY_Y,
    interactive = DEFAULT_INTERACTIVE,
    ...props
  }) => {
    const containerRef = useLiquidChromeEffect(
      baseColor,
      speed,
      amplitude,
      frequencyX,
      frequencyY,
      interactive
    );

    return <div ref={containerRef} className="w-full h-full" {...props} />;
  }
);

// Add display name for better debugging
LiquidChrome.displayName = 'LiquidChrome';

export default LiquidChrome;
