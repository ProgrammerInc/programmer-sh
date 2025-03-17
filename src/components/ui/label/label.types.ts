import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { labelVariants } from './label.variants';

/**
 * Label component props
 */
export interface LabelProps 
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * For attribute that connects the label to a form element
   */
  htmlFor?: string;
}
