'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

/**
 * Separator Component Props
 *
 * Props for the Separator component that creates a visual divider
 * between content, either horizontal or vertical.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/separator | Radix UI Separator}
 */
export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /**
   * The orientation of the separator.
   * - 'horizontal': Creates a horizontal line (default)
   * - 'vertical': Creates a vertical line
   * 
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * When true, indicates that the separator is purely decorative, meaning
   * it has no semantic value and is only used for visual presentation.
   * This impacts how screen readers announce the separator.
   * 
   * When false, the separator will be treated as a thematic break (like an <hr>)
   * in the accessibility tree.
   * 
   * @default true
   */
  decorative?: boolean;
}
