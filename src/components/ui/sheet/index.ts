/**
 * Sheet Component
 * 
 * A modal dialog that slides in from the edge of the screen.
 * Based on Radix UI's Dialog primitive.
 * 
 * Features:
 * - Can appear from different edges of the screen (top, right, bottom, left)
 * - Includes an overlay to dim background content
 * - Fully keyboard accessible and screen reader friendly
 * - Animated entrances and exits with smooth transitions
 * - Supports customization through component composition
 * 
 * Usage examples:
 * ```tsx
 * // Basic usage
 * <Sheet>
 *   <SheetTrigger>Open</SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Sheet Title</SheetTitle>
 *       <SheetDescription>Sheet Description</SheetDescription>
 *     </SheetHeader>
 *     <div>Content goes here</div>
 *     <SheetFooter>
 *       <Button>Action</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * 
 * // From different sides
 * <Sheet>
 *   <SheetTrigger>Open Left Sheet</SheetTrigger>
 *   <SheetContent side="left">
 *     Content from the left
 *   </SheetContent>
 * </Sheet>
 * 
 * // With custom styling
 * <Sheet>
 *   <SheetTrigger>Settings</SheetTrigger>
 *   <SheetContent className="max-w-md">
 *     <SheetHeader>
 *       <SheetTitle>Application Settings</SheetTitle>
 *     </SheetHeader>
 *     <SettingsForm />
 *   </SheetContent>
 * </Sheet>
 * ```
 */

// Export sheet components
export * from './sheet';
export * from './sheet.types';

// For backwards compatibility
import { Sheet } from './sheet';
export default Sheet;
