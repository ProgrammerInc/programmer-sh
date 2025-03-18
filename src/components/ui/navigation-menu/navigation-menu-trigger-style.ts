'use client';

import { cn } from '@/utils/app.utils';
import styles from './navigation-menu.module.css';

/**
 * Navigation menu trigger button styles
 * 
 * A function that returns the CSS class names for navigation menu trigger buttons
 * to maintain consistent styling across the application.
 * 
 * @returns The CSS class names for navigation menu trigger buttons
 */
export const navigationMenuTriggerStyle = () => {
  return styles['navigation-menu-trigger'];
};

export default navigationMenuTriggerStyle;
