'use client';

import { cn } from '@/utils/app.utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  SelectContentProps,
  SelectItemProps,
  SelectLabelProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectSeparatorProps,
  SelectTriggerProps
} from './select.types';

/**
 * Select Root Component
 * 
 * The root component that contains all the parts of a select.
 */
const Select = memo(SelectPrimitive.Root);
Select.displayName = 'Select';

/**
 * Select Group Component
 * 
 * Groups select items together with an optional label.
 */
const SelectGroup = memo(SelectPrimitive.Group);
SelectGroup.displayName = SelectPrimitive.Group.displayName;

/**
 * Select Value Component
 * 
 * Displays the selected value.
 */
const SelectValue = memo(SelectPrimitive.Value);
SelectValue.displayName = SelectPrimitive.Value.displayName;

/**
 * Select Trigger Component
 * 
 * The button that opens the select.
 */
const SelectTrigger = memo(React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => {
  // Memoize the className calculation
  const triggerClassName = useMemo(() => {
    return cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    );
  }, [className]);

  return (
    <SelectPrimitive.Trigger
      className={triggerClassName}
      ref={ref}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}));

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * Select Scroll Up Button Component
 * 
 * Button to scroll up through the select options.
 */
const SelectScrollUpButton = memo(React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollUpButtonProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const scrollUpClassName = useMemo(() => {
    return cn('flex cursor-default items-center justify-center py-1', className);
  }, [className]);

  return (
    <SelectPrimitive.ScrollUpButton
      className={scrollUpClassName}
      ref={ref}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}));

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * Select Scroll Down Button Component
 * 
 * Button to scroll down through the select options.
 */
const SelectScrollDownButton = memo(React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const scrollDownClassName = useMemo(() => {
    return cn('flex cursor-default items-center justify-center py-1', className);
  }, [className]);

  return (
    <SelectPrimitive.ScrollDownButton
      className={scrollDownClassName}
      ref={ref}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}));

SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/**
 * Select Content Component
 * 
 * The content that appears when the select is open.
 */
const SelectContent = memo(React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = 'popper', ...props }, ref) => {
  // Memoize the className calculation
  const contentClassName = useMemo(() => {
    return cn(
      'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      position === 'popper' &&
        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
      className
    );
  }, [className, position]);

  // Memoize the viewport className calculation
  const viewportClassName = useMemo(() => {
    return cn(
      'p-1',
      position === 'popper' &&
        'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
    );
  }, [position]);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={contentClassName}
        position={position}
        ref={ref}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={viewportClassName}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}));

SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * Select Label Component
 * 
 * The label for a group of select items.
 */
const SelectLabel = memo(React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const labelClassName = useMemo(() => {
    return cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className);
  }, [className]);

  return (
    <SelectPrimitive.Label
      className={labelClassName}
      ref={ref}
      {...props}
    />
  );
}));

SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * Select Item Component
 * 
 * A selectable item.
 */
const SelectItem = memo(React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => {
  // Memoize the className calculation
  const itemClassName = useMemo(() => {
    return cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    );
  }, [className]);

  return (
    <SelectPrimitive.Item
      className={itemClassName}
      ref={ref}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}));

SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * Select Separator Component
 * 
 * A visual separator for select items.
 */
const SelectSeparator = memo(React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const separatorClassName = useMemo(() => {
    return cn('-mx-1 my-1 h-px bg-muted', className);
  }, [className]);

  return (
    <SelectPrimitive.Separator
      className={separatorClassName}
      ref={ref}
      {...props}
    />
  );
}));

SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
};

export default Select;
