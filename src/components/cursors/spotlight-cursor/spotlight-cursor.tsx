'use client';
import useSpotlightEffect, { SpotlightConfig } from '@/hooks/use-spotlight-effect';
import { HTMLAttributes } from 'react';

// Combine props with potential HTML canvas attributes
export interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

export const SpotlightCursor = ({ config = {}, className, ...rest }: SpotlightCursorProps) => {
  // Provide default configuration if not specified
  const spotlightConfig = {
    radius: 200,
    brightness: 0.15,
    color: '#ffffff',
    smoothing: 0.1,
    ...config
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
