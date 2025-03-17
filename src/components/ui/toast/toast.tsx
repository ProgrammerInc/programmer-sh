'use client';

import { cn } from '@/utils/app.utils';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastRootProps,
  ToastTitleProps,
  ToastViewportProps
} from './toast.types';
import { toastVariants } from './toast.variants';

/**
 * Toast provider component that manages toast notifications
 */
const ToastProvider = memo(ToastPrimitives.Provider);

/**
 * Toast viewport component that displays all active toasts
 * 
 * @example
 * ```tsx
 * <ToastProvider>
 *   <ToastViewport />
 *   // Your app content
 * </ToastProvider>
 * ```
 */
const ToastViewport = memo(React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => {
  const viewportClassName = useMemo(() => {
    return cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    );
  }, [className]);

  return (
    <ToastPrimitives.Viewport
      className={viewportClassName}
      ref={ref}
      {...props}
    />
  );
}));

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/**
 * Toast component for displaying notifications
 * 
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Title</ToastTitle>
 *   <ToastDescription>Description</ToastDescription>
 * </Toast>
 * ```
 */
const Toast = memo(React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastRootProps
>(({ className, variant, ...props }, ref) => {
  const toastClassName = useMemo(() => {
    return cn(toastVariants({ variant }), className);
  }, [className, variant]);

  return (
    <ToastPrimitives.Root
      className={toastClassName}
      ref={ref}
      {...props}
    />
  );
}));

Toast.displayName = ToastPrimitives.Root.displayName;

/**
 * Toast action component for interactive elements within a toast
 * 
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Title</ToastTitle>
 *   <ToastDescription>Description</ToastDescription>
 *   <ToastAction altText="Action">Action</ToastAction>
 * </Toast>
 * ```
 */
const ToastAction = memo(React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  ToastActionProps
>(({ className, ...props }, ref) => {
  const actionClassName = useMemo(() => {
    return cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    );
  }, [className]);

  return (
    <ToastPrimitives.Action
      className={actionClassName}
      ref={ref}
      {...props}
    />
  );
}));

ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * Toast close button component
 * 
 * @example
 * ```tsx
 * <Toast>
 *   <ToastClose />
 *   <ToastTitle>Title</ToastTitle>
 *   <ToastDescription>Description</ToastDescription>
 * </Toast>
 * ```
 */
const ToastClose = memo(React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  ToastCloseProps
>(({ className, ...props }, ref) => {
  const closeClassName = useMemo(() => {
    return cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    );
  }, [className]);

  return (
    <ToastPrimitives.Close
      className={closeClassName}
      ref={ref}
      toast-close=""
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  );
}));

ToastClose.displayName = ToastPrimitives.Close.displayName;

/**
 * Toast title component for the heading of a toast
 * 
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Title</ToastTitle>
 * </Toast>
 * ```
 */
const ToastTitle = memo(React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => {
  const titleClassName = useMemo(() => {
    return cn('text-sm font-semibold', className);
  }, [className]);

  return (
    <ToastPrimitives.Title 
      className={titleClassName} 
      ref={ref} 
      {...props} 
    />
  );
}));

ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * Toast description component for the body content of a toast
 * 
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Title</ToastTitle>
 *   <ToastDescription>Description</ToastDescription>
 * </Toast>
 * ```
 */
const ToastDescription = memo(React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  ToastDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName = useMemo(() => {
    return cn('text-sm opacity-90', className);
  }, [className]);

  return (
    <ToastPrimitives.Description
      className={descriptionClassName}
      ref={ref}
      {...props}
    />
  );
}));

ToastDescription.displayName = ToastPrimitives.Description.displayName;

/**
 * Types for creating toast elements programmatically
 */
export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
};

export default Toast;
