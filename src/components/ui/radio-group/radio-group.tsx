'use client';

import { cn } from '@/utils/app.utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './radio-group.module.css';
import { RadioGroupItemProps, RadioGroupProps } from './radio-group.types';

/**
 * RadioGroup component
 *
 * A set of checkable buttons—known as radio buttons—where only one can be checked at a time.
 * Built on top of Radix UI RadioGroup primitive for accessibility and customization.
 *
 * Features:
 * - Keyboard navigation (arrow keys, space to select)
 * - Screen reader announcements
 * - Focus management and custom focus styles
 * - Automatic ARIA attributes for accessibility
 *
 * @example
 * ```tsx
 * import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
 * import { Label } from '@/components/ui/label';
 *
 * export function RadioGroupExample() {
 *   return (
 *     <RadioGroup defaultValue="option-one">
 *       <div className="flex items-center space-x-2">
 *         <RadioGroupItem value="option-one" id="option-one" />
 *         <Label htmlFor="option-one">Option One</Label>
 *       </div>
 *       <div className="flex items-center space-x-2">
 *         <RadioGroupItem value="option-two" id="option-two" />
 *         <Label htmlFor="option-two">Option Two</Label>
 *       </div>
 *     </RadioGroup>
 *   );
 * }
 * ```
 */
const RadioGroup = memo(
  React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
    ({ className, ...props }, ref) => {
      const radioGroupClassName = useMemo(() => {
        return cn(styles.root, className);
      }, [className]);

      return <RadioGroupPrimitive.Root className={radioGroupClassName} ref={ref} {...props} />;
    }
  )
);

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * RadioGroupItem component
 *
 * An individual radio button item within a RadioGroup that can be checked.
 * When checked, a visual indicator is shown and the radio item receives focus.
 *
 * Features:
 * - Customizable appearance
 * - Focus and disabled states styling
 * - Animated indicator when selected
 *
 * @example
 * ```tsx
 * <RadioGroupItem value="option" id="option" />
 * ```
 */
const RadioGroupItem = memo(
  React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
    ({ className, ...props }, ref) => {
      const radioItemClassName = useMemo(() => {
        return cn(styles.item, className);
      }, [className]);

      return (
        <RadioGroupPrimitive.Item className={radioItemClassName} ref={ref} {...props}>
          <RadioGroupPrimitive.Indicator className={styles.indicator}>
            <Circle className={styles.circle} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      );
    }
  )
);

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
export default RadioGroup;
