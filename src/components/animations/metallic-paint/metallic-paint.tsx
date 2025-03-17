'use client';

import { memo, useRef } from 'react';
import { DEFAULT_PARAMS } from './metallic-paint.constants';
import { useMetallicPaintEffect } from './metallic-paint.hooks';
import { MetallicPaintProps } from './metallic-paint.types';

/**
 * Metallic Paint Component
 *
 * Renders a metallic paint effect on an image using WebGL shaders.
 * The component creates a high-quality metallic/chrome-like finish
 * with realistic reflections and liquid movement.
 *
 * @param props - Component properties
 * @returns A canvas element with the metallic paint effect
 */
export const MetallicPaint = memo<MetallicPaintProps>(({ imageData, params = DEFAULT_PARAMS }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use the custom hook to manage WebGL rendering and animation
  useMetallicPaintEffect(canvasRef, imageData, params);

  return <canvas ref={canvasRef} className="block w-full h-full object-contain" />;
});

// Add display name for better debugging
MetallicPaint.displayName = 'MetallicPaint';

export default MetallicPaint;
