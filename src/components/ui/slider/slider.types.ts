import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

/**
 * Props for the Slider component
 */
export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

/**
 * Props for the SliderTrack component
 */
export type SliderTrackProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>;

/**
 * Props for the SliderRange component
 */
export type SliderRangeProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>;

/**
 * Props for the SliderThumb component
 */
export type SliderThumbProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>;
