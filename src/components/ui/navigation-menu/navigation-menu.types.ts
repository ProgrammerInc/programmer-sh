'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as React from 'react';

// Navigation Menu Props
export type NavigationMenuProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>;

// Navigation Menu List Props
export type NavigationMenuListProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>;

// Navigation Menu Trigger Props
export type NavigationMenuTriggerProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>;

// Navigation Menu Content Props
export type NavigationMenuContentProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>;

// Navigation Menu Viewport Props
export type NavigationMenuViewportProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>;

// Navigation Menu Indicator Props
export type NavigationMenuIndicatorProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>;
