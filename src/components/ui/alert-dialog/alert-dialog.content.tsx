/* eslint-disable no-secrets/no-secrets */
/**
 * Alert Dialog Content Component
 *
 * The component that contains the content of the alert dialog.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './alert-dialog.module.css';
import AlertDialogOverlay from './alert-dialog.overlay';
import AlertDialogPortal from './alert-dialog.portal';
import { AlertDialogContentProps } from './alert-dialog.types';

/**
 * AlertDialogContent component
 *
 * Contains the main content of the alert dialog.
 *
 * @example
 * ```tsx
 * <AlertDialogContent>
 *   <AlertDialogHeader>
 *     <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *     <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 *   </AlertDialogHeader>
 *   <AlertDialogFooter>
 *     <AlertDialogCancel>Cancel</AlertDialogCancel>
 *     <AlertDialogAction>Continue</AlertDialogAction>
 *   </AlertDialogFooter>
 * </AlertDialogContent>
 * ```
 */
export const AlertDialogContent = memo(
  React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Content>, AlertDialogContentProps>(
    ({ className, ...props }, ref) => {
      const contentClassName = useMemo(() => {
        return cn(styles.content, className);
      }, [className]);

      return (
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogPrimitive.Content ref={ref} className={contentClassName} {...props} />
        </AlertDialogPortal>
      );
    }
  )
);

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

export default AlertDialogContent;
