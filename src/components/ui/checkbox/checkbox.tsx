'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { cn } from '@/utils/app.utils';
import { CheckboxIndicator } from './checkbox-indicator';
import styles from './checkbox.module.css';
import { CheckboxProps } from './checkbox.types';

/**
 * Checkbox component
 *
 * A form control that allows users to select an option.
 * Built on top of Radix UI's Checkbox primitive.
 *
 * @example
 * ```tsx
 * <Checkbox id="terms" />
 * <Label htmlFor="terms">Accept terms and conditions</Label>
 *
 * // Controlled checkbox
 * const [checked, setChecked] = useState(false);
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 * ```
 */
const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root ref={ref} className={cn(styles.checkbox, className)} {...props}>
        <CheckboxIndicator />
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
export default Checkbox;
