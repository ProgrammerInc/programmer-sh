import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

/**
 * Select component props
 */
export type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

/**
 * Select group component props
 */
export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;

/**
 * Select value component props
 */
export type SelectValueProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

/**
 * Select trigger component props
 */
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;

/**
 * Select scroll up button component props
 */
export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>;

/**
 * Select scroll down button component props
 */
export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>;

/**
 * Select content component props
 */
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

/**
 * Select label component props
 */
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

/**
 * Select item component props
 */
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

/**
 * Select separator component props
 */
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;
