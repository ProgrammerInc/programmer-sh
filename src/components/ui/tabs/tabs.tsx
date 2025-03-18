'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { forwardRef, memo, useMemo } from 'react';

import {
  TabsContentProps,
  TabsListProps,
  TabsOrientation,
  TabsProps,
  TabsSize,
  TabsTriggerProps,
  TabsVariant
} from './tabs.types';

import styles from './tabs.module.css';

/**
 * Tabs component based on Radix UI's Tabs primitive
 * 
 * Organizes content into multiple sections where only one section is visible at a time.
 * 
 * Features:
 * - Multiple visual variants: default, underline, card, and bordered
 * - Different size options: default, small (sm), and large (lg)
 * - Support for both horizontal and vertical orientations
 * - Keyboard navigation support
 * - Screen reader accessible
 * - Controlled and uncontrolled modes
 * 
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">
 *     <p>Account settings content here</p>
 *   </TabsContent>
 *   <TabsContent value="password">
 *     <p>Password settings content here</p>
 *   </TabsContent>
 * </Tabs>
 * ```
 * 
 * @example
 * ```tsx
 * // With variant and size options
 * <Tabs variant="underline" size="lg">
 *   <TabsList>
 *     <TabsTrigger value="tab1">First Tab</TabsTrigger>
 *     <TabsTrigger value="tab2">Second Tab</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">First tab content</TabsContent>
 *   <TabsContent value="tab2">Second tab content</TabsContent>
 * </Tabs>
 * ```
 * 
 * @example
 * ```tsx
 * // Vertical orientation
 * <Tabs orientation="vertical">
 *   <TabsList>
 *     <TabsTrigger value="tab1">First Tab</TabsTrigger>
 *     <TabsTrigger value="tab2">Second Tab</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">First tab content</TabsContent>
 *   <TabsContent value="tab2">Second tab content</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = memo(forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = 'default', size = 'default', orientation = 'horizontal', ...props }, ref) => {
  const tabsClassName = useMemo(() => {
    return cn(
      styles.tabs,
      variant === 'underline' && styles['tabs-underline'],
      variant === 'card' && styles['tabs-card'],
      variant === 'bordered' && styles['tabs-bordered'],
      size === 'sm' && styles['tabs-sm'],
      size === 'lg' && styles['tabs-lg'],
      orientation === 'vertical' && styles['tabs-vertical'],
      className
    );
  }, [className, variant, size, orientation]);

  return (
    <TabsPrimitive.Root
      ref={ref}
      className={tabsClassName}
      orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
      {...props}
    />
  );
}));

Tabs.displayName = TabsPrimitive.Root.displayName;

/**
 * TabsList component that contains the triggers for each tab
 * 
 * Features:
 * - Adapts to the parent Tabs variant and size automatically
 * - Supports horizontal and vertical orientations
 * - Fully accessible and keyboard navigable
 * 
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="account">Account</TabsTrigger>
 *   <TabsTrigger value="password">Password</TabsTrigger>
 * </TabsList>
 * ```
 */
const TabsList = memo(forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => {
  const listClassName = useMemo(() => {
    return cn(styles['tabs-list'], className);
  }, [className]);

  return (
    <TabsPrimitive.List
      className={listClassName}
      ref={ref}
      {...props}
    />
  );
}));

TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * TabsTrigger component that users click to activate a tab
 * 
 * Features:
 * - Visual indication of active state
 * - Supports disabled state
 * - Fully accessible with keyboard navigation
 * - Focus indicators for keyboard users
 * 
 * @example
 * ```tsx
 * <TabsTrigger value="account">Account</TabsTrigger>
 * ```
 * 
 * @example
 * ```tsx
 * <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
 * ```
 */
const TabsTrigger = memo(forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => {
  const triggerClassName = useMemo(() => {
    return cn(styles['tabs-trigger'], className);
  }, [className]);

  return (
    <TabsPrimitive.Trigger
      className={triggerClassName}
      ref={ref}
      {...props}
    />
  );
}));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * TabsContent component that contains the content for each tab
 * 
 * Features:
 * - Only displayed when the corresponding tab is active
 * - Can be force mounted even when not active (useful for forms)
 * - Smooth focus management when tabs change
 * 
 * @example
 * ```tsx
 * <TabsContent value="account">
 *   <p>Account settings content here</p>
 * </TabsContent>
 * ```
 * 
 * @example
 * ```tsx
 * <TabsContent value="form" forceMount>
 *   <form>Form that needs to stay mounted for state preservation</form>
 * </TabsContent>
 * ```
 */
const TabsContent = memo(forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(styles['tabs-content'], className);
  }, [className]);

  return (
    <TabsPrimitive.Content
      className={contentClassName}
      ref={ref}
      {...props}
    />
  );
}));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
export default Tabs;
