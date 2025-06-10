/**
 * Accordion Item Component
 *
 * Represents a single item within the accordion group.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React, { memo, useMemo } from 'react';

import styles from './accordion.module.css';
import { AccordionItemProps } from './accordion.types';

/**
 * AccordionItem component
 *
 * @example
 * ```tsx
 * <AccordionItem value="unique-value">
 *   <AccordionTrigger>Title</AccordionTrigger>
 *   <AccordionContent>Content</AccordionContent>
 * </AccordionItem>
 * ```
 */
export const AccordionItem = memo(
  React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, AccordionItemProps>(
    ({ className, ...props }, ref) => {
      const itemClassName = useMemo(() => {
        return cn(styles.item, className);
      }, [className]);

      return <AccordionPrimitive.Item ref={ref} className={itemClassName} {...props} />;
    }
  )
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
