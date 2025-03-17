import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

/**
 * Root popover component props
 */
export type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

/**
 * Popover trigger component props
 */
export type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

/**
 * Popover content component props
 */
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

/**
 * Popover portal component props
 */
export type PopoverPortalProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Portal>;
