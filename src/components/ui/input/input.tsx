'use client';

import * as React from 'react';

import { cn } from '@/utils/app.utils';
import styles from './input.module.css';
import { InputProps } from './input.types';

/**
 * Input component
 *
 * A standard form input component with consistent styling across the application.
 * The component uses CSS modules for styling and supports all standard HTML input attributes.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input type="text" placeholder="Enter your name" />
 *
 * // With validation
 * <Input
 *   type="email"
 *   required
 *   placeholder="example@domain.com"
 *   aria-label="Email address"
 * />
 *
 * // Disabled state
 * <Input type="text" disabled value="Read only content" />
 * ```
 */
const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    // Combine default styles with any custom className
    const inputClassName = cn(styles.input, className);

    return <input type={type} className={inputClassName} ref={ref} {...props} />;
  }
);

// Set displayName for debugging
InputComponent.displayName = 'Input';

/**
 * Memoized Input component
 *
 * A styled input field for collecting user data in forms.
 * Supports all standard HTML input types and attributes.
 */
const Input = React.memo(InputComponent);
Input.displayName = 'Input';

export { Input };
export default Input;
