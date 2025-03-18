'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './separator.module.css';
import { SeparatorProps } from './separator.types';

/**
 * Separator Component
 * 
 * A visual divider that separates content either horizontally or vertically.
 * Based on Radix UI's Separator primitive.
 * 
 * Features:
 * - Supports both horizontal and vertical orientations
 * - Can be set as decorative or semantic for accessibility
 * - Customizable with classes for styling and spacing
 * - Fully keyboard accessible and screen reader friendly
 * 
 * @see {@link https://www.radix-ui.com/docs/primitives/components/separator | Radix UI Separator}
 */
const Separator = memo(React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
  // Memoize the className computation to avoid unnecessary recalculations
  const separatorClassName = useMemo(() => {
    return cn(
      styles.separator,
      orientation === 'horizontal' ? styles.horizontal : styles.vertical,
      className
    );
  }, [orientation, className]);

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={separatorClassName}
      {...props}
    />
  );
}));

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
export default Separator;
