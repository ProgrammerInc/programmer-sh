'use client';

import { memo } from 'react';
import { Toaster as Sonner } from 'sonner';

import styles from './sonner.module.css';
import { ToasterProps } from './sonner.types';

/**
 * Toaster Component - Displays toast notifications based on Sonner
 *
 * Features:
 * - Customized styling consistent with the application theme
 * - Supports all features from Sonner including positioning, animations and customization
 * - Properly themed for dark mode by default
 * - Accessible notifications with proper focus management
 *
 * @see {@link https://sonner.emilkowal.ski/ Sonner Documentation}
 *
 * @example
 * ```tsx
 * // Basic usage (typically added at the root of your app)
 * import { Toaster } from '@/components/ui/sonner';
 *
 * export default function RootLayout() {
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
 * // Using the toast API in components
 * import { toast } from 'sonner';
 *
 * export default function MyComponent() {
 *   return (
 *     <Button
 *       onClick={() => toast('Event has been created')}
 *     >
 *       Create Event
 *     </Button>
 *   );
 * }
 * ```
 */
const Toaster = memo(function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className={styles.toaster}
      toastOptions={{
        classNames: {
          toast: styles.toast,
          description: styles.description,
          actionButton: styles['action-button'],
          cancelButton: styles['cancel-button']
        }
      }}
      {...props}
    />
  );
});

Toaster.displayName = 'Toaster';

export { Toaster };
export default Toaster;
