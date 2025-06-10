/* eslint-disable no-secrets/no-secrets */
/**
 * Alert Dialog Header Component
 *
 * A component to group the title and description of an alert dialog.
 */

'use client';

import { cn } from '@/utils/app.utils';
import { memo, useMemo } from 'react';

import styles from './alert-dialog.module.css';
import { AlertDialogHeaderProps } from './alert-dialog.types';

/**
 * AlertDialogHeader component
 *
 * A layout component that wraps the title and description of an alert dialog.
 *
 * @example
 * ```tsx
 * <AlertDialogHeader>
 *   <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *   <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 * </AlertDialogHeader>
 * ```
 */
export const AlertDialogHeader = memo<AlertDialogHeaderProps>(({ className, ...props }) => {
  const headerClassName = useMemo(() => {
    return cn(styles.header, className);
  }, [className]);

  return <div className={headerClassName} {...props} />;
});

AlertDialogHeader.displayName = 'AlertDialogHeader';

export default AlertDialogHeader;
