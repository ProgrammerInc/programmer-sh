'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
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
 */
const DialogRoot = memo(DialogPrimitive.Root);
DialogRoot.displayName = 'Dialog';

/**
 * Dialog Trigger Component
 * Button that opens the dialog when clicked
 */
const DialogTrigger = memo(DialogPrimitive.Trigger);
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

/**
 * Dialog Portal Component
 * Portals its children into the document.body
 */
const DialogPortal = memo(({ ...props }: DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
));
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

/**
 * Dialog Overlay Component
 * Covers the viewport when the dialog is open
 */
const DialogOverlay = memo(React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => {
  const overlayClassName = useMemo(() => {
    return cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
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

/**
 * Dialog Content Component
 * Contains the content for the dialog
 */
const DialogContent = memo(React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
      className
    );
  }, [className]);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={contentClassName}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Dialog Header Component
 * Container for the dialog title and description
 */
const DialogHeader = memo(({
  className,
  ...props
}: DialogHeaderProps) => {
  const headerClassName = useMemo(() => {
    return cn('flex flex-col space-y-1.5 text-center sm:text-left', className);
  }, [className]);

  return <div className={headerClassName} {...props} />;
});
DialogHeader.displayName = 'DialogHeader';

/**
 * Dialog Footer Component
 * Container for the dialog actions
 */
const DialogFooter = memo(({
  className,
  ...props
}: DialogFooterProps) => {
  const footerClassName = useMemo(() => {
    return cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className);
  }, [className]);

  return <div className={footerClassName} {...props} />;
});
DialogFooter.displayName = 'DialogFooter';

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

/**
 * Dialog Close Component
 * Button that closes the dialog when clicked
 */
const DialogClose = memo(DialogPrimitive.Close);
DialogClose.displayName = DialogPrimitive.Close.displayName;

export {
  DialogRoot as Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogPortal,
  DialogOverlay
};

export default DialogRoot;
