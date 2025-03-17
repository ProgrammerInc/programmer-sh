'use client';

import { Canvas } from '@react-three/fiber';
import { memo } from 'react';
import GooeyFilter from './gooey-filter';
import { CSS_CLASSES, DEFAULT_GL_PROPS, DEFAULT_VALUES } from './pixel-trail.constants';
import type { PixelTrailProps } from './pixel-trail.types';
import { cn } from './pixel-trail.utils';
import Scene from './scene';

/**
 * PixelTrail component that renders a customizable pixel-based cursor trail effect.
 * Uses Three.js and WebGL shaders to create a pixelated trail following the cursor.
 *
 * @param props - Component properties
 * @returns PixelTrail React component
 */
export const PixelTrail = memo(function PixelTrail({
  gridSize = DEFAULT_VALUES.gridSize,
  trailSize = DEFAULT_VALUES.trailSize,
  maxAge = DEFAULT_VALUES.maxAge,
  interpolate = DEFAULT_VALUES.interpolate,
  easingFunction = DEFAULT_VALUES.linearEasing || ((x: number) => x),
  canvasProps = {},
  glProps = DEFAULT_GL_PROPS,
  gooeyFilter,
  color = DEFAULT_VALUES.color,
  className = ''
}: PixelTrailProps) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={cn(CSS_CLASSES.canvas, className)}
        style={gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : undefined}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
});

export default PixelTrail;
