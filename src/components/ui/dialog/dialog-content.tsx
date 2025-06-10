'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { DialogClose } from './dialog-close';
import { DialogOverlay } from './dialog-overlay';
import { DialogPortal } from './dialog-portal';
import styles from './dialog.module.css';
import { DialogContentProps } from './dialog.types';

/**
 * Dialog Content Component
 * The container for the dialog content
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogTitle>Dialog Title</DialogTitle>
 *   <DialogDescription>Dialog Description</DialogDescription>
 * </DialogContent>
 * ```
 */
const DialogContent = memo(
  React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
    ({ className, children, ...props }, ref) => {
      const contentClassName = useMemo(() => {
        return cn(styles['dialog-content'], className);
      }, [className]);

      return (
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content ref={ref} className={contentClassName} {...props}>
            {children}
            <DialogClose className={styles['dialog-close']}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogPrimitive.Content>
        </DialogPortal>
      );
    }
  )
);

DialogContent.displayName = DialogPrimitive.Content.displayName;

export { DialogContent };
export default DialogContent;
