'use client';

import { cn } from '@/utils/app.utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './sheet.module.css';
import {
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetTitleProps
} from './sheet.types';

/**
 * Sheet Component
 *
 * A modal dialog that slides in from the edge of the screen. Based on Radix UI's Dialog primitive.
 *
 * Features:
 * - Can appear from different directions (top, bottom, left, right)
 * - Includes overlay that dims the background
 * - Supports header, content, and footer sections
 * - Fully accessible with keyboard navigation and screen reader support
 * - Animated entrance and exit
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
 * Sheet Trigger Component
 *
 * The button that opens the sheet dialog when clicked.
 *
 * @example
 * ```tsx
 * <SheetTrigger>Open Sheet</SheetTrigger>
 * ```
 */
const SheetTrigger = memo(SheetPrimitive.Trigger) as typeof SheetPrimitive.Trigger;
SheetTrigger.displayName = SheetPrimitive.Trigger.displayName;

/**
 * Sheet Close Component
 *
 * The button that closes the sheet dialog when clicked.
 *
 * @example
 * ```tsx
 * <SheetClose>Close Sheet</SheetClose>
 * ```
 */
const SheetClose = memo(SheetPrimitive.Close) as typeof SheetPrimitive.Close;
SheetClose.displayName = SheetPrimitive.Close.displayName;

/**
 * Sheet Portal Component
 *
 * Renders sheet content in a portal, ensuring it appears above other content
 * regardless of the DOM hierarchy.
 *
 * @example
 * ```tsx
 * <SheetPortal>
 *   <SheetOverlay />
 *   <SheetContent>...</SheetContent>
 * </SheetPortal>
 * ```
 */
const SheetPortal = memo(({ ...props }) => <SheetPrimitive.Portal {...props} />);
SheetPortal.displayName = 'SheetPortal';

/**
 * Sheet Overlay Component
 *
 * The semi-transparent backdrop that appears behind the sheet content.
 * Darkens the background and helps focus attention on the sheet content.
 *
 * @example
 * ```tsx
 * <SheetOverlay className="custom-overlay-class" />
 * ```
 */
const SheetOverlay = memo(
  React.forwardRef<React.ElementRef<typeof SheetPrimitive.Overlay>, SheetOverlayProps>(
    ({ className, ...props }, ref) => {
      const overlayClassName = useMemo(() => {
        return cn(styles.overlay, className);
      }, [className]);

      return <SheetPrimitive.Overlay className={overlayClassName} ref={ref} {...props} />;
    }
  )
);

SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

/**
 * Sheet Content Component
 *
 * The main container for sheet content. Supports different positions (sides).
 * Includes a close button in the top-right corner.
 *
 * @example
 * ```tsx
 * // Default (right side)
 * <SheetContent>
 *   Content here
 * </SheetContent>
 *
 * // From the left side
 * <SheetContent side="left">
 *   Content here
 * </SheetContent>
 *
 * // From the top
 * <SheetContent side="top">
 *   Content here
 * </SheetContent>
 *
 * // From the bottom
 * <SheetContent side="bottom">
 *   Content here
 * </SheetContent>
 * ```
 */
const SheetContent = memo(
  React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
    ({ side = 'right', className, children, ...props }, ref) => {
      const contentClassName = useMemo(() => {
        const sideClass = {
          top: styles['content-top'],
          bottom: styles['content-bottom'],
          left: styles['content-left'],
          right: styles['content-right']
        }[side];

        return cn(styles.content, sideClass, className);
      }, [side, className]);

      return (
        <SheetPortal>
          <SheetOverlay />
          <SheetPrimitive.Content ref={ref} className={contentClassName} {...props}>
            {children}
            <SheetPrimitive.Close className={styles['close-button']}>
              <X className={styles['close-icon']} />
              <span className={styles['sr-only']}>Close</span>
            </SheetPrimitive.Close>
          </SheetPrimitive.Content>
        </SheetPortal>
      );
    }
  )
);

SheetContent.displayName = SheetPrimitive.Content.displayName;

/**
 * Sheet Header Component
 *
 * Container for the sheet title and description at the top of the sheet.
 * Typically contains SheetTitle and SheetDescription components.
 *
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Settings</SheetTitle>
 *   <SheetDescription>Manage your profile settings.</SheetDescription>
 * </SheetHeader>
 * ```
 */
const SheetHeader = memo(({ className, ...props }: SheetHeaderProps) => {
  const headerClassName = useMemo(() => {
    return cn(styles.header, className);
  }, [className]);

  return <div className={headerClassName} {...props} />;
});

SheetHeader.displayName = 'SheetHeader';

/**
 * Sheet Footer Component
 *
 * Container for buttons and actions at the bottom of the sheet.
 * On mobile, buttons are stacked and reversed; on desktop, they're aligned in a row.
 *
 * @example
 * ```tsx
 * <SheetFooter>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save Changes</Button>
 * </SheetFooter>
 * ```
 */
const SheetFooter = memo(({ className, ...props }: SheetFooterProps) => {
  const footerClassName = useMemo(() => {
    return cn(styles.footer, className);
  }, [className]);

  return <div className={footerClassName} {...props} />;
});

SheetFooter.displayName = 'SheetFooter';

/**
 * Sheet Title Component
 *
 * The title of the sheet. Automatically connected to the sheet content via aria-labelledby.
 *
 * @example
 * ```tsx
 * <SheetTitle>Edit Profile</SheetTitle>
 * ```
 */
const SheetTitle = memo(
  React.forwardRef<React.ElementRef<typeof SheetPrimitive.Title>, SheetTitleProps>(
    ({ className, ...props }, ref) => {
      const titleClassName = useMemo(() => {
        return cn(styles.title, className);
      }, [className]);

      return <SheetPrimitive.Title ref={ref} className={titleClassName} {...props} />;
    }
  )
);

SheetTitle.displayName = SheetPrimitive.Title.displayName;

/**
 * Sheet Description Component
 *
 * The description of the sheet. Automatically connected to the sheet content via aria-describedby.
 *
 * @example
 * ```tsx
 * <SheetDescription>
 *   Make changes to your profile here. Click save when you're done.
 * </SheetDescription>
 * ```
 */
const SheetDescription = memo(
  React.forwardRef<React.ElementRef<typeof SheetPrimitive.Description>, SheetDescriptionProps>(
    ({ className, ...props }, ref) => {
      const descriptionClassName = useMemo(() => {
        return cn(styles.description, className);
      }, [className]);

      return <SheetPrimitive.Description ref={ref} className={descriptionClassName} {...props} />;
    }
  )
);

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
