'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './dialog.module.css';
import { DialogTitleProps } from './dialog.types';

/**
 * Dialog Title Component
 * The title of the dialog
 *
 * @example
 * ```tsx
 * <DialogTitle>Dialog Title</DialogTitle>
 * ```
 */
const DialogTitle = memo(React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => {
  const titleClassName = useMemo(() => {
    return cn(styles['dialog-title'], className);
  }, [className]);

  return (
    <DialogPrimitive.Title
      ref={ref}
      className={titleClassName}
      {...props}
    />
  );
}));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

export { DialogTitle };
export default DialogTitle;
