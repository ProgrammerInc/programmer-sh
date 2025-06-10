'use client';

import * as ToastPrimitives from '@radix-ui/react-toast';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Props for the ToastProvider component
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/toast#provider Radix UI Toast Provider}
 */
export type ToastProviderProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Provider>;

/**
 * Props for the ToastViewport component
 *
 * The viewport is the container where all toast notifications will appear.
 * It is recommended to place this at the top level of your application.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/toast#viewport Radix UI Toast Viewport}
 */
export type ToastViewportProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>;

/**
 * Variants for the Toast component styling
 *
 * @property variant - The visual style to apply to the toast
 *   - default: Standard toast with background color
 *   - destructive: Error/warning toast with destructive styling
 */
export interface ToastVariants {
  variant?: 'default' | 'destructive';
}

/**
 * Props for the Toast root component
 *
 * Combines the Radix UI Toast props with variant styling options.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/toast#root Radix UI Toast Root}
 */
export type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<(props: { variant: ToastVariants['variant'] }) => string>;

/**
 * Props for the ToastAction component
 *
 * Used for interactive elements within a toast notification, such as buttons.
 *
 * @property altText - Required for accessibility, describes the action for screen readers
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/toast#action Radix UI Toast Action}
 */
export type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>;

/**
 * Props for the ToastClose component
 *
 * Renders a button that closes the toast when clicked.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/toast#close Radix UI Toast Close}
 */
export type ToastCloseProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>;

/**
 * Props for the ToastTitle component
 *
 * Renders the title content for a toast notification.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/toast#title Radix UI Toast Title}
 */
export type ToastTitleProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>;

/**
 * Props for the ToastDescription component
 *
 * Renders the description content for a toast notification.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/toast#description Radix UI Toast Description}
 */
export type ToastDescriptionProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Description
>;

/**
 * Type for toast action elements
 *
 * Used when creating toast elements programmatically.
 *
 * @example
 * ```tsx
 * toast({
 *   title: "Success",
 *   description: "Your action was completed successfully",
 *   action: <ToastAction altText="Dismiss">Dismiss</ToastAction>
 * })
 * ```
 */
export type ToastActionElement = React.ReactElement<ToastActionProps>;
