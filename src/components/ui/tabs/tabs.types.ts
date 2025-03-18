'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

/**
 * Tab variants that control the visual appearance of the tabs component
 */
export type TabsVariant = 'default' | 'underline' | 'card' | 'bordered';

/**
 * Tab size options that control the size of the tab triggers
 */
export type TabsSize = 'default' | 'sm' | 'lg';

/**
 * Tab orientation options that control the layout direction
 */
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * Props for the Tabs root component
 * 
 * @property {string} defaultValue - The initial active tab value
 * @property {string} value - The controlled active tab value
 * @property {function} onValueChange - Callback when the active tab changes
 * @property {TabsVariant} variant - The visual style variant of the tabs
 * @property {TabsSize} size - The size of the tab triggers
 * @property {TabsOrientation} orientation - The layout direction of the tabs
 */
export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
}

/**
 * Props for the TabsList component
 * 
 * @property {string} className - Additional CSS class names
 * @property {React.ReactNode} children - The tab trigger elements
 */
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

/**
 * Props for the TabsTrigger component
 * 
 * @property {string} value - The unique value of this tab
 * @property {string} className - Additional CSS class names
 * @property {boolean} disabled - Whether the trigger is disabled
 * @property {React.ReactNode} children - The content of the trigger
 * @property {function} onClick - Callback when the trigger is clicked
 */
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

/**
 * Props for the TabsContent component
 * 
 * @property {string} value - The value that activates this content
 * @property {string} className - Additional CSS class names
 * @property {boolean} forceMount - Force mounting of content when not active
 * @property {React.ReactNode} children - The content to display when tab is active
 */
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;
