'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';

import { cn } from '@/utils/app.utils';
import styles from './hover-card.module.css';
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
const HoverCard = React.memo(function HoverCard(props: HoverCardProps): JSX.Element {
  return <HoverCardPrimitive.Root {...props} />;
});

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
const HoverCardTrigger = React.memo(function HoverCardTrigger(props: HoverCardTriggerProps): JSX.Element {
  return <HoverCardPrimitive.Trigger {...props} />;
});

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
const HoverCardContent = React.memo(React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(styles.content, className)}
      {...props}
    />
  );
}));

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };
export default HoverCard;
