/**
 * Accordion Root Component
 *
 * A vertically stacked set of interactive headings that each reveal a section of content.
 */

'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { memo } from 'react';

import { AccordionProps } from './accordion.types';

/**
 * Accordion root component
 * 
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion = memo<AccordionProps>(AccordionPrimitive.Root);

export default Accordion;
