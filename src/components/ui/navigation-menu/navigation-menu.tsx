'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './navigation-menu.module.css';
import { navigationMenuTriggerStyle } from './navigation-menu-trigger-style';
import {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps
} from './navigation-menu.types';

/**
 * Navigation Menu
 * 
 * A collection of links for site navigation.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#root Radix UI Navigation Menu Root}
 */
const NavigationMenu = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, children, ...props }, ref) => {
  const menuClassName = useMemo(() => {
    return cn(styles['navigation-menu'], className);
  }, [className]);

  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={menuClassName}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
}));

NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

/**
 * Navigation Menu List
 * 
 * Container for navigation items.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#list Radix UI Navigation Menu List}
 */
const NavigationMenuList = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(({ className, ...props }, ref) => {
  const listClassName = useMemo(() => {
    return cn(styles['navigation-menu-list'], className);
  }, [className]);

  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={listClassName}
      {...props}
    />
  );
}));

NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

/**
 * Navigation Menu Item
 * 
 * An item within the navigation menu.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#item Radix UI Navigation Menu Item}
 */
const NavigationMenuItem = memo(NavigationMenuPrimitive.Item);
NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;

/**
 * Navigation Menu Trigger
 * 
 * Trigger button for a navigation menu item.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#trigger Radix UI Navigation Menu Trigger}
 */
const NavigationMenuTrigger = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => {
  const triggerClassName = useMemo(() => {
    return cn(navigationMenuTriggerStyle(), className);
  }, [className]);

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={triggerClassName}
      {...props}
    >
      {children}{' '}
      <ChevronDown
        className={styles['navigation-menu-trigger-icon']}
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}));

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

/**
 * Navigation Menu Content
 * 
 * Contains dropdown content for a navigation item.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#content Radix UI Navigation Menu Content}
 */
const NavigationMenuContent = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(styles['navigation-menu-content'], className);
  }, [className]);

  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={contentClassName}
      {...props}
    />
  );
}));

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

/**
 * Navigation Menu Link
 * 
 * A link within the navigation menu.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#link Radix UI Navigation Menu Link}
 */
const NavigationMenuLink = memo(NavigationMenuPrimitive.Link);
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

/**
 * Navigation Menu Viewport
 * 
 * Contains the content that is displayed when a navigation item is active.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#viewport Radix UI Navigation Menu Viewport}
 */
const NavigationMenuViewport = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => {
  const viewportClassName = useMemo(() => {
    return cn(styles['navigation-menu-viewport'], className);
  }, [className]);

  return (
    <div className={styles['navigation-menu-viewport-container']}>
      <NavigationMenuPrimitive.Viewport
        className={viewportClassName}
        ref={ref}
        {...props}
      />
    </div>
  );
}));

NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

/**
 * Navigation Menu Indicator
 * 
 * Indicates which navigation item is currently active.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#indicator Radix UI Navigation Menu Indicator}
 */
const NavigationMenuIndicator = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => {
  const indicatorClassName = useMemo(() => {
    return cn(styles['navigation-menu-indicator'], className);
  }, [className]);

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={indicatorClassName}
      {...props}
    >
      <div className={styles['navigation-menu-indicator-arrow']} />
    </NavigationMenuPrimitive.Indicator>
  );
}));

NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
};

export default NavigationMenu;
