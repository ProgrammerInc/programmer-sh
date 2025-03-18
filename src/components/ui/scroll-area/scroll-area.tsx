'use client';

import { cn } from '@/utils/app.utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './scroll-area.module.css';
import {
  ScrollAreaProps,
  ScrollBarProps
} from './scroll-area.types';

/**
 * ScrollArea Component
 * 
 * A scrollable area component with custom scrollbars that integrate with the OS.
 * Built on top of Radix UI's ScrollArea primitive for accessibility and customization.
 * 
 * Features:
 * - Custom scrollbars that appear when content overflows
 * - Automatically hides scrollbars when not in use
 * - Supports both vertical and horizontal scrolling
 * - Fully accessible with keyboard navigation
 * 
 * @example Basic usage
 * ```tsx
 * <ScrollArea className="h-72 w-48 rounded-md border p-4">
 *   <div>Long content that needs scrolling</div>
 * </ScrollArea>
 * ```
 * 
 * @example With fixed height and width
 * ```tsx
 * <ScrollArea className="h-[200px] w-[350px] rounded-md border border-gray-200">
 *   <div className="p-4">
 *     <h4 className="mb-4 text-sm font-medium">Tags</h4>
 *     {Array.from({ length: 50 }).map((_, i) => (
 *       <div key={i} className="mb-2 text-sm">
 *         Tag {i + 1}
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = memo(React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => {
  const rootClassName = useMemo(() => {
    return cn(styles.root, className);
  }, [className]);

  return (
    <ScrollAreaPrimitive.Root
      className={rootClassName}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className={styles.viewport}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}));

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

/**
 * ScrollBar Component
 * 
 * A scrollbar component that's rendered when content overflows in the ScrollArea.
 * Automatically hides when not in use and supports both vertical and horizontal orientations.
 * 
 * Features:
 * - Smooth appearance/disappearance animations
 * - Customizable orientation (vertical or horizontal)
 * - Draggable thumb for direct manipulation
 * - Automatically sized based on content
 * 
 * @example
 * ```tsx
 * <ScrollBar orientation="horizontal" />
 * ```
 */
const ScrollBar = memo(React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = 'vertical', ...props }, ref) => {
  const scrollbarClassName = useMemo(() => {
    return cn(
      styles.scrollbar,
      orientation === 'vertical' ? styles['scrollbar-vertical'] : styles['scrollbar-horizontal'],
      className
    );
  }, [className, orientation]);

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      className={scrollbarClassName}
      orientation={orientation}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className={styles.thumb} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
export default ScrollArea;
