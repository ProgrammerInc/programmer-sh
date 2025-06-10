import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

/**
 * Checkbox component props
 */
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * Controlled checked state of the checkbox
   */
  checked?: boolean;

  /**
   * Default checked state when uncontrolled
   */
  defaultChecked?: boolean;

  /**
   * Required attribute to indicate if input requires a value
   */
  required?: boolean;

  /**
   * Optional additional CSS class name
   */
  className?: string;

  /**
   * Optional id for accessibility and label association
   */
  id?: string;

  /**
   * Optional name attribute for form submission
   */
  name?: string;

  /**
   * Optional value attribute for form submission
   */
  value?: string;

  /**
   * Optional disabled state
   */
  disabled?: boolean;

  /**
   * Optional callback for checkbox state changes
   */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

/**
 * Checkbox indicator props
 */
export type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Indicator
>;

/**
 * Checkbox icon props
 */
export interface CheckboxIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Optional additional CSS class name
   */
  className?: string;
}
