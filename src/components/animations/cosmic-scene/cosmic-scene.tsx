'use client';

import { cn } from '@/utils/app.utils';
import { memo, useMemo, useRef } from 'react';
import {
  COLOR_SCHEMES,
  DEFAULT_COLOR_SCHEME,
  DEFAULT_INTERACTIVE,
  DEFAULT_OVERLAY_OPACITY,
  DEFAULT_SIZE,
  NOISE_MASK_URL,
  PERSPECTIVE_VALUE,
  ROTATION_FACTOR
} from './cosmic-scene.constants';
import { useMousePositionEffect } from './cosmic-scene.hooks';
import { CosmicSceneProps } from './cosmic-scene.types';

/**
 * CosmicScene component creates an animated cosmic background with various color schemes
 * and optional interactivity.
 *
 * @param props - Component properties
 * @returns Memoized React component with cosmic scene animation
 */
export const CosmicScene = memo(function CosmicScene({
  className,
  size = DEFAULT_SIZE,
  colorScheme = DEFAULT_COLOR_SCHEME,
  interactive = DEFAULT_INTERACTIVE,
  children,
  overlayOpacity = DEFAULT_OVERLAY_OPACITY,
  ...props
}: CosmicSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePositionEffect(containerRef, interactive);

  // Memoize the background style to prevent unnecessary recalculations
  const backgroundStyle = useMemo(
    () => ({
      background: `conic-gradient(${COLOR_SCHEMES[colorScheme]})`,
      transform: interactive
        ? `perspective(${PERSPECTIVE_VALUE}px) rotateX(${(mousePosition.y - 50) * ROTATION_FACTOR}deg) rotateY(${(mousePosition.x - 50) * ROTATION_FACTOR}deg)`
        : undefined,
      WebkitMaskImage: `radial-gradient(circle at ${interactive ? `${mousePosition.x}% ${mousePosition.y}%` : '50% 50%'}, white 2px, transparent 2.5px), url("${NOISE_MASK_URL}")`,
      WebkitMaskSize: `${size} ${size}, 256px 256px`,
      WebkitMaskPosition: '50% 50%, 4px 50%',
      WebkitMaskComposite: 'intersect',
      maskImage: `radial-gradient(circle at ${interactive ? `${mousePosition.x}% ${mousePosition.y}%` : '50% 50%'}, white 2px, transparent 2.5px), url("${NOISE_MASK_URL}")`,
      maskSize: `${size} ${size}, 256px 256px`,
      maskPosition: '50% 50%, 4px 50%',
      maskComposite: 'intersect'
    }),
    [colorScheme, interactive, mousePosition.x, mousePosition.y, size]
  );

  // Memoize the container class name
  const containerClassName = useMemo(() => {
    return cn('relative h-full min-h-[400px] w-full overflow-hidden bg-[hsl(0_0%_6%)]', className);
  }, [className]);

  return (
    <div ref={containerRef} className={containerClassName} {...props}>
      <div
        className="absolute inset-0 h-full w-full animate-flicker transition-transform duration-300 ease-out"
        style={backgroundStyle}
      />
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children}
    </div>
  );
});

// Add displayName to help with debugging
CosmicScene.displayName = 'CosmicScene';

export default CosmicScene;
