/**
 * Type definitions for the Collapsible component
 */

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ComponentPropsWithoutRef, ElementRef } from 'react';

/**
 * Props for the Collapsible root component
 */
export type CollapsibleProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;

/**
 * Ref type for the Collapsible root component
 */
export type CollapsibleRef = ElementRef<typeof CollapsiblePrimitive.Root>;

/**
 * Props for the CollapsibleTrigger component
 */
export type CollapsibleTriggerProps = ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;

/**
 * Props for the CollapsibleContent component
 */
export type CollapsibleContentProps = ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.CollapsibleContent
>;
