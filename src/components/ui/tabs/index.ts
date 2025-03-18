/**
 * Tabs Component
 * 
 * A set of components for building accessible tab interfaces.
 * 
 * Features:
 * - Multiple visual variants: default, underline, card, and bordered
 * - Different size options: default, small (sm), and large (lg)
 * - Support for both horizontal and vertical orientations
 * - Keyboard navigation support
 * - Screen reader accessible
 * - Controlled and uncontrolled modes
 * 
 * @example
 * ```tsx
 * import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
 * 
 * function MyTabs() {
 *   return (
 *     <Tabs defaultValue="account">
 *       <TabsList>
 *         <TabsTrigger value="account">Account</TabsTrigger>
 *         <TabsTrigger value="password">Password</TabsTrigger>
 *       </TabsList>
 *       <TabsContent value="account">
 *         <p>Account settings content here</p>
 *       </TabsContent>
 *       <TabsContent value="password">
 *         <p>Password settings content here</p>
 *       </TabsContent>
 *     </Tabs>
 *   );
 * }
 * ```
 */

// Export tabs components
export * from './tabs';
export * from './tabs.types';

// For backwards compatibility
import { Tabs } from './tabs';
export default Tabs;
