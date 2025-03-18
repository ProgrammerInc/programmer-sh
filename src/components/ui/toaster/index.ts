/**
 * Toaster Component
 * 
 * A pre-configured toast container that handles rendering toast notifications
 * throughout the application. This component should be included once in your application,
 * typically in a layout or root component.
 * 
 * Features:
 * - Automatic toast rendering and management
 * - Support for multiple concurrent toasts
 * - Animated enter/exit transitions
 * - Accessible by default
 * 
 * @example
 * ```tsx
 * // In your layout component
 * import { Toaster } from '@/components/ui/toaster';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         {children}
 *         <Toaster />
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // In any component where you want to show a toast
 * import { useToast } from '@/hooks/use-toast.hook';
 * 
 * export function SubmitButton() {
 *   const { toast } = useToast();
 *   
 *   return (
 *     <button
 *       onClick={() => {
 *         toast({
 *           title: "Form submitted",
 *           description: "We've received your submission",
 *         });
 *       }}
 *     >
 *       Submit
 *     </button>
 *   );
 * }
 * ```
 */

import { Toaster } from './toaster';

export * from './toaster';
export * from './toaster.types';

export default Toaster;
