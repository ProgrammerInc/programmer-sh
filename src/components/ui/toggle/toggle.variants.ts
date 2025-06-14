'use client';

import { cva } from 'class-variance-authority';

/**
 * Toggle component variants
 * Defines styles for different toggle button variants and sizes
 *
 * @deprecated Use CSS modules instead. This file is kept for backward compatibility.
 * Import styles from toggle.module.css for new components.
 *
 * @example
 * ```tsx
 * // Instead of this:
 * <Toggle variant="outline" size="lg">Toggle</Toggle>
 *
 * // Use CSS modules:
 * import styles from './toggle.module.css';
 *
 * <Toggle
 *   className={`${styles.toggle} ${styles.outline} ${styles['size-lg']}`}
 * >
 *   Toggle
 * </Toggle>
 * ```
 */
export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export default toggleVariants;
