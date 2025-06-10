'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

/**
 * ScrollArea Root Component Props
 *
 * Props for the ScrollArea root component that provides a scrollable container
 * with custom scrollbars that integrate with the OS.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/scroll-area | Radix UI Scroll Area}
 */
export type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>;

/**
 * ScrollBar Component Props
 *
 * Props for the ScrollBar component that renders the scrollbars when content overflows.
 * Includes support for both vertical and horizontal orientations.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/scroll-area#scrollareascrollbar | Radix UI ScrollAreaScrollbar}
 */
export interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  /**
   * The orientation of the scrollbar. Defaults to 'vertical'.
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * ScrollAreaViewport Component Props
 *
 * Props for the ScrollAreaViewport component that contains the scrollable content.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/scroll-area#scrollareaviewport | Radix UI ScrollAreaViewport}
 */
export type ScrollAreaViewportProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Viewport
>;

/**
 * ScrollAreaCorner Component Props
 *
 * Props for the ScrollAreaCorner component that appears at the intersection of scrollbars.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/scroll-area#scrollareacorner | Radix UI ScrollAreaCorner}
 */
export type ScrollAreaCornerProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Corner
>;

/**
 * ScrollAreaThumb Component Props
 *
 * Props for the ScrollAreaThumb component that represents the draggable thumb within the scrollbar.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/scroll-area#scrollareathumb | Radix UI ScrollAreaThumb}
 */
export type ScrollAreaThumbProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaThumb
>;
