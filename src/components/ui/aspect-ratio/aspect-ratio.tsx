/**
 * Aspect Ratio Component
 *
 * Maintains a consistent width-to-height ratio for content like images and videos.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as React from 'react';
import { memo, useRef } from 'react';

import styles from './aspect-ratio.module.css';
import { AspectRatioProps } from './aspect-ratio.types';
import { AspectRatios } from './aspect-ratio.utils';

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
 * 
 * // Using predefined ratios
 * <AspectRatio ratio={AspectRatios.CINEMA}>
 *   <video src="/video.mp4" className="h-full w-full object-cover" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = memo(React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, ratio = AspectRatios.WIDESCREEN, ...props }, ref) => {
  // Store props in a ref to avoid unnecessary re-renders
  const propsRef = useRef({ ratio });
  
  // Update ref when props change
  React.useEffect(() => {
    propsRef.current = { ratio };
  }, [ratio]);
  
  return (
    <AspectRatioPrimitive.Root 
      ref={ref} 
      ratio={propsRef.current.ratio}
      className={cn(styles.container, className)} 
      {...props} 
    />
  );
}));

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
export default AspectRatio;
