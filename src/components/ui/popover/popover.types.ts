'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

/**
 * Popover Root Props
 *
 * Props for the root Popover component that controls the open state of the popover.
 *
 * @see [Radix UI Popover Root](https://www.radix-ui.com/primitives/docs/components/popover#root)
 */
export type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

/**
 * Popover Trigger Props
 *
 * Props for the PopoverTrigger component that opens the popover when clicked.
 * The trigger is the element that the popover is anchored to.
 *
 * @see [Radix UI Popover Trigger](https://www.radix-ui.com/primitives/docs/components/popover#trigger)
 */
export type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

/**
 * Popover Content Props
 *
 * Props for the PopoverContent component that displays the popover content.
 * Includes options for alignment, side offset, and more.
 *
 * @see [Radix UI Popover Content](https://www.radix-ui.com/primitives/docs/components/popover#content)
 */
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

/**
 * Popover Portal Props
 *
 * Props for the PopoverPortal component that renders the popover content in a portal.
 * A portal allows the content to break out of its container and render at the root of the document.
 *
 * @see [Radix UI Popover Portal](https://www.radix-ui.com/primitives/docs/components/popover#portal)
 */
export type PopoverPortalProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Portal>;
