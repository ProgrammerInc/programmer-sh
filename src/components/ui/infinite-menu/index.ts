/**
 * InfiniteMenu Component
 *
 * A WebGL-based 3D interactive menu with grid items displayed in a spherical arrangement.
 * This component provides a visually appealing way to present navigation options or content items.
 *
 * Features:
 * - WebGL-rendered interactive 3D interface
 * - Sphere-based layout with disc items
 * - Smooth animations and transitions
 * - Automatic item selection based on view position
 * - Responsive design that adapts to container size
 * - External and internal link support
 *
 * @example
 * ```tsx
 * import { InfiniteMenu } from '@/components/ui/infinite-menu';
 *
 * export function MyMenu() {
 *   const menuItems = [
 *     {
 *       image: '/images/item1.jpg',
 *       link: '/page1',
 *       title: 'First Item',
 *       description: 'Description of the first item'
 *     },
 *     {
 *       image: '/images/item2.jpg',
 *       link: 'https://external-site.com',
 *       title: 'External Link',
 *       description: 'This links to an external site'
 *     }
 *   ];
 *
 *   return (
 *     <div className="h-screen w-screen">
 *       <InfiniteMenu items={menuItems} />
 *     </div>
 *   );
 * }
 * ```
 *
 * @module
 */

// Export the InfiniteMenu component
import InfiniteMenu from './infinite-menu';

// Export types for external usage
export type {
  MenuItem,
  InfiniteMenuProps,
  InfiniteGridMenu
} from './infinite-menu.types';

// For backwards compatibility
export default InfiniteMenu;
