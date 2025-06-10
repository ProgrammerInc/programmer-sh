'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

/**
 * Select Root Component Props
 *
 * Props for the root Select component that manages the state of the select.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#root | Radix UI Select Root}
 */
export type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

/**
 * Select Group Component Props
 *
 * Props for the Select Group component that groups multiple select items together.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#group | Radix UI Select Group}
 */
export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;

/**
 * Select Value Component Props
 *
 * Props for the Select Value component that displays the selected value.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#value | Radix UI Select Value}
 */
export type SelectValueProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

/**
 * Select Trigger Component Props
 *
 * Props for the Select Trigger component, which is the button that opens the select.
 * Clicking this triggers the select dropdown to appear.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#trigger | Radix UI Select Trigger}
 */
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;

/**
 * Select Scroll Up Button Component Props
 *
 * Props for the ScrollUpButton component that appears at the top of the select dropdown
 * when there are more items to scroll up to.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#scrollupbutton | Radix UI Select ScrollUpButton}
 */
export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollUpButton
>;

/**
 * Select Scroll Down Button Component Props
 *
 * Props for the ScrollDownButton component that appears at the bottom of the select dropdown
 * when there are more items to scroll down to.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#scrolldownbutton | Radix UI Select ScrollDownButton}
 */
export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollDownButton
>;

/**
 * Select Content Component Props
 *
 * Props for the Content component that contains the select dropdown items.
 * Provides configuration for positioning and animation behavior.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#content | Radix UI Select Content}
 */
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  /**
   * The positioning strategy to use. Default is 'popper'.
   * @default 'popper'
   */
  position?: 'popper' | 'item-aligned';
}

/**
 * Select Label Component Props
 *
 * Props for the Label component that renders a label in the select dropdown.
 * Typically used with SelectGroup to label a group of select items.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#label | Radix UI Select Label}
 */
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

/**
 * Select Item Component Props
 *
 * Props for the Item component that represents a selectable option in the dropdown.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#item | Radix UI Select Item}
 */
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

/**
 * Select Separator Component Props
 *
 * Props for the Separator component that visually separates items in the dropdown.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/select#separator | Radix UI Select Separator}
 */
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;
