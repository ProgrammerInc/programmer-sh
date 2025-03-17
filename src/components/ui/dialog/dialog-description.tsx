'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { DialogDescriptionProps } from './dialog.types';

/**
 * Dialog Description Component
 * The description of the dialog
 */
const DialogDescription = memo(React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName = useMemo(() => {
    return cn('text-sm text-muted-foreground', className);
  }, [className]);

  return (
    <DialogPrimitive.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  );
}));

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { DialogDescription };
export default DialogDescription;
