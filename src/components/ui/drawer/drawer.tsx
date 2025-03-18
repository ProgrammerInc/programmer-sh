'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/utils/app.utils';
import styles from './drawer.module.css';
import {
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerPortalProps,
  DrawerProps,
  DrawerTitleProps,
  DrawerTriggerProps
} from './drawer.types';

/**
 * Drawer component
 * 
 * A Drawer is a panel that slides out from the edge of the screen,
 * similar to a sidebar or a dialog but with a sliding animation.
 * 
 * @example
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger>Open</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Title</DrawerTitle>
 *       <DrawerDescription>Description</DrawerDescription>
 *     </DrawerHeader>
 *     <div className="p-4">Content</div>
 *     <DrawerFooter>
 *       <Button>Action</Button>
 *       <DrawerClose asChild>
 *         <Button variant="outline">Cancel</Button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
const Drawer = memo(function Drawer({ shouldScaleBackground = true, ...props }: DrawerProps) {
  return <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />;
});

Drawer.displayName = 'Drawer';

/**
 * DrawerTrigger component
 * 
 * Element that triggers the drawer to open when clicked.
 * 
 * @example
 * ```tsx
 * <DrawerTrigger asChild>
 *   <Button>Open drawer</Button>
 * </DrawerTrigger>
 * ```
 */
const DrawerTrigger = memo(DrawerPrimitive.Trigger) as typeof DrawerPrimitive.Trigger;
DrawerTrigger.displayName = DrawerPrimitive.Trigger.displayName;

/**
 * DrawerPortal component
 * 
 * Portals the drawer content into the body.
 * 
 * @example
 * ```tsx
 * <DrawerPortal>
 *   <DrawerOverlay />
 *   <DrawerContent>...</DrawerContent>
 * </DrawerPortal>
 * ```
 */
const DrawerPortal = memo(function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal {...props} />;
});
DrawerPortal.displayName = 'DrawerPortal';

/**
 * DrawerClose component
 * 
 * Element that closes the drawer when clicked.
 * 
 * @example
 * ```tsx
 * <DrawerClose asChild>
 *   <Button variant="outline">Cancel</Button>
 * </DrawerClose>
 * ```
 */
const DrawerClose = memo(DrawerPrimitive.Close) as typeof DrawerPrimitive.Close;
DrawerClose.displayName = DrawerPrimitive.Close.displayName;

/**
 * DrawerOverlay component
 * 
 * Covers the viewport when the drawer is open.
 * 
 * @example
 * ```tsx
 * <DrawerOverlay />
 * ```
 */
const DrawerOverlay = memo(React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  DrawerOverlayProps
>(function DrawerOverlay({ className, ...props }, ref) {
  const overlayClassName = useMemo(() => {
    return cn(styles['drawer-overlay'], className);
  }, [className]);

  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={overlayClassName}
      {...props}
    />
  );
}));

DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

/**
 * DrawerContent component
 * 
 * Contains the content for the drawer.
 * 
 * @example
 * ```tsx
 * <DrawerContent>
 *   <DrawerHeader>...</DrawerHeader>
 *   <div className="p-4">Main content</div>
 *   <DrawerFooter>...</DrawerFooter>
 * </DrawerContent>
 * ```
 */
const DrawerContent = memo(React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(function DrawerContent({ className, children, ...props }, ref) {
  const contentClassName = useMemo(() => {
    return cn(styles['drawer-content'], className);
  }, [className]);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={contentClassName}
        {...props}
      >
        <div className={styles['drawer-handle']} />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}));

DrawerContent.displayName = 'DrawerContent';

/**
 * DrawerHeader component
 * 
 * Container for the drawer title and description.
 * 
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Settings</DrawerTitle>
 *   <DrawerDescription>Configure your application settings.</DrawerDescription>
 * </DrawerHeader>
 * ```
 */
const DrawerHeader = memo(function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  const headerClassName = useMemo(() => {
    return cn(styles['drawer-header'], className);
  }, [className]);

  return <div className={headerClassName} {...props} />;
});

DrawerHeader.displayName = 'DrawerHeader';

/**
 * DrawerFooter component
 * 
 * Container for the drawer actions.
 * 
 * @example
 * ```tsx
 * <DrawerFooter>
 *   <Button>Save changes</Button>
 *   <DrawerClose asChild>
 *     <Button variant="outline">Cancel</Button>
 *   </DrawerClose>
 * </DrawerFooter>
 * ```
 */
const DrawerFooter = memo(function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  const footerClassName = useMemo(() => {
    return cn(styles['drawer-footer'], className);
  }, [className]);

  return <div className={footerClassName} {...props} />;
});

DrawerFooter.displayName = 'DrawerFooter';

/**
 * DrawerTitle component
 * 
 * The title of the drawer.
 * 
 * @example
 * ```tsx
 * <DrawerTitle>Edit Profile</DrawerTitle>
 * ```
 */
const DrawerTitle = memo(React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  DrawerTitleProps
>(function DrawerTitle({ className, ...props }, ref) {
  const titleClassName = useMemo(() => {
    return cn(styles['drawer-title'], className);
  }, [className]);

  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={titleClassName}
      {...props}
    />
  );
}));

DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

/**
 * DrawerDescription component
 * 
 * The description of the drawer.
 * 
 * @example
 * ```tsx
 * <DrawerDescription>
 *   Make changes to your profile here. Click save when you're done.
 * </DrawerDescription>
 * ```
 */
const DrawerDescription = memo(React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  DrawerDescriptionProps
>(function DrawerDescription({ className, ...props }, ref) {
  const descriptionClassName = useMemo(() => {
    return cn(styles['drawer-description'], className);
  }, [className]);

  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  );
}));

DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
};

export default Drawer;
