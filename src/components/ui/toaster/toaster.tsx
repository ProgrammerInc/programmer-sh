'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast/toast';
import { useToast } from '@/hooks/use-toast.hook';
import { memo } from 'react';
import styles from './toaster.module.css';
import { ToasterProps } from './toaster.types';

/**
 * Toaster Component
 *
 * A pre-configured toast container that handles rendering multiple toasts.
 * Uses the useToast hook to manage toast state and animations.
 *
 * Features:
 * - Automatic toast display and management
 * - Supports title and description
 * - Supports custom actions
 * - Includes close button
 * - Automatic stacking for multiple toasts
 *
 * @example
 * ```tsx
 * // Import in your layout or root component
 * import { Toaster } from '@/components/ui/toaster';
 * import { useToast } from '@/hooks/use-toast.hook';
 *
 * // In your component
 * const { toast } = useToast();
 *
 * // Create a toast
 * toast({
 *   title: "Success",
 *   description: "Your operation was completed successfully",
 * });
 *
 * // In your layout
 * return (
 *   <>
 *     <YourApp />
 *     <Toaster />
 *   </>
 * );
 * ```
 */
export const Toaster = memo(function Toaster({ className, ...props }: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className={styles['toast-content']}>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
});

Toaster.displayName = 'Toaster';

export default Toaster;
