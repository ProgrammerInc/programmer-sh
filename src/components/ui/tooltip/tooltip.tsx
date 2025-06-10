'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';
import { forwardRef, memo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './tooltip.module.css';
import { TooltipContentProps } from './tooltip.types';

/**
 * TooltipProvider Component
 *
 * Provider component that must wrap all tooltip components in your application.
 * Controls global tooltip settings like delay duration and positioning.
 *
 * Usage example: Wrap your application components with TooltipProvider
 */
const TooltipProvider = memo(TooltipPrimitive.Provider);
TooltipProvider.displayName = TooltipPrimitive.Provider.displayName;

/**
 * Tooltip Component
 *
 * Root component for tooltip functionality. Wraps trigger and content components.
 *
 * Features:
 * - Hover and focus activation
 * - Configurable delay duration
 * - Controlled or uncontrolled state
 * - Keyboard navigation support
 * - Fully accessible
 *
 * Usage example: Wrap TooltipTrigger and TooltipContent with Tooltip component
 */
const Tooltip = memo(TooltipPrimitive.Root);
Tooltip.displayName = TooltipPrimitive.Root.displayName;

/**
 * TooltipTrigger Component
 *
 * The element that triggers the tooltip when hovered or focused.
 * Should be a child of the Tooltip component.
 *
 * Usage example: Wrap a button or other interactive element with TooltipTrigger
 */
const TooltipTrigger = memo(TooltipPrimitive.Trigger);
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

/**
 * TooltipContent Component
 *
 * Content component that displays the actual tooltip.
 * Positioned relative to the trigger element.
 *
 * Features:
 * - Automatic positioning
 * - Configurable offset from trigger
 * - CSS module styling with customizable appearance
 * - Smooth animations
 * - Collision detection
 *
 * Usage example 1: Basic tooltip content with text
 * Usage example 2: Positioned tooltip with custom offset and side
 */
const TooltipContent = memo(
  forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
    ({ className, sideOffset = 4, ...props }, ref) => {
      return (
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(styles['tooltip-content'], className)}
          {...props}
        />
      );
    }
  )
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

export default Tooltip;
