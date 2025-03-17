'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
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
const Checkbox = memo(React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const rootClassName = useMemo(() => {
    return cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    );
  }, [className]);

  const indicatorClassName = useMemo(() => {
    return cn('flex items-center justify-center text-current');
  }, []);

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={rootClassName}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={indicatorClassName}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
export default Checkbox;
