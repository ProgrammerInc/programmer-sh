import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

/**
 * Drawer root component props
 */
export type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

/**
 * DrawerTrigger component props
 */
export type DrawerTriggerProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>;

/**
 * DrawerPortal component props
 */
export type DrawerPortalProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>;

/**
 * DrawerClose component props
 */
export type DrawerCloseProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>;

/**
 * DrawerOverlay component props
 */
export type DrawerOverlayProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;

/**
 * DrawerContent component props
 */
export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;

/**
 * DrawerHeader component props
 */
export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DrawerFooter component props
 */
export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DrawerTitle component props
 */
export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;

/**
 * DrawerDescription component props
 */
export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>;
