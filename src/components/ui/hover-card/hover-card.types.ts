import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';

/**
 * HoverCard root component props
 */
export type HoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;

/**
 * HoverCard trigger component props
 */
export type HoverCardTriggerProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>;

/**
 * HoverCard content component props
 */
export type HoverCardContentProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>;
