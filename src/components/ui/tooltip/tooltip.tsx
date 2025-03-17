'use client';

import { cn } from '@/utils/app.utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  TooltipContentProps,
  TooltipProps
} from './tooltip.types';

/**
 * Provider component for tooltips
 * Must wrap all tooltip components in your application
 */
const TooltipProvider = memo(TooltipPrimitive.Provider);
TooltipProvider.displayName = TooltipPrimitive.Provider.displayName;

/**
 * Root component for tooltip functionality
 */
const Tooltip = memo(TooltipPrimitive.Root);
Tooltip.displayName = TooltipPrimitive.Root.displayName;

/**
 * Trigger element that will show the tooltip on hover
 * Should be wrapped in a Tooltip component
 */
const TooltipTrigger = memo(TooltipPrimitive.Trigger);
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

/**
 * Content component that displays the actual tooltip
 * Configurable with various positioning options and animations
 * 
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>This is a tooltip</TooltipContent>
 * </Tooltip>
 * ```
 */
const TooltipContent = memo(React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => {
  // Memoize the className computation
  const tooltipClassName = useMemo(
    () => cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    ),
    [className]
  );

  return (
    <TooltipPrimitive.Content
      className={tooltipClassName}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  );
}));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

export default Tooltip;
