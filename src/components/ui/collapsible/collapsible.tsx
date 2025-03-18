'use client';

/**
 * Collapsible component
 * 
 * A UI component that can be expanded or collapsed to reveal or hide content.
 * Based on Radix UI Collapsible primitive.
 */

import { forwardRef } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import styles from './collapsible.module.css';
import { 
  CollapsibleContentProps, 
  CollapsibleProps, 
  CollapsibleRef, 
  CollapsibleTriggerProps 
} from './collapsible.types';

/**
 * Root Collapsible component
 * 
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content</CollapsibleContent>
 * </Collapsible>
 * ```
 */
const Collapsible = forwardRef<CollapsibleRef, CollapsibleProps>((
  { className, ...props },
  ref
) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    className={`${styles.collapsible} ${className || ''}`}
    {...props}
  />
));

Collapsible.displayName = 'Collapsible';

/**
 * Trigger component for the Collapsible
 * 
 * The button that toggles the collapsible content visibility
 */
const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>((
  { className, ...props },
  ref
) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={`${styles['collapsible-trigger']} ${className || ''}`}
    {...props}
  />
));

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

/**
 * Content component for the Collapsible
 * 
 * The content that will be shown or hidden based on the state of the Collapsible
 */
const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>((
  { className, ...props },
  ref
) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={`${styles['collapsible-content']} ${styles['collapsible-content-animation']} ${className || ''}`}
    {...props}
  />
));

CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleContent, CollapsibleTrigger };

export default Collapsible;
