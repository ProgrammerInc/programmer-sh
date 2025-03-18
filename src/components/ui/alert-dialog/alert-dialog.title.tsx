/**
 * Alert Dialog Title Component
 *
 * The title of the alert dialog.
 */

'use client';

import { cn } from '@/utils/app.utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './alert-dialog.module.css';
import { AlertDialogTitleProps } from './alert-dialog.types';

/**
 * AlertDialogTitle component
 * 
 * Displays the main title of the alert dialog.
 * 
 * @example
 * ```tsx
 * <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 * ```
 */
export const AlertDialogTitle = memo(React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => {
  const titleClassName = useMemo(() => {
    return cn(styles.title, className);
  }, [className]);

  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={titleClassName}
      {...props}
    />
  );
}));

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

export default AlertDialogTitle;
