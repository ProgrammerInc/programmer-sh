'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { DialogOverlayProps } from './dialog.types';

/**
 * Dialog Overlay Component
 * The overlay that covers the screen behind the dialog
 */
const DialogOverlay = memo(React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => {
  const overlayClassName = useMemo(() => {
    return cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    );
  }, [className]);

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={overlayClassName}
      {...props}
    />
  );
}));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export { DialogOverlay };
export default DialogOverlay;
