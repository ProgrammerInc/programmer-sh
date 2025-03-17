'use client';

import { cn } from '@/utils/app.utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  SliderProps,
  SliderRangeProps,
  SliderThumbProps,
  SliderTrackProps
} from './slider.types';

/**
 * Slider component based on Radix UI's Slider primitive
 * 
 * Allows users to select a value or range from a range of values.
 * 
 * @example
 * ```tsx
 * // Basic slider
 * <Slider defaultValue={[50]} max={100} step={1} />
 * 
 * // Range slider
 * <Slider defaultValue={[20, 80]} max={100} step={1} />
 * 
 * // Custom styled slider
 * <Slider>
 *   <SliderTrack className="bg-gray-200">
 *     <SliderRange className="bg-blue-500" />
 *   </SliderTrack>
 *   <SliderThumb className="bg-white border-blue-500" />
 *   <SliderThumb className="bg-white border-blue-500" />
 * </Slider>
 * ```
 */
const Slider = memo(React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => {
  const sliderClassName = useMemo(() => {
    return cn('relative flex w-full touch-none select-none items-center', className);
  }, [className]);

  return (
    <SliderPrimitive.Root
      className={sliderClassName}
      ref={ref}
      {...props}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      {props.defaultValue?.map((_, i) => (
        <SliderThumb key={i} />
      )) || <SliderThumb />}
    </SliderPrimitive.Root>
  );
}));

/**
 * SliderTrack component
 * 
 * The track that contains the SliderRange
 * 
 * @example
 * ```tsx
 * <SliderTrack className="h-3 bg-gray-200">
 *   <SliderRange />
 * </SliderTrack>
 * ```
 */
const SliderTrack = memo(React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  SliderTrackProps
>(({ className, children, ...props }, ref) => {
  const trackClassName = useMemo(() => {
    return cn('relative h-2 w-full grow overflow-hidden rounded-full bg-secondary', className);
  }, [className]);

  return (
    <SliderPrimitive.Track
      ref={ref}
      className={trackClassName}
      {...props}
    >
      {children}
    </SliderPrimitive.Track>
  );
}));

/**
 * SliderRange component
 * 
 * Shows the range within the SliderTrack
 * 
 * @example
 * ```tsx
 * <SliderRange className="bg-blue-500" />
 * ```
 */
const SliderRange = memo(React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  SliderRangeProps
>(({ className, ...props }, ref) => {
  const rangeClassName = useMemo(() => {
    return cn('absolute h-full bg-primary', className);
  }, [className]);

  return (
    <SliderPrimitive.Range
      ref={ref}
      className={rangeClassName}
      {...props}
    />
  );
}));

/**
 * SliderThumb component
 * 
 * The draggable thumb to set the value
 * 
 * @example
 * ```tsx
 * <SliderThumb className="bg-white border-blue-500" />
 * ```
 */
const SliderThumb = memo(React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  SliderThumbProps
>(({ className, ...props }, ref) => {
  const thumbClassName = useMemo(() => {
    return cn(
      'block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className
    );
  }, [className]);

  return (
    <SliderPrimitive.Thumb
      ref={ref}
      className={thumbClassName}
      {...props}
    />
  );
}));

Slider.displayName = SliderPrimitive.Root.displayName;
SliderTrack.displayName = SliderPrimitive.Track.displayName;
SliderRange.displayName = SliderPrimitive.Range.displayName;
SliderThumb.displayName = SliderPrimitive.Thumb.displayName;

export { Slider, SliderTrack, SliderRange, SliderThumb };
export default Slider;
