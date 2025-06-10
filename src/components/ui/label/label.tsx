'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/utils/app.utils';
import { LabelProps } from './label.types';
import { labelVariants } from './label.variants';

/**
 * Label Component
 *
 * A form label with styling based on Radix UI's Label primitive.
 * Provides accessible labeling for form controls with customizable styling.
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
const LabelComponent = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants({ disabled }), className)}
        data-disabled={disabled ? '' : undefined}
        {...props}
      />
    );
  }
);

LabelComponent.displayName = 'Label';

/**
 * Label Component
 *
 * Memoized version of the label component for better performance.
 */
const Label = React.memo(LabelComponent);

export { Label };
export default Label;
