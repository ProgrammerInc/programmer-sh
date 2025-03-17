import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

/**
 * ScrollArea root component props
 */
export type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>;

/**
 * ScrollBar component props
 */
export type ScrollBarProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;

/**
 * ScrollAreaViewport component props
 */
export type ScrollAreaViewportProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>;

/**
 * ScrollAreaCorner component props
 */
export type ScrollAreaCornerProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Corner>;

/**
 * ScrollAreaThumb component props
 */
export type ScrollAreaThumbProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaThumb>;
