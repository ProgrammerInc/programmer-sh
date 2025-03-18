'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as React from 'react';

/**
 * Navigation Menu Props
 * 
 * Props for the root Navigation Menu component that contains a collection of links for site navigation.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#root Radix UI Navigation Menu Root}
 * 
 * Creates a navigation bar with multiple menu items with dropdown content.
 */
export type NavigationMenuProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>;

/**
 * Navigation Menu List Props
 * 
 * Props for the List component that contains the navigation items.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#list Radix UI Navigation Menu List}
 * 
 * Groups multiple navigation menu items in a horizontal list layout.
 */
export type NavigationMenuListProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>;

/**
 * Navigation Menu Trigger Props
 * 
 * Props for the Trigger component that toggles the dropdown content of a navigation item.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#trigger Radix UI Navigation Menu Trigger}
 * 
 * Creates a clickable button that opens a dropdown menu with additional navigation options.
 */
export type NavigationMenuTriggerProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>;

/**
 * Navigation Menu Content Props
 * 
 * Props for the Content component that contains the dropdown content.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#content Radix UI Navigation Menu Content}
 * 
 * Contains the dropdown content that appears when a navigation menu trigger is activated.
 */
export type NavigationMenuContentProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>;

/**
 * Navigation Menu Viewport Props
 * 
 * Props for the Viewport component that displays active navigation content.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#viewport Radix UI Navigation Menu Viewport}
 * 
 * A container that displays the active navigation menu content in a shared viewport area.
 */
export type NavigationMenuViewportProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>;

/**
 * Navigation Menu Indicator Props
 * 
 * Props for the Indicator component that shows which navigation item is active.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#indicator Radix UI Navigation Menu Indicator}
 * 
 * Displays a visual indicator (typically an arrow) pointing to the currently active navigation menu item.
 */
export type NavigationMenuIndicatorProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>;

/**
 * Navigation Menu Link Props
 * 
 * Props for the Link component that represents a navigational link.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu#link Radix UI Navigation Menu Link}
 * 
 * Creates a simple link in the navigation menu that navigates to a URL when clicked.
 */
export type NavigationMenuLinkProps =
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>;
