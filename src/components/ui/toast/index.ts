/**
 * Toast UI Component
 * 
 * A toast component for showing temporary notifications and information to users.
 * Based on Radix UI Toast primitive with enhanced styling and functionality.
 * 
 * Features:
 * - Multiple style variants (default, destructive)
 * - Action buttons
 * - Close button
 * - Swipe to dismiss
 * - Keyboard accessible
 * - Customizable duration
 * - Responsive placement
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ToastProvider>
 *   <Button
 *     onClick={() => {
 *       toast({
 *         title: "Success",
 *         description: "Your action was completed successfully",
 *       })
 *     }}
 *   >
 *     Show Toast
 *   </Button>
 *   <ToastViewport />
 * </ToastProvider>
 * 
 * // Custom toast with action
 * toast({
 *   title: "New message",
 *   description: "You have 3 unread messages",
 *   action: <ToastAction altText="View messages">View</ToastAction>,
 * })
 * ```
 */

// Export toast components and types
export * from './toast.types';
export * from './toast.variants';
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

// For backwards compatibility
import { Toast } from './toast';
export default Toast;
