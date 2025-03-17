'use client';

import { cn } from '@/utils/app.utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  ScrollAreaProps,
  ScrollBarProps
} from './scroll-area.types';

/**
 * A scrollable area component with custom scrollbars that integrate with the OS
 * 
 * @example
 * ```tsx
 * <ScrollArea className="h-72 w-48 rounded-md border p-4">
 *   <div>Long content that needs scrolling</div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = memo(React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => {
  const rootClassName = useMemo(() => {
    return cn('relative overflow-hidden', className);
  }, [className]);

  return (
    <ScrollAreaPrimitive.Root
      className={rootClassName}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}));

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

/**
 * Scrollbar component that's rendered when content overflows
 * Automatically hides when not in use
 */
const ScrollBar = memo(React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = 'vertical', ...props }, ref) => {
  const scrollbarClassName = useMemo(() => {
    return cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
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
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
export default ScrollArea;
