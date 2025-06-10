/**
 * Accordion Trigger Component
 *
 * The button that toggles the expanded state of an accordion item.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import React, { memo, useMemo } from 'react';

import styles from './accordion.module.css';
import { AccordionTriggerProps } from './accordion.types';

/**
 * AccordionTrigger component
 *
 * The button that toggles the expanded state of an accordion item.
 * When pressed, it expands/collapses the content within an accordion item.
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Click me to expand/collapse</AccordionTrigger>
 * ```
 */
export const AccordionTrigger = memo(
  React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, AccordionTriggerProps>(
    ({ className, children, ...props }, ref) => {
      const triggerClassName = useMemo(() => {
        return cn(styles.trigger, className);
      }, [className]);

      return (
        <AccordionPrimitive.Header className={styles.header}>
          <AccordionPrimitive.Trigger ref={ref} className={triggerClassName} {...props}>
            {children}
            <ChevronDown className={styles.chevron} />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
      );
    }
  )
);

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export default AccordionTrigger;
