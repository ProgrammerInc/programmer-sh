'use client';

import { cn } from '@/utils/app.utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps
} from './sheet.types';
import { sheetVariants } from './sheet.variants';

/**
 * Sheet dialog root component based on Radix UI's Dialog primitive
 * 
 * A modal dialog that is displayed at the edge of the screen
 * 
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger>Open Sheet</SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Sheet Title</SheetTitle>
 *       <SheetDescription>Sheet Description</SheetDescription>
 *     </SheetHeader>
 *     <div className="py-4">Sheet content</div>
 *     <SheetFooter>
 *       <Button>Save changes</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
const Sheet = memo(SheetPrimitive.Root);
Sheet.displayName = 'Sheet';

/**
 * Sheet trigger component for opening the sheet dialog
 * 
 * @example
 * ```tsx
 * <SheetTrigger>Open Sheet</SheetTrigger>
 * ```
 */
const SheetTrigger = memo(SheetPrimitive.Trigger) as typeof SheetPrimitive.Trigger;
SheetTrigger.displayName = SheetPrimitive.Trigger.displayName;

/**
 * Sheet close component for closing the sheet dialog
 * 
 * @example
 * ```tsx
 * <SheetClose>Close Sheet</SheetClose>
 * ```
 */
const SheetClose = memo(SheetPrimitive.Close) as typeof SheetPrimitive.Close;
SheetClose.displayName = SheetPrimitive.Close.displayName;

/**
 * Sheet portal component for rendering content outside the component hierarchy
 * 
 * @example
 * ```tsx
 * <SheetPortal>
 *   <SheetOverlay />
 *   <SheetContent>...</SheetContent>
 * </SheetPortal>
 * ```
 */
const SheetPortal = memo(({ ...props }) => (
  <SheetPrimitive.Portal {...props} />
));
SheetPortal.displayName = 'SheetPortal';

/**
 * Sheet overlay component that darkens the background when the sheet is open
 * 
 * @example
 * ```tsx
 * <SheetOverlay className="bg-black/60" />
 * ```
 */
const SheetOverlay = memo(React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  SheetOverlayProps
>(({ className, ...props }, ref) => {
  const overlayClassName = useMemo(() => {
    return cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    );
  }, [className]);

  return (
    <SheetPrimitive.Overlay
      className={overlayClassName}
      ref={ref}
      {...props}
    />
  );
}));

SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

/**
 * Sheet content component that contains the content of the sheet dialog
 * Supports different sides (top, bottom, left, right)
 * 
 * @example
 * ```tsx
 * <SheetContent side="right">
 *   Sheet content
 * </SheetContent>
 * ```
 */
const SheetContent = memo(React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => {
  const contentClassName = useMemo(() => {
    return cn(sheetVariants({ side }), className);
  }, [side, className]);

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content 
        ref={ref} 
        className={contentClassName} 
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}));

SheetContent.displayName = SheetPrimitive.Content.displayName;

/**
 * Sheet header component for organizing content at the top of the sheet
 * 
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Sheet Title</SheetTitle>
 *   <SheetDescription>Sheet Description</SheetDescription>
 * </SheetHeader>
 * ```
 */
const SheetHeader = memo(({ className, ...props }: SheetHeaderProps) => {
  const headerClassName = useMemo(() => {
    return cn('flex flex-col space-y-2 text-center sm:text-left', className);
  }, [className]);

  return <div className={headerClassName} {...props} />;
});

SheetHeader.displayName = 'SheetHeader';

/**
 * Sheet footer component for organizing content at the bottom of the sheet
 * 
 * @example
 * ```tsx
 * <SheetFooter>
 *   <Button>Save changes</Button>
 * </SheetFooter>
 * ```
 */
const SheetFooter = memo(({ className, ...props }: SheetFooterProps) => {
  const footerClassName = useMemo(() => {
    return cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className);
  }, [className]);

  return <div className={footerClassName} {...props} />;
});

SheetFooter.displayName = 'SheetFooter';

/**
 * Sheet title component for displaying a title in the sheet
 * 
 * @example
 * ```tsx
 * <SheetTitle>Sheet Title</SheetTitle>
 * ```
 */
const SheetTitle = memo(React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  SheetTitleProps
>(({ className, ...props }, ref) => {
  const titleClassName = useMemo(() => {
    return cn('text-lg font-semibold text-foreground', className);
  }, [className]);

  return (
    <SheetPrimitive.Title
      ref={ref}
      className={titleClassName}
      {...props}
    />
  );
}));

SheetTitle.displayName = SheetPrimitive.Title.displayName;

/**
 * Sheet description component for displaying additional information in the sheet
 * 
 * @example
 * ```tsx
 * <SheetDescription>Sheet Description</SheetDescription>
 * ```
 */
const SheetDescription = memo(React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName = useMemo(() => {
    return cn('text-sm text-muted-foreground', className);
  }, [className]);

  return (
    <SheetPrimitive.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  );
}));

SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger
};

export default Sheet;
