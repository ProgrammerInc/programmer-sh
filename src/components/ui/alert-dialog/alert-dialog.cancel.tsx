/**
 * Alert Dialog Cancel Component
 *
 * The component for the cancel button in the alert dialog.
 */

'use client';

import { buttonVariants } from '@/components/ui/button/button.variants';
import { cn } from '@/utils/app.utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './alert-dialog.module.css';
import { AlertDialogCancelProps } from './alert-dialog.types';

/**
 * AlertDialogCancel component
 *
 * The cancel button in the alert dialog.
 *
 * @example
 * ```tsx
 * <AlertDialogCancel>Cancel</AlertDialogCancel>
 * ```
 */
export const AlertDialogCancel = memo(
  React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Cancel>, AlertDialogCancelProps>(
    ({ className, ...props }, ref) => {
      const cancelClassName = useMemo(() => {
        return cn(buttonVariants({ variant: 'outline' }), styles.cancel, className);
      }, [className]);

      return <AlertDialogPrimitive.Cancel ref={ref} className={cancelClassName} {...props} />;
    }
  )
);

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export default AlertDialogCancel;
