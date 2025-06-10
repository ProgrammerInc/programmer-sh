import * as React from 'react';

/**
 * Button variant types
 */
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

/**
 * Button size types
 */
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

/**
 * Button component props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button visual style variant
   * @default 'default'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'default'
   */
  size?: ButtonSize;

  /**
   * When true, the button will be rendered as a child component
   * @default false
   */
  asChild?: boolean;
}
