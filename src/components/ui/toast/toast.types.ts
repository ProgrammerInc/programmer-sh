import * as ToastPrimitives from '@radix-ui/react-toast';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

/**
 * Props for the ToastProvider component
 */
export type ToastProviderProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Provider>;

/**
 * Props for the ToastViewport component
 */
export type ToastViewportProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>;

/**
 * Variants for the Toast component styling
 */
export interface ToastVariants {
  variant?: 'default' | 'destructive';
}

/**
 * Props for the Toast root component
 */
export type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & 
  VariantProps<(props: { variant: ToastVariants['variant'] }) => string>;

/**
 * Props for the ToastAction component
 */
export type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>;

/**
 * Props for the ToastClose component
 */
export type ToastCloseProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>;

/**
 * Props for the ToastTitle component
 */
export type ToastTitleProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>;

/**
 * Props for the ToastDescription component
 */
export type ToastDescriptionProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>;

/**
 * Type for toast action elements
 */
export type ToastActionElement = React.ReactElement<ToastActionProps>;
