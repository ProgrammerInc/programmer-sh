'use client';

import * as React from 'react';
import { memo, useMemo, forwardRef } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/utils/app.utils';

import styles from './switch.module.css';
import { SwitchProps, SwitchSize, SwitchColorScheme } from './switch.types';

/**
 * Switch Component - A toggle control for binary choices
 * 
 * Features:
 * - Keyboard accessible using Tab and Space
 * - Screen reader accessible with ARIA support
 * - Customizable size and color scheme options
 * - Smooth transition animations
 * - Disabled state styling
 * - Focus state highlighting for keyboard navigation
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Switch aria-label="Toggle dark mode" />
 * 
 * // Controlled component
 * <Switch 
 *   checked={isDarkMode} 
 *   onCheckedChange={setIsDarkMode} 
 *   aria-label="Toggle dark mode"
 * />
 * 
 * // With different size
 * <Switch size="lg" aria-label="Toggle feature" />
 * 
 * // With custom color scheme
 * <Switch colorScheme="success" aria-label="Enable feature" />
 * ```
 */
const Switch = memo(forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps & { size?: SwitchSize; colorScheme?: SwitchColorScheme }
>(({ 
  className, 
  size = 'default',
  colorScheme = 'default',
  ...props 
}, ref) => {
  // Generate the root class names with appropriate size and color scheme modifiers
  const rootClassName = useMemo(() => {
    return cn(
      styles['switch-root'],
      className
    );
  }, [className]);

  // Generate the thumb class names
  const thumbClassName = useMemo(() => {
    return styles['switch-thumb'];
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

Switch.displayName = 'Switch';

export { Switch };
export default Switch;
