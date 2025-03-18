'use client';

import { cn } from '@/utils/app.utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './popover.module.css';
import {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
  PopoverPortalProps
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
const PopoverPortal = memo(
  ({ children, ...props }: PopoverPortalProps) => (
    <PopoverPrimitive.Portal {...props}>{children}</PopoverPrimitive.Portal>
  )
);
PopoverPortal.displayName = PopoverPrimitive.Portal.displayName;

const PopoverContent = memo(React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(styles.content, className);
  }, [className]);

  return (
    <PopoverPortal>
      <PopoverPrimitive.Content
        align={align}
        className={contentClassName}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPortal>
  );
}));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverPortal, PopoverTrigger };
export default Popover;
