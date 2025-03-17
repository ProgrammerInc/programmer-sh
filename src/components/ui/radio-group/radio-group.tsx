'use client';

import { cn } from '@/utils/app.utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  RadioGroupItemProps,
  RadioGroupProps
} from './radio-group.types';

/**
 * RadioGroup component for selecting a single value from a list of options
 * 
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option-one">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option-one" id="option-one" />
 *     <Label htmlFor="option-one">Option One</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */
const RadioGroup = memo(React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  const radioGroupClassName = useMemo(() => {
    return cn('grid gap-2', className);
  }, [className]);

  return (
    <RadioGroupPrimitive.Root
      className={radioGroupClassName}
      ref={ref}
      {...props}
    />
  );
}));

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * RadioGroupItem component for individual radio options within a RadioGroup
 */
const RadioGroupItem = memo(React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  const radioItemClassName = useMemo(() => {
    return cn(
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    );
  }, [className]);

  return (
    <RadioGroupPrimitive.Item
      className={radioItemClassName}
      ref={ref}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}));

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
export default RadioGroup;
