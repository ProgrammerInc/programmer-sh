import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { buttonVariants } from './button.variants';

/**
 * Button component props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, the button will be rendered as a child component
   * @default false
   */
  asChild?: boolean;
}
