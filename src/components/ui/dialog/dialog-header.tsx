'use client';

import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './dialog.module.css';
import { DialogHeaderProps } from './dialog.types';

/**
 * Dialog Header Component
 * Container for the dialog title and description
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Dialog Title</DialogTitle>
 *   <DialogDescription>Dialog Description</DialogDescription>
 * </DialogHeader>
 * ```
 */
const DialogHeader = memo(({ className, ...props }: DialogHeaderProps) => {
  const headerClassName = useMemo(() => {
    return cn(styles['dialog-header'], className);
  }, [className]);

  return <div className={headerClassName} {...props} />;
});

DialogHeader.displayName = 'DialogHeader';

export { DialogHeader };
export default DialogHeader;
