'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { navigationMenuTriggerStyle } from './navigation-menu-trigger-style';
import {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
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
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <NavigationMenuLink>Link</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
const NavigationMenu = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, children, ...props }, ref) => {
  const menuClassName = useMemo(() => {
    return cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className);
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
 */
const NavigationMenuList = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(({ className, ...props }, ref) => {
  const listClassName = useMemo(() => {
    return cn('group flex flex-1 list-none items-center justify-center space-x-1', className);
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
 */
const NavigationMenuItem = memo(NavigationMenuPrimitive.Item);
NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;

/**
 * Navigation Menu Trigger
 * 
 * Trigger button for a navigation menu item.
 */
const NavigationMenuTrigger = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => {
  const triggerClassName = useMemo(() => {
    return cn(navigationMenuTriggerStyle(), 'group', className);
  }, [className]);

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={triggerClassName}
      {...props}
    >
      {children}{' '}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
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
 */
const NavigationMenuContent = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(
      'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ',
      className
    );
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
 */
const NavigationMenuLink = memo(NavigationMenuPrimitive.Link);
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

/**
 * Navigation Menu Viewport
 * 
 * Contains the content that is displayed when a navigation item is active.
 */
const NavigationMenuViewport = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => {
  const viewportClassName = useMemo(() => {
    return cn(
      'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
      className
    );
  }, [className]);

  return (
    <div className={cn('absolute left-0 top-full flex justify-center')}>
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
 */
const NavigationMenuIndicator = memo(React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => {
  const indicatorClassName = useMemo(() => {
    return cn(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      className
    );
  }, [className]);

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={indicatorClassName}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
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
