'use client';

import { cn } from '@/utils/app.utils';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  HoverCardContentProps,
  HoverCardProps,
  HoverCardTriggerProps
} from './hover-card.types';

/**
 * HoverCard component
 * 
 * Card that displays additional information when hovering over a trigger element.
 * 
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>Hover over me</HoverCardTrigger>
 *   <HoverCardContent>
 *     <div>Card content with more information</div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
const HoverCard = memo(HoverCardPrimitive.Root);
HoverCard.displayName = HoverCardPrimitive.Root.displayName;

/**
 * HoverCardTrigger component
 * 
 * Element that triggers the hover card when hovered or focused.
 * 
 * @example
 * ```tsx
 * <HoverCardTrigger>Hover over me</HoverCardTrigger>
 * ```
 */
const HoverCardTrigger = memo(HoverCardPrimitive.Trigger);
HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName;

/**
 * HoverCardContent component
 * 
 * Content displayed when the trigger is hovered or focused.
 * 
 * @example
 * ```tsx
 * <HoverCardContent>
 *   <div className="p-4">
 *     <h3 className="font-medium">User Profile</h3>
 *     <p className="text-sm text-muted-foreground">Additional information here</p>
 *   </div>
 * </HoverCardContent>
 * ```
 */
const HoverCardContent = memo(React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  // Memoize the className calculation
  const contentClassName = useMemo(() => {
    return cn(
      'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    );
  }, [className]);

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={contentClassName}
      {...props}
    />
  );
}));

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };
export default HoverCard;
