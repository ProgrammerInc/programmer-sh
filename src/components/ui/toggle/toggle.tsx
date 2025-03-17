'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { ToggleProps } from './toggle.types';
import { toggleVariants } from './toggle.variants';

/**
 * Toggle component based on Radix UI's Toggle primitive
 * 
 * A two-state button that can be either on or off.
 * 
 * @example
 * ```tsx
 * <Toggle aria-label="Toggle italic">
 *   <Italic className="h-4 w-4" />
 * </Toggle>
 * 
 * <Toggle variant="outline" size="lg" aria-label="Toggle bold">
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 * ```
 */
const Toggle = memo(React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => {
  // Memoize the class name computation to avoid unnecessary recalculations
  const toggleClassName = useMemo(
    () => cn(toggleVariants({ variant, size, className })),
    [variant, size, className]
  );
  
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={toggleClassName}
      {...props}
    />
  );
}));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
export default Toggle;
