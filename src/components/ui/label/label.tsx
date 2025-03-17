'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { labelVariants } from './label.variants';
import { LabelProps } from './label.types';

/**
 * Label component
 * 
 * A form label with styling based on Radix UI's Label primitive.
 * 
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 * ```
 */
const Label = memo(React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const labelClassName = useMemo(() => {
    return cn(labelVariants(), className);
  }, [className]);
  
  return (
    <LabelPrimitive.Root 
      ref={ref} 
      className={labelClassName} 
      {...props} 
    />
  );
}));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
export default Label;
