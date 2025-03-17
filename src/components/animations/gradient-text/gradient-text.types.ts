/**
 * Type definitions for the Gradient Text component
 */

import { ReactNode } from 'react';

/**
 * Props for the GradientText component
 */
export interface GradientTextProps {
  /** Content to display with gradient effect */
  children: ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Array of colors for the gradient */
  colors?: string[];

  /** Animation duration in seconds */
  animationSpeed?: number;

  /** Whether to show a border with the same gradient */
  showBorder?: boolean;
}
