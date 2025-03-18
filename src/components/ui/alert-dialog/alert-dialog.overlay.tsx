/**
 * Alert Dialog Overlay Component
 *
 * The overlay that covers the main content when the alert dialog is open.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './alert-dialog.module.css';
import { AlertDialogOverlayProps } from './alert-dialog.types';

/**
 * AlertDialogOverlay component
 * 
 * Creates a visual overlay behind the alert dialog to emphasize its modal nature.
 * 
 * @example
 * ```tsx
 * <AlertDialogPortal>
 *   <AlertDialogOverlay />
 *   <AlertDialogContent>...</AlertDialogContent>
 * </AlertDialogPortal>
 * ```
 */
export const AlertDialogOverlay = memo(React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => {
  const overlayClassName = useMemo(() => {
    return cn(styles.overlay, className);
  }, [className]);

  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={overlayClassName}
      {...props}
    />
  );
}));

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

export default AlertDialogOverlay;
