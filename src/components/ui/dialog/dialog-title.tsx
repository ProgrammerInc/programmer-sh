'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { DialogTitleProps } from './dialog.types';

/**
 * Dialog Title Component
 * The title of the dialog
 */
const DialogTitle = memo(React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => {
  const titleClassName = useMemo(() => {
    return cn('text-lg font-semibold leading-none tracking-tight', className);
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
