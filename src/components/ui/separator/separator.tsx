'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { SeparatorProps } from './separator.types';

/**
 * Separator component based on Radix UI's Separator primitive
 *
 * Creates a visual divider that separates content either horizontally or vertically.
 * 
 * @example
 * // Horizontal separator
 * <Separator />
 * 
 * // Vertical separator
 * <Separator orientation="vertical" />
 * 
 * // With custom spacing
 * <Separator className="my-4" />
 */
const Separator = memo(React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
  // Memoize the className computation to avoid unnecessary recalculations
  const separatorClassName = useMemo(() => {
    return cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
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
