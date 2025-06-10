'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './dialog.module.css';
import {
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogTitleProps
} from './dialog.types';

/**
 * Dialog Root Component
 * Provides state for the dialog component and manages its open state
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogTitle>Dialog Title</DialogTitle>
 *     <DialogDescription>Dialog Description</DialogDescription>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const DialogRoot = memo(DialogPrimitive.Root);
DialogRoot.displayName = 'Dialog';

/**
 * Dialog Trigger Component
 * Button that opens the dialog when clicked
 *
 * @example
 * ```tsx
 * <DialogTrigger>Open Dialog</DialogTrigger>
 * ```
 */
const DialogTrigger = memo(DialogPrimitive.Trigger);
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

/**
 * Dialog Portal Component
 * Portals its children into the document.body
 *
 * @example
 * ```tsx
 * <DialogPortal>
 *   <DialogOverlay />
 *   <DialogContent>...</DialogContent>
 * </DialogPortal>
 * ```
 */
const DialogPortal = memo(({ ...props }: DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
));
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

/**
 * Dialog Overlay Component
 * Covers the viewport when the dialog is open
 *
 * @example
 * ```tsx
 * <DialogOverlay />
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

/**
 * Dialog Content Component
 * Contains the content for the dialog
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
            <DialogPrimitive.Close className={styles['dialog-close']}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPortal>
      );
    }
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

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

/**
 * Dialog Title Component
 * The title of the dialog
 *
 * @example
 * ```tsx
 * <DialogTitle>Dialog Title</DialogTitle>
 * ```
 */
const DialogTitle = memo(
  React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
    ({ className, ...props }, ref) => {
      const titleClassName = useMemo(() => {
        return cn(styles['dialog-title'], className);
      }, [className]);

      return <DialogPrimitive.Title ref={ref} className={titleClassName} {...props} />;
    }
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Dialog Description Component
 * The description of the dialog
 *
 * @example
 * ```tsx
 * <DialogDescription>Dialog Description</DialogDescription>
 * ```
 */
const DialogDescription = memo(
  React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, DialogDescriptionProps>(
    ({ className, ...props }, ref) => {
      const descriptionClassName = useMemo(() => {
        return cn(styles['dialog-description'], className);
      }, [className]);

      return <DialogPrimitive.Description ref={ref} className={descriptionClassName} {...props} />;
    }
  )
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/**
 * Dialog Close Component
 * Button that closes the dialog when clicked
 *
 * @example
 * ```tsx
 * <DialogClose>Close</DialogClose>
 * ```
 */
const DialogClose = memo(DialogPrimitive.Close);
DialogClose.displayName = DialogPrimitive.Close.displayName;

export {
  DialogRoot as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};

export default DialogRoot;
