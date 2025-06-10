/**
 * Alert Dialog Footer Component
 *
 * A component to group the action buttons of an alert dialog.
 */

'use client';

import { cn } from '@/utils/app.utils';
import { memo, useMemo } from 'react';

import styles from './alert-dialog.module.css';
import { AlertDialogFooterProps } from './alert-dialog.types';

/**
 * AlertDialogFooter component
 *
 * A layout component that wraps the action buttons of an alert dialog.
 *
 * @example
 * ```tsx
 * <AlertDialogFooter>
 *   <AlertDialogCancel>Cancel</AlertDialogCancel>
 *   <AlertDialogAction>Continue</AlertDialogAction>
 * </AlertDialogFooter>
 * ```
 */
export const AlertDialogFooter = memo<AlertDialogFooterProps>(({ className, ...props }) => {
  const footerClassName = useMemo(() => {
    return cn(styles.footer, className);
  }, [className]);

  return <div className={footerClassName} {...props} />;
});

AlertDialogFooter.displayName = 'AlertDialogFooter';

export default AlertDialogFooter;
