'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './toggle.module.css';
import { ToggleProps } from './toggle.types';
import { toggleVariants } from './toggle.variants';

/**
 * Toggle Component
 *
 * A two-state button that can be either on or off, built on Radix UI's Toggle primitive.
 *
 * Features:
 * - Multiple style variants (default, outline)
 * - Multiple size options (sm, default, lg)
 * - Accessible keyboard navigation
 * - Focus management
 * - ARIA support
 * - Controlled and uncontrolled modes
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Toggle aria-label="Toggle italic">
 *   <Italic className="h-4 w-4" />
 * </Toggle>
 *
 * // With variant and size
 * <Toggle
 *   variant="outline"
 *   size="lg"
 *   aria-label="Toggle bold"
 * >
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 *
 * // With CSS module styling (recommended)
 * <Toggle
 *   className={`${styles.toggle} ${styles.outline} ${styles['size-lg']}`}
 *   aria-label="Toggle bold"
 * >
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 *
 * // Controlled usage
 * const [pressed, setPressed] = useState(false);
 *
 * <Toggle
 *   pressed={pressed}
 *   onPressedChange={setPressed}
 *   aria-label="Toggle bold"
 * >
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 * ```
 */
const Toggle = memo(
  React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
    ({ className, variant, size, ...props }, ref) => {
      // Determine CSS classes based on variants
      const getClassName = useMemo(() => {
        // For backward compatibility, also support the variant props
        if (variant || size) {
          // When using the variant API, we still use the toggleVariants helper
          return cn(toggleVariants({ variant, size, className }));
        }

        // New way using CSS modules directly
        const baseClass = styles.toggle;
        const variantClass = variant ? styles[variant] : styles.default;
        const sizeClass = size ? styles[`size-${size}`] : styles['size-default'];

        return cn(baseClass, variantClass, sizeClass, className);
      }, [variant, size, className]);

      return <TogglePrimitive.Root ref={ref} className={getClassName} {...props} />;
    }
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
export default Toggle;
