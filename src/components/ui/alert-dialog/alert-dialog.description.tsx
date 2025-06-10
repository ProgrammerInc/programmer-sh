/* eslint-disable no-secrets/no-secrets */
/**
 * Alert Dialog Description Component
 *
 * The description of the alert dialog.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './alert-dialog.module.css';
import { AlertDialogDescriptionProps } from './alert-dialog.types';

/**
 * AlertDialogDescription component
 *
 * Provides additional details about the purpose of the alert dialog.
 *
 * @example
 * ```tsx
 * <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 * ```
 */
export const AlertDialogDescription = memo(
  React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Description>,
    AlertDialogDescriptionProps
  >(({ className, ...props }, ref) => {
    const descriptionClassName = useMemo(() => {
      return cn(styles.description, className);
    }, [className]);

    return (
      <AlertDialogPrimitive.Description ref={ref} className={descriptionClassName} {...props} />
    );
  })
);

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

export default AlertDialogDescription;
