'use client';

import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './dialog.module.css';
import { DialogFooterProps } from './dialog.types';

/**
 * Dialog Footer Component
 * Container for the dialog actions
 *
 * @example
 * ```tsx
 * <DialogFooter>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Continue</Button>
 * </DialogFooter>
 * ```
 */
const DialogFooter = memo(({ className, ...props }: DialogFooterProps) => {
  const footerClassName = useMemo(() => {
    return cn(styles['dialog-footer'], className);
  }, [className]);

  return <div className={footerClassName} {...props} />;
});

DialogFooter.displayName = 'DialogFooter';

export { DialogFooter };
export default DialogFooter;
