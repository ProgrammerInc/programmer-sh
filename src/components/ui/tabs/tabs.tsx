'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { memo, useMemo } from 'react';

import {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps
} from './tabs.types';

/**
 * Tabs component based on Radix UI's Tabs primitive
 * 
 * Organizes content into multiple sections where only one section is visible at a time.
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
 */
const Tabs = memo(TabsPrimitive.Root) as React.FC<TabsProps>;
Tabs.displayName = TabsPrimitive.Root.displayName;

/**
 * TabsList component that contains the triggers for each tab
 * 
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="account">Account</TabsTrigger>
 *   <TabsTrigger value="password">Password</TabsTrigger>
 * </TabsList>
 * ```
 */
const TabsList = memo(React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => {
  const listClassName = useMemo(() => {
    return cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    );
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
 * @example
 * ```tsx
 * <TabsTrigger value="account">Account</TabsTrigger>
 * ```
 */
const TabsTrigger = memo(React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => {
  const triggerClassName = useMemo(() => {
    return cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    );
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
 * @example
 * ```tsx
 * <TabsContent value="account">
 *   <p>Account settings content here</p>
 * </TabsContent>
 * ```
 */
const TabsContent = memo(React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    );
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
