/**
 * Type definitions for Alert Dialog components
 */

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';

/**
 * Props for AlertDialog components
 */
export type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>;

/**
 * Props for AlertDialogTrigger component
 */
export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Trigger
>;

/**
 * Props for AlertDialogPortal component
 */
export type AlertDialogPortalProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Portal
>;

/**
 * Props for AlertDialogOverlay component
 */
export type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Overlay
>;

/**
 * Props for AlertDialogContent component
 */
export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
>;

/**
 * Props for AlertDialogHeader component
 */
export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for AlertDialogFooter component
 */
export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for AlertDialogTitle component
 */
export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Title
>;

/**
 * Props for AlertDialogDescription component
 */
export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Description
>;

/**
 * Props for AlertDialogAction component
 */
export type AlertDialogActionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
>;

/**
 * Props for AlertDialogCancel component
 */
export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
>;
