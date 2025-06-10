/* eslint-disable no-secrets/no-secrets */

/**
 * Navigation Menu Component
 *
 * A collection of components for building a navigation menu with dropdown content.
 * Based on Radix UI's Navigation Menu primitives.
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/navigation-menu Radix UI Navigation Menu}
 *
 * These components provide a flexible API for creating navigation menus with dropdown content.
 * The styling is handled via CSS modules to ensure consistent and maintainable designs.
 *
 * @example
 * ```tsx
 * import {
 *   NavigationMenu,
 *   NavigationMenuList,
 *   NavigationMenuItem,
 *   NavigationMenuTrigger,
 *   NavigationMenuContent,
 *   NavigationMenuLink
 * } from '@/components/ui/navigation-menu';
 *
 * export function Example() {
 *   return (
 *     <NavigationMenu>
 *       <NavigationMenuList>
 *         <NavigationMenuItem>
 *           <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
 *           <NavigationMenuContent>
 *             <NavigationMenuLink href="/docs/installation">Installation</NavigationMenuLink>
 *           </NavigationMenuContent>
 *         </NavigationMenuItem>
 *       </NavigationMenuList>
 *     </NavigationMenu>
 *   );
 * }
 * ```
 */

// Export navigation menu components
export * from './navigation-menu';
export * from './navigation-menu-trigger-style';
export * from './navigation-menu.types';

// For backwards compatibility
import { NavigationMenu } from './navigation-menu';
export default NavigationMenu;
