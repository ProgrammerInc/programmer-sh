import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

/**
 * Tooltip provider component props
 */
export type TooltipProviderProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;

/**
 * Tooltip root component props
 */
export type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

/**
 * Tooltip trigger component props
 */
export type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;

/**
 * Tooltip content component props
 */
export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;
