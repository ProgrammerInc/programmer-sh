'use client';

import { cn } from '@/utils/app.utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './slider.module.css';
import { SliderProps, SliderRangeProps, SliderThumbProps, SliderTrackProps } from './slider.types';

/**
 * Slider component based on Radix UI's Slider primitive
 *
 * Allows users to select a value or range from a range of values.
 *
 * Features:
 * - Single value or range selection
 * - Customizable step, min, and max values
 * - Keyboard navigation
 * - Screen reader accessibility
 * - Customizable styling
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/slider Radix UI Slider}
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
 *   <SliderTrack className="custom-track">
 *     <SliderRange className="custom-range" />
 *   </SliderTrack>
 *   <SliderThumb className="custom-thumb" />
 *   <SliderThumb className="custom-thumb" />
 * </Slider>
 * ```
 */
const Slider = memo(
  React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
    ({ className, ...props }, ref) => {
      const sliderClassName = useMemo(() => {
        return cn(styles['slider-root'], className);
      }, [className]);

      return (
        <SliderPrimitive.Root className={sliderClassName} ref={ref} {...props}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          {props.defaultValue?.map((_, i) => <SliderThumb key={i} />) || <SliderThumb />}
        </SliderPrimitive.Root>
      );
    }
  )
);

/**
 * SliderTrack component
 *
 * The track that contains the SliderRange.
 *
 * Features:
 * - Container for the slider range
 * - Customizable height and background
 * - Proper border radius for track appearance
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/slider#track Radix UI SliderTrack}
 *
 * @example
 * ```tsx
 * <SliderTrack className="custom-track">
 *   <SliderRange />
 * </SliderTrack>
 * ```
 */
const SliderTrack = memo(
  React.forwardRef<React.ElementRef<typeof SliderPrimitive.Track>, SliderTrackProps>(
    ({ className, children, ...props }, ref) => {
      const trackClassName = useMemo(() => {
        return cn(styles['slider-track'], className);
      }, [className]);

      return (
        <SliderPrimitive.Track ref={ref} className={trackClassName} {...props}>
          {children}
        </SliderPrimitive.Track>
      );
    }
  )
);

/**
 * SliderRange component
 *
 * Shows the range within the SliderTrack.
 *
 * Features:
 * - Visual indication of selected range
 * - Automatically sized based on selected values
 * - Customizable background color
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/slider#range Radix UI SliderRange}
 *
 * @example
 * ```tsx
 * <SliderRange className="custom-range" />
 * ```
 */
const SliderRange = memo(
  React.forwardRef<React.ElementRef<typeof SliderPrimitive.Range>, SliderRangeProps>(
    ({ className, ...props }, ref) => {
      const rangeClassName = useMemo(() => {
        return cn(styles['slider-range'], className);
      }, [className]);

      return <SliderPrimitive.Range ref={ref} className={rangeClassName} {...props} />;
    }
  )
);

/**
 * SliderThumb component
 *
 * The draggable thumb to set the value.
 *
 * Features:
 * - Draggable interaction
 * - Focus and hover states
 * - Keyboard navigation support
 * - Proper accessibility attributes
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/slider#thumb Radix UI SliderThumb}
 *
 * @example
 * ```tsx
 * <SliderThumb className="custom-thumb" />
 * ```
 */
const SliderThumb = memo(
  React.forwardRef<React.ElementRef<typeof SliderPrimitive.Thumb>, SliderThumbProps>(
    ({ className, ...props }, ref) => {
      const thumbClassName = useMemo(() => {
        return cn(styles['slider-thumb'], className);
      }, [className]);

      return <SliderPrimitive.Thumb ref={ref} className={thumbClassName} {...props} />;
    }
  )
);

Slider.displayName = SliderPrimitive.Root.displayName;
SliderTrack.displayName = SliderPrimitive.Track.displayName;
SliderRange.displayName = SliderPrimitive.Range.displayName;
SliderThumb.displayName = SliderPrimitive.Thumb.displayName;

export { Slider, SliderRange, SliderThumb, SliderTrack };
export default Slider;
