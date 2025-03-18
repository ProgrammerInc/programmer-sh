'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

/**
 * Props for the TooltipProvider component.
 * 
 * TooltipProvider must wrap all Tooltip components in your application.
 * It is responsible for synchronizing tooltip behavior across the application.
 * 
 * @see https://www.radix-ui.com/docs/primitives/components/tooltip#provider
 */
export type TooltipProviderProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;

/**
 * Props for the Tooltip (root) component.
 * 
 * The root component for the tooltip functionality that wraps the trigger and content.
 * Controls the open state, delays, and basic behavior of the tooltip.
 * 
 * @property {boolean} defaultOpen - Whether the tooltip is open by default
 * @property {boolean} open - Controlled open state
 * @property {(open: boolean) => void} onOpenChange - Callback when open state changes
 * @property {number} delayDuration - Duration (ms) before tooltip opens (default: 700ms)
 * @property {number} skipDelayDuration - Duration (ms) for skipping delay when moving between tooltips
 * 
 * @see https://www.radix-ui.com/docs/primitives/components/tooltip#root
 */
export type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

/**
 * Props for the TooltipTrigger component.
 * 
 * The element that triggers the tooltip when hovered or focused.
 * Usually wraps a button, icon, or other interactive element.
 * 
 * @property {string} asChild - When true, tooltip applies to its single child
 * 
 * @see https://www.radix-ui.com/docs/primitives/components/tooltip#trigger
 */
export type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;

/**
 * Props for the TooltipContent component.
 * 
 * The component that contains the actual tooltip content.
 * Appears when the trigger is interacted with.
 * 
 * @property {string} className - Additional CSS classes
 * @property {number} sideOffset - Distance (px) from the trigger (default: 4px)
 * @property {React.ReactNode} children - Content to display inside the tooltip
 * @property {'top' | 'right' | 'bottom' | 'left'} side - Preferred side of the trigger to render
 * @property {'start' | 'center' | 'end'} align - Preferred alignment against the trigger
 * @property {boolean} avoidCollisions - Whether to avoid collisions with window edges
 * @property {number} collisionPadding - Padding (px) between tooltip and window edges
 * @property {boolean} sticky - Whether to keep the tooltip in place during trigger updates
 * 
 * @see https://www.radix-ui.com/docs/primitives/components/tooltip#content
 */
export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;
