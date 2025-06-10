'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { toggleVariants } from '@/components/ui/toggle/toggle.variants';

/**
 * Props for the ToggleGroupContext
 * This is used internally to share variant and size between the group and items
 */
export interface ToggleGroupContextValue {
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'outline';
}

/**
 * ToggleGroup component props
 *
 * @property {"default" | "outline"} [variant] - The visual variant of the toggle group items
 * @property {"default" | "sm" | "lg"} [size] - The size of the toggle group items
 * @property {"single" | "multiple"} [type] - Whether a single or multiple items can be pressed at once
 * @property {string} [defaultValue] - The value of the item that should be pressed initially (controlled)
 * @property {string} [value] - The controlled value of the pressed item
 * @property {(value: string) => void} [onValueChange] - Event handler called when the value changes
 * @property {"horizontal" | "vertical"} [orientation] - The orientation of the toggle group
 * @property {React.ReactNode} [children] - The toggle group items
 * @property {string} [className] - Additional CSS class names
 *
 * @example
 * ```tsx
 * <ToggleGroup
 *   type="single"
 *   defaultValue="center"
 *   aria-label="Text alignment"
 * >
 *   <ToggleGroupItem value="left" aria-label="Left aligned">
 *     <AlignLeftIcon className="h-4 w-4" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export interface ToggleGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>, 'type'>,
    VariantProps<typeof toggleVariants> {
  type?: 'single' | 'multiple';
  orientation?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
  className?: string;
}

/**
 * ToggleGroupItem component props
 *
 * @property {"default" | "outline"} [variant] - The visual variant of the toggle item
 * @property {"default" | "sm" | "lg"} [size] - The size of the toggle item
 * @property {string} value - The unique value of the toggle item
 * @property {boolean} [disabled] - Whether the toggle item is disabled
 *
 * @example
 * ```tsx
 * <ToggleGroupItem value="left" aria-label="Left aligned">
 *   <AlignLeftIcon className="h-4 w-4" />
 * </ToggleGroupItem>
 * ```
 */
export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleVariants> {}
