'use client';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as React from 'react';
import { memo } from 'react';

import { AspectRatioProps } from './aspect-ratio.types';

/**
 * AspectRatio component
 * 
 * Displays content within a desired ratio, useful for maintaining consistent dimensions for images and videos.
 * 
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="/image.jpg" alt="Image" className="h-full w-full object-cover" />
 * </AspectRatio>
 * 
 * // Square ratio 1:1
 * <AspectRatio ratio={1 / 1}>
 *   <div className="flex items-center justify-center bg-muted">1:1</div>
 * </AspectRatio>
 * ```
 */
const AspectRatio = memo(React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>((props, ref) => {
  return <AspectRatioPrimitive.Root ref={ref} {...props} />;
}));

AspectRatio.displayName = AspectRatioPrimitive.Root.displayName;

export { AspectRatio, AspectRatioPrimitive };
export default AspectRatio;
