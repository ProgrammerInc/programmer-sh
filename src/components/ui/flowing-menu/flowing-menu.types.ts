import React from 'react';

/**
 * MenuItem Props
 * 
 * Props for an individual menu item in the FlowingMenu component.
 * 
 * @example
 * ```tsx
 * <MenuItem 
 *   link="/about" 
 *   text="About Us" 
 *   image="/images/about.jpg" 
 * />
 * ```
 */
export interface MenuItemProps {
  /**
   * URL that the menu item will navigate to when clicked
   */
  link: string;

  /**
   * Text to display for the menu item
   */
  text: string;

  /**
   * URL of the image to display in the menu item's flowing animation
   */
  image: string;
}

/**
 * FlowingMenu Props
 * 
 * Props for the FlowingMenu component that displays animated menu items.
 * 
 * @example
 * ```tsx
 * <FlowingMenu 
 *   items={[
 *     { link: "/home", text: "Home", image: "/images/home.jpg" },
 *     { link: "/about", text: "About", image: "/images/about.jpg" },
 *     { link: "/contact", text: "Contact", image: "/images/contact.jpg" },
 *   ]} 
 * />
 * ```
 */
export interface FlowingMenuProps {
  /**
   * Array of menu items to be displayed
   * @default []
   */
  items?: MenuItemProps[];
}
