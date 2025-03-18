/**
 * Type definitions for Animated List components
 */

import { MouseEventHandler, ReactNode } from 'react';

/**
 * Props for the AnimatedItem component
 */
export interface AnimatedItemProps {
  /** Child elements to render inside the animated item */
  children: ReactNode;
  
  /** Animation delay in seconds */
  delay?: number;
  
  /** Index of the item in the list */
  index: number;
  
  /** Handler for mouse enter events */
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  
  /** Handler for click events */
  onClick?: MouseEventHandler<HTMLDivElement>;
  
  /** Additional class names for the item */
  className?: string;
}

/**
 * Props for the AnimatedList component
 */
export interface AnimatedListProps {
  /** Array of items to display in the list */
  items?: string[];
  
  /** Callback when an item is selected */
  onItemSelect?: (item: string, index: number) => void;
  
  /** Whether to show top and bottom gradients for scroll indication */
  showGradients?: boolean;
  
  /** Whether to enable keyboard arrow navigation */
  enableArrowNavigation?: boolean;
  
  /** Additional class names for the list container */
  className?: string;
  
  /** Additional class names for each item */
  itemClassName?: string;
  
  /** Whether to display scrollbars */
  displayScrollbar?: boolean;
  
  /** Initial selected item index (-1 for none) */
  initialSelectedIndex?: number;
}
