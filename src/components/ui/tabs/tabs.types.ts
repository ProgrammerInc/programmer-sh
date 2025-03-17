import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

/**
 * Props for the Tabs root component
 */
export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

/**
 * Props for the TabsList component
 */
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

/**
 * Props for the TabsTrigger component
 */
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

/**
 * Props for the TabsContent component
 */
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;
