'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

/**
 * Props for the Slider component
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
 * ```
 */
export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

/**
 * Props for the SliderTrack component
 *
 * The track that contains the SliderRange
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/slider#track Radix UI Slider Track}
 *
 * @example
 * ```tsx
 * <SliderTrack className="custom-track-class">
 *   <SliderRange />
 * </SliderTrack>
 * ```
 */
export type SliderTrackProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>;

/**
 * Props for the SliderRange component
 *
 * Shows the range within the SliderTrack
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/slider#range Radix UI Slider Range}
 *
 * @example
 * ```tsx
 * <SliderRange className="custom-range-class" />
 * ```
 */
export type SliderRangeProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>;

/**
 * Props for the SliderThumb component
 *
 * The draggable thumb to set the value
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/slider#thumb Radix UI Slider Thumb}
 *
 * @example
 * ```tsx
 * <SliderThumb className="custom-thumb-class" />
 * ```
 */
export type SliderThumbProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>;
