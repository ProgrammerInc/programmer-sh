import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { labelVariants } from './label.variants';

/**
 * Label Component Props
 *
 * Props for the Label component, extending from Radix UI's Label primitive
 * and including variants for styling.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/label Label primitive documentation}
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 *
 * // With disabled state
 * <Label htmlFor="disabled-input" disabled>Disabled input</Label>
 * <Input id="disabled-input" disabled />
 * ```
 */
export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * The for attribute that connects the label to a form control element
   *
   * @example
   * ```tsx
   * <Label htmlFor="email">Email</Label>
   * <Input id="email" type="email" />
   * ```
   */
  htmlFor?: string;

  /**
   * Whether the label should appear disabled
   *
   * @default false
   */
  disabled?: boolean;
}
