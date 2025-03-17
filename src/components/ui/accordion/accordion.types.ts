import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';

/**
 * Accordion root component props
 */
export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

/**
 * AccordionItem component props
 */
export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;

/**
 * AccordionTrigger component props
 */
export type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>;

/**
 * AccordionContent component props
 */
export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;

/**
 * AccordionHeader component props
 */
export type AccordionHeaderProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>;
