'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '../../../utils/app.utils';
import styles from './select.module.css';
import type {
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
 * The root component that manages the state of the select.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#root | Radix UI Select Root}
 *
 * Features:
 * - Manages the state of the select
 * - Provides context for all select components
 * - Accepts a value and onChange prop for controlled usage
 * - Supports defaultValue for uncontrolled usage
 * - Optional name and required attributes for form integration
 */
const Select = memo(SelectPrimitive.Root);

/**
 * Select Group Component
 *
 * Groups multiple select items together, optionally with a label.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#group | Radix UI Select Group}
 *
 * Features:
 * - Groups related select items
 * - Can be labeled with SelectLabel
 */
const SelectGroup = memo(SelectPrimitive.Group);

/**
 * Select Value Component
 *
 * Displays the currently selected value. Can display a placeholder when no value is selected.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#value | Radix UI Select Value}
 *
 * Features:
 * - Displays the currently selected value
 * - Supports placeholder text
 */
const SelectValue = memo(SelectPrimitive.Value);

/**
 * Select Trigger Component
 *
 * The button that toggles the select dropdown. Contains the select value and dropdown icon.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#trigger | Radix UI Select Trigger}
 *
 * Features:
 * - Toggles the select dropdown when clicked
 * - Contains the select value and dropdown icon
 * - Supports disabled state
 * - Provides focus styles for keyboard navigation
 */
const SelectTrigger = memo(
  React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
    ({ className, children, ...props }, ref) => {
      // Memoize the className calculation
      const triggerClassName = useMemo(() => {
        return cn(styles.trigger, className);
      }, [className]);

      return (
        <SelectPrimitive.Trigger ref={ref} className={triggerClassName} {...props}>
          {children}
          <SelectPrimitive.Icon asChild>
            <ChevronDown className={styles['trigger-icon']} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
      );
    }
  )
);

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * Select Scroll Up Button Component
 *
 * A button that appears at the top of the select dropdown when there are options
 * that have scrolled out of view. Clicking it scrolls the view upward.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#scrollupbutton | Radix UI Select ScrollUpButton}
 *
 * Features:
 * - Appears when there are items to scroll up to
 * - Automatically scrolls items into view when clicked
 */
const SelectScrollUpButton = memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    SelectScrollUpButtonProps
  >(({ className, ...props }, ref) => {
    // Memoize the className calculation
    const scrollButtonClassName = useMemo(() => {
      return cn(styles['scroll-button'], className);
    }, [className]);

    return (
      <SelectPrimitive.ScrollUpButton ref={ref} className={scrollButtonClassName} {...props}>
        <ChevronUp className={styles['scroll-button-icon']} />
      </SelectPrimitive.ScrollUpButton>
    );
  })
);

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * Select Scroll Down Button Component
 *
 * A button that appears at the bottom of the select dropdown when there are options
 * that have scrolled out of view. Clicking it scrolls the view downward.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#scrolldownbutton | Radix UI Select ScrollDownButton}
 *
 * Features:
 * - Appears when there are items to scroll down to
 * - Automatically scrolls items into view when clicked
 */
const SelectScrollDownButton = memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    SelectScrollDownButtonProps
  >(({ className, ...props }, ref) => {
    // Memoize the className calculation
    const scrollButtonClassName = useMemo(() => {
      return cn(styles['scroll-button'], className);
    }, [className]);

    return (
      <SelectPrimitive.ScrollDownButton ref={ref} className={scrollButtonClassName} {...props}>
        <ChevronDown className={styles['scroll-button-icon']} />
      </SelectPrimitive.ScrollDownButton>
    );
  })
);

SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/**
 * Select Content Component
 *
 * Contains the select dropdown content, viewport, and scroll buttons.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#content | Radix UI Select Content}
 *
 * Features:
 * - Contains the select dropdown content
 * - Supports different positioning strategies
 * - Animates in and out smoothly
 * - Includes scroll buttons for long lists
 */
const SelectContent = memo(
  React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, SelectContentProps>(
    ({ className, children, position = 'popper', ...props }, ref) => {
      // Memoize the className calculations
      const contentClassName = useMemo(() => {
        return cn(styles.content, position === 'popper' && styles['content-popper'], className);
      }, [className, position]);

      const viewportClassName = useMemo(() => {
        return cn(styles.viewport, position === 'popper' && styles['viewport-popper']);
      }, [position]);

      return (
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            ref={ref}
            className={contentClassName}
            position={position}
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
    }
  )
);

SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * Select Label Component
 *
 * A label for a group of select items.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#label | Radix UI Select Label}
 *
 * Features:
 * - Labels a group of select items
 * - Typically used within a SelectGroup
 */
const SelectLabel = memo(
  React.forwardRef<React.ElementRef<typeof SelectPrimitive.Label>, SelectLabelProps>(
    ({ className, ...props }, ref) => {
      // Memoize the className calculation
      const labelClassName = useMemo(() => {
        return cn(styles.label, className);
      }, [className]);

      return <SelectPrimitive.Label ref={ref} className={labelClassName} {...props} />;
    }
  )
);

SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * Select Item Component
 *
 * A selectable item in the select dropdown.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#item | Radix UI Select Item}
 *
 * Features:
 * - Represents a selectable option
 * - Shows a checkmark when selected
 * - Supports disabled state
 * - Provides focus styles for keyboard navigation
 */
const SelectItem = memo(
  React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
    ({ className, children, ...props }, ref) => {
      // Memoize the className calculation
      const itemClassName = useMemo(() => {
        return cn(styles.item, className);
      }, [className]);

      return (
        <SelectPrimitive.Item ref={ref} className={itemClassName} {...props}>
          <span className={styles['item-indicator-container']}>
            <SelectPrimitive.ItemIndicator>
              <Check className={styles['item-indicator-icon']} />
            </SelectPrimitive.ItemIndicator>
          </span>

          <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
      );
    }
  )
);

SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * Select Separator Component
 *
 * A visual separator for select items.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#separator | Radix UI Select Separator}
 *
 * Features:
 * - Provides a visual separator between groups or items
 */
const SelectSeparator = memo(
  React.forwardRef<React.ElementRef<typeof SelectPrimitive.Separator>, SelectSeparatorProps>(
    ({ className, ...props }, ref) => {
      // Memoize the className calculation
      const separatorClassName = useMemo(() => {
        return cn(styles.separator, className);
      }, [className]);

      return <SelectPrimitive.Separator ref={ref} className={separatorClassName} {...props} />;
    }
  )
);

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
