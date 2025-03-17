'use client';

import { cn } from '@/utils/app.utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps
} from './accordion.types';

/**
 * Accordion root component
 * 
 * A vertically stacked set of interactive headings that each reveal a section of content.
 * 
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Section 2</AccordionTrigger>
 *     <AccordionContent>Content for section 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion = memo(AccordionPrimitive.Root);

/**
 * AccordionItem component
 * 
 * Represents a single item within the accordion group.
 * 
 * @example
 * ```tsx
 * <AccordionItem value="unique-value">
 *   <AccordionTrigger>Title</AccordionTrigger>
 *   <AccordionContent>Content</AccordionContent>
 * </AccordionItem>
 * ```
 */
const AccordionItem = memo(React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => {
  const itemClassName = useMemo(() => {
    return cn('border-b', className);
  }, [className]);

  return <AccordionPrimitive.Item ref={ref} className={itemClassName} {...props} />;
}));

AccordionItem.displayName = 'AccordionItem';

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
const AccordionTrigger = memo(React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const triggerClassName = useMemo(() => {
    return cn(
      'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
      className
    );
  }, [className]);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={triggerClassName}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

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
const AccordionContent = memo(React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const contentWrapperClassName = useMemo(() => {
    return cn('pb-4 pt-0', className);
  }, [className]);

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={contentWrapperClassName}>{children}</div>
    </AccordionPrimitive.Content>
  );
}));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

export default Accordion;
