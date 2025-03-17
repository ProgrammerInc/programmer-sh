'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { InputProps } from './input.types';

/**
 * Input component
 * 
 * A standard form input component with styling.
 * 
 * @example
 * ```tsx
 * <Input type="text" placeholder="Enter your name" />
 * <Input type="email" disabled />
 * <Input type="password" className="custom-class" />
 * ```
 */
const Input = memo(React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // Memoize the className calculation
    const inputClassName = useMemo(() => {
      return cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      );
    }, [className]);

    return (
      <input
        type={type}
        className={inputClassName}
        ref={ref}
        {...props}
      />
    );
  }
));

Input.displayName = 'Input';

export { Input };
export default Input;
