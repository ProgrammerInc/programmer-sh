'use client';

import * as ToastPrimitives from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import * as React from 'react';
import { memo } from 'react';

import styles from './toast.module.css';
import {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastRootProps,
  ToastTitleProps,
  ToastViewportProps
} from './toast.types';

/**
 * Toast provider component that manages toast notifications
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <ToastViewport />
 *   {children}
 * </ToastProvider>
 * ```
 */
const ToastProvider = memo(ToastPrimitives.Provider);
ToastProvider.displayName = 'ToastProvider';

/**
 * Toast viewport component that displays all active toasts
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <ToastViewport />
 *   {children}
 * </ToastProvider>
 * ```
 */
const ToastViewport = memo(
  React.forwardRef<React.ElementRef<typeof ToastPrimitives.Viewport>, ToastViewportProps>(
    ({ className, ...props }, ref) => {
      return (
        <ToastPrimitives.Viewport
          className={className ? `${styles.viewport} ${className}` : styles.viewport}
          ref={ref}
          {...props}
        />
      );
    }
  )
);

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/**
 * Toast component for displaying notifications
 *
 * Features:
 * - Multiple variants (default, destructive)
 * - Customizable duration
 * - Support for actions and close button
 * - Swipe to dismiss
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Title</ToastTitle>
 *   <ToastDescription>Description</ToastDescription>
 *   <ToastAction altText="Action">Action</ToastAction>
 *   <ToastClose />
 * </Toast>
 * ```
 */
const Toast = memo(
  React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastRootProps>(
    ({ className, variant, ...props }, ref) => {
      const variantClass = variant === 'destructive' ? styles.destructive : styles.default;

      return (
        <ToastPrimitives.Root
          className={
            className
              ? `${styles.toast} ${variantClass} ${className}`
              : `${styles.toast} ${variantClass}`
          }
          ref={ref}
          {...props}
        />
      );
    }
  )
);

Toast.displayName = ToastPrimitives.Root.displayName;

/**
 * Toast action component for interactive elements within a toast
 *
 * Features:
 * - Proper styling for all toast variants
 * - Focus and hover states
 * - Accessibility support with altText
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Title</ToastTitle>
 *   <ToastDescription>Description</ToastDescription>
 *   <ToastAction altText="Action Label">Action</ToastAction>
 * </Toast>
 * ```
 */
const ToastAction = memo(
  React.forwardRef<React.ElementRef<typeof ToastPrimitives.Action>, ToastActionProps>(
    ({ className, ...props }, ref) => {
      return (
        <ToastPrimitives.Action
          className={className ? `${styles.action} ${className}` : styles.action}
          ref={ref}
          {...props}
        />
      );
    }
  )
);

ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * Toast close button component
 *
 * Features:
 * - Hidden by default, appears on hover
 * - Proper focus states
 * - Automatically closes parent toast
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
const ToastClose = memo(
  React.forwardRef<React.ElementRef<typeof ToastPrimitives.Close>, ToastCloseProps>(
    ({ className, ...props }, ref) => {
      return (
        <ToastPrimitives.Close
          className={className ? `${styles.close} ${className}` : styles.close}
          ref={ref}
          toast-close=""
          {...props}
        >
          <X className="h-4 w-4" />
        </ToastPrimitives.Close>
      );
    }
  )
);

ToastClose.displayName = ToastPrimitives.Close.displayName;

/**
 * Toast title component for the heading of a toast
 *
 * Features:
 * - Proper styling and font weight
 * - Accessibility support as a heading element
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>New message</ToastTitle>
 *   <ToastDescription>You have 3 unread messages</ToastDescription>
 * </Toast>
 * ```
 */
const ToastTitle = memo(
  React.forwardRef<React.ElementRef<typeof ToastPrimitives.Title>, ToastTitleProps>(
    ({ className, ...props }, ref) => {
      return (
        <ToastPrimitives.Title
          className={className ? `${styles.title} ${className}` : styles.title}
          ref={ref}
          {...props}
        />
      );
    }
  )
);

ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * Toast description component for the body content of a toast
 *
 * Features:
 * - Proper styling with reduced opacity
 * - Accessibility support as descriptive content
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>New message</ToastTitle>
 *   <ToastDescription>You have 3 unread messages from John Doe</ToastDescription>
 * </Toast>
 * ```
 */
const ToastDescription = memo(
  React.forwardRef<React.ElementRef<typeof ToastPrimitives.Description>, ToastDescriptionProps>(
    ({ className, ...props }, ref) => {
      return (
        <ToastPrimitives.Description
          className={className ? `${styles.description} ${className}` : styles.description}
          ref={ref}
          {...props}
        />
      );
    }
  )
);

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
