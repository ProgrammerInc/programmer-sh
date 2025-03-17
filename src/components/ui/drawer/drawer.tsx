'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/utils/app.utils';
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
const Drawer = memo(({ shouldScaleBackground = true, ...props }: DrawerProps) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
));

Drawer.displayName = 'Drawer';

/**
 * DrawerTrigger component
 * 
 * Element that triggers the drawer to open when clicked.
 */
const DrawerTrigger = memo(DrawerPrimitive.Trigger) as typeof DrawerPrimitive.Trigger;
DrawerTrigger.displayName = DrawerPrimitive.Trigger.displayName;

/**
 * DrawerPortal component
 * 
 * Portals the drawer content into the body.
 */
const DrawerPortal = memo(({ ...props }: DrawerPortalProps) => (
  <DrawerPrimitive.Portal {...props} />
));
DrawerPortal.displayName = 'DrawerPortal';

/**
 * DrawerClose component
 * 
 * Element that closes the drawer when clicked.
 */
const DrawerClose = memo(DrawerPrimitive.Close) as typeof DrawerPrimitive.Close;
DrawerClose.displayName = DrawerPrimitive.Close.displayName;

/**
 * DrawerOverlay component
 * 
 * Covers the viewport when the drawer is open.
 */
const DrawerOverlay = memo(React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => {
  const overlayClassName = useMemo(() => {
    return cn('fixed inset-0 z-50 bg-black/80', className);
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
 */
const DrawerContent = memo(React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(
      'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
      className
    );
  }, [className]);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={contentClassName}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
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
 */
const DrawerHeader = memo(({ className, ...props }: DrawerHeaderProps) => {
  const headerClassName = useMemo(() => {
    return cn('grid gap-1.5 p-4 text-center sm:text-left', className);
  }, [className]);

  return <div className={headerClassName} {...props} />;
});

DrawerHeader.displayName = 'DrawerHeader';

/**
 * DrawerFooter component
 * 
 * Container for the drawer actions.
 */
const DrawerFooter = memo(({ className, ...props }: DrawerFooterProps) => {
  const footerClassName = useMemo(() => {
    return cn('mt-auto flex flex-col gap-2 p-4', className);
  }, [className]);

  return <div className={footerClassName} {...props} />;
});

DrawerFooter.displayName = 'DrawerFooter';

/**
 * DrawerTitle component
 * 
 * The title of the drawer.
 */
const DrawerTitle = memo(React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => {
  const titleClassName = useMemo(() => {
    return cn('text-lg font-semibold leading-none tracking-tight', className);
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
 */
const DrawerDescription = memo(React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName = useMemo(() => {
    return cn('text-sm text-muted-foreground', className);
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
