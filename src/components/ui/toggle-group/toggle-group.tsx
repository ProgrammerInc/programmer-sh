'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as React from 'react';
import { createContext, useContext, forwardRef } from 'react';

import { toggleVariants } from '@/components/ui/toggle/toggle.variants';
import { cn } from '@/utils/app.utils';
import styles from '@/components/ui/toggle/toggle.module.css';
import toggleGroupStyles from './toggle-group.module.css';
import { ToggleGroupProps, ToggleGroupItemProps, ToggleGroupContextValue } from './toggle-group.types';

/**
 * Context for sharing toggle group variant and size props with child items
 */
const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: 'default',
  variant: 'default'
});

/**
 * ToggleGroup Component
 * 
 * A set of two-state buttons that can be toggled on or off. Built on Radix UI's ToggleGroup primitive.
 * 
 * Features:
 * - Single or multiple selection modes
 * - Consistent styling across toggle items
 * - Horizontal or vertical orientation
 * - Keyboard navigation
 * - Accessibility support
 * - CSS module styling
 * 
 * @example
 * ```tsx
 * // Basic usage with single selection
 * <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
 *   <ToggleGroupItem value="left" aria-label="Left aligned">
 *     <AlignLeftIcon className="h-4 w-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Center aligned">
 *     <AlignCenterIcon className="h-4 w-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="right" aria-label="Right aligned">
 *     <AlignRightIcon className="h-4 w-4" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, children, orientation = 'horizontal', type = 'single', ...props }, ref) => {
  const orientationClass = orientation === 'vertical' 
    ? toggleGroupStyles['toggle-group-vertical']
    : toggleGroupStyles['toggle-group-horizontal'];
    
  // We need to cast type to any to avoid TypeScript error with type incompatibility
  // This is safe since the Radix UI component accepts both 'single' and 'multiple'
  const rootProps = {
    ref,
    type,
    className: cn(
      toggleGroupStyles['toggle-group'],
      orientationClass,
      className
    ),
    ...props
  } as React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>;
  
  return (
    <ToggleGroupPrimitive.Root
      {...rootProps}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

/**
 * ToggleGroupItem Component
 * 
 * An item within a ToggleGroup that can be toggled on or off.
 * 
 * @example
 * ```tsx
 * <ToggleGroupItem value="bold" aria-label="Bold">
 *   <BoldIcon className="h-4 w-4" />
 * </ToggleGroupItem>
 * ```
 */
const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);
  
  // Inherit variant and size from context if not provided directly
  const finalVariant = variant || context.variant || 'default';
  const finalSize = size || context.size || 'default';
  
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: finalVariant,
          size: finalSize
        }),
        toggleGroupStyles['toggle-group-item'],
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupContext, ToggleGroupItem, ToggleGroupPrimitive };

export default ToggleGroup;
