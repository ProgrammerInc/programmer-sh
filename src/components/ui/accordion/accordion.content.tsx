/**
 * Accordion Content Component
 *
 * Contains the content that is revealed when the accordion item is expanded.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React, { memo, useMemo } from 'react';

import styles from './accordion.module.css';
import { AccordionContentProps } from './accordion.types';

/**
 * AccordionContent component
 * 
 * Contains the content that is revealed when the accordion item is expanded.
 * 
 * @example
 * ```tsx
 * <AccordionContent>
 *   <p>This content is revealed when the accordion item is expanded.</p>
 * </AccordionContent>
 * ```
 */
export const AccordionContent = memo(React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const contentWrapperClassName = useMemo(() => {
    return cn(styles['content-inner'], className);
  }, [className]);

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={styles.content}
      {...props}
    >
      <div className={contentWrapperClassName}>{children}</div>
    </AccordionPrimitive.Content>
  );
}));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export default AccordionContent;
