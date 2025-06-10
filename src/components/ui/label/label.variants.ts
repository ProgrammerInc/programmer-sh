import { cva } from 'class-variance-authority';
import styles from './label.module.css';

/**
 * Variant styles for the Label component
 *
 * @example
 * ```tsx
 * <span className={labelVariants()}>Label text</span>
 * ```
 */
export const labelVariants = cva(styles.label, {
  variants: {
    /**
     * Whether the label is disabled
     */
    disabled: {
      true: styles['label-disabled']
    }
  },
  defaultVariants: {
    disabled: false
  }
});
