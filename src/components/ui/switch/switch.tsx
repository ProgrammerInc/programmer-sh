'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { SwitchProps } from './switch.types';

/**
 * Switch component
 * 
 * A control that allows the user to toggle between checked and not checked.
 * 
 * @example
 * ```tsx
 * <Switch aria-label="Toggle" />
 * <Switch checked={isChecked} onCheckedChange={setIsChecked} />
 * ```
 */
const Switch = memo(React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculations
  const rootClassName = useMemo(() => {
    return cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className
    );
  }, [className]);

  const thumbClassName = useMemo(() => {
    return cn(
      'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
    );
  }, []);

  return (
    <SwitchPrimitives.Root
      className={rootClassName}
      ref={ref}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={thumbClassName}
      />
    </SwitchPrimitives.Root>
  );
}));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
export default Switch;
