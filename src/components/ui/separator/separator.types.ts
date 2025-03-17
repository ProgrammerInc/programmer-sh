import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

// Type definitions for Separator component
export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /**
   * Orientation of the separator (horizontal or vertical)
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Whether the separator is purely decorative, if true, accessibility is reduced
   * @default true
   */
  decorative?: boolean;
}
