/**
 * HoverCard Component
 *
 * A set of components built on the Radix UI HoverCard primitive
 * that displays floating content when the trigger is hovered or focused.
 *
 * Features:
 * - Accessible design with proper ARIA attributes
 * - Customizable animations and transitions
 * - Configurable positioning and collision handling
 * - Keyboard navigation support
 * - Adjustable delays for open and close actions
 *
 * @see https://www.radix-ui.com/primitives/docs/components/hover-card
 *
 * Components:
 * - HoverCard: The root component that manages state
 * - HoverCardTrigger: The element that triggers the card
 * - HoverCardContent: The content that appears when hovering
 *
 * @example
 * ```tsx
 * import {
 *   HoverCard,
 *   HoverCardContent,
 *   HoverCardTrigger
 * } from '@/components/ui/hover-card';
 *
 * export function UserHoverCard() {
 *   return (
 *     <HoverCard openDelay={200} closeDelay={300}>
 *       <HoverCardTrigger asChild>
 *         <Button variant="link">@username</Button>
 *       </HoverCardTrigger>
 *       <HoverCardContent className="w-80">
 *         <div className="flex space-x-4">
 *           <Avatar />
 *           <div className="space-y-1">
 *             <h4 className="text-sm font-semibold">John Doe</h4>
 *             <p className="text-sm">Software developer at Example Inc.</p>
 *             <div className="flex items-center pt-2">
 *               <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
 *               <span className="text-xs text-muted-foreground">
 *                 Joined December 2021
 *               </span>
 *             </div>
 *           </div>
 *         </div>
 *       </HoverCardContent>
 *     </HoverCard>
 *   );
 * }
 * ```
 *
 * @module
 */

// Export all components and types
export { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
export type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps
} from './hover-card.types';

// For backwards compatibility
import { HoverCard } from './hover-card';
export default HoverCard;
