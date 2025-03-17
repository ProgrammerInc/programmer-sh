'use client';

import { cn } from '@/utils/app.utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps
} from './popover.types';

/**
 * Root popover component that handles the open state of the popover
 */
const Popover = memo(PopoverPrimitive.Root);
Popover.displayName = PopoverPrimitive.Root.displayName;

/**
 * Trigger element that opens the popover when clicked
 */
const PopoverTrigger = memo(PopoverPrimitive.Trigger);
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

/**
 * Content component that displays the popover content
 * 
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open Popover</PopoverTrigger>
 *   <PopoverContent>This is a popover content</PopoverContent>
 * </Popover>
 * ```
 */
const PopoverContent = memo(React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(
      'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    );
  }, [className]);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className={contentClassName}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
export default Popover;
