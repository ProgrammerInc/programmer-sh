'use client';

import { cn } from '@/utils/app.utils';
import { useRef } from 'react';
import { CSS_CLASSES, DEFAULT_COLORS, DEFAULT_VALUES } from './wavy-background.constants';
import { useSafariDetection, useWavyBackgroundAnimation } from './wavy-background.hooks';
import type { WavyBackgroundProps } from './wavy-background.types';

/**
 * WavyBackground component renders an animated wavy background using canvas
 * and simplex noise with customizable colors and animation settings.
 *
 * @component
 */
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors = DEFAULT_COLORS,
  waveWidth,
  backgroundFill,
  blur = DEFAULT_VALUES.BLUR,
  speed = DEFAULT_VALUES.SPEED,
  waveOpacity = DEFAULT_VALUES.WAVE_OPACITY,
  ...props
}: WavyBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isSafari = useSafariDetection();

  // Initialize and run the animation
  useWavyBackgroundAnimation(
    canvasRef,
    colors,
    waveWidth,
    backgroundFill,
    blur,
    speed,
    waveOpacity
  );

  return (
    <div className={cn(CSS_CLASSES.CONTAINER, containerClassName)}>
      <canvas
        className={CSS_CLASSES.CANVAS}
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {})
        }}
      />
      <div className={cn(CSS_CLASSES.CONTENT, className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;
