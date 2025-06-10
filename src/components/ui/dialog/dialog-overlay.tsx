'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './dialog.module.css';
import { DialogOverlayProps } from './dialog.types';

/**
 * Dialog Overlay Component
 * The overlay that covers the screen behind the dialog
 *
 * @example
 * ```tsx
 * <DialogPortal>
 *   <DialogOverlay />
 *   <DialogContent>...</DialogContent>
 * </DialogPortal>
 * ```
 */
const DialogOverlay = memo(
  React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, DialogOverlayProps>(
    ({ className, ...props }, ref) => {
      const overlayClassName = useMemo(() => {
        return cn(styles['dialog-overlay'], className);
      }, [className]);

      return <DialogPrimitive.Overlay ref={ref} className={overlayClassName} {...props} />;
    }
  )
);

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export { DialogOverlay };
export default DialogOverlay;
