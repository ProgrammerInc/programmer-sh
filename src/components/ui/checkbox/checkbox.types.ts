import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

/**
 * Checkbox component props
 */
export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
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
}

/**
 * Checkbox indicator props
 */
export type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>;
