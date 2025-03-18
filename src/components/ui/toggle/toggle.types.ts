'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { toggleVariants } from './toggle.variants';

/**
 * Toggle component props
 * 
 * @interface ToggleProps
 * @extends {React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>}
 * @extends {VariantProps<typeof toggleVariants>}
 * 
 * @property {"default" | "outline"} [variant] - The visual variant of the toggle
 * @property {"default" | "sm" | "lg"} [size] - The size of the toggle
 * @property {boolean} [pressed] - Whether the toggle is pressed (controlled)
 * @property {boolean} [defaultPressed] - Whether the toggle is pressed by default (uncontrolled)
 * @property {(pressed: boolean) => void} [onPressedChange] - Callback for when pressed state changes
 * 
 * @example
 * ```tsx
 * <Toggle variant="outline" size="lg" onPressedChange={(pressed) => console.log(pressed)}>
 *   Bold
 * </Toggle>
 * ```
 */
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}
