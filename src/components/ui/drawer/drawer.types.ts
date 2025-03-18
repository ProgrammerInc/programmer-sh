import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

/**
 * Drawer Root Component Props
 * 
 * Props for the root Drawer component.
 * 
 * @see https://vaul.emilkowal.ski/root For more information about the Vaul drawer component
 * 
 * @example
 * ```tsx
 * <Drawer shouldScaleBackground={true}>
 *   <DrawerTrigger>Open Drawer</DrawerTrigger>
 *   <DrawerContent>...</DrawerContent>
 * </Drawer>
 * ```
 */
export type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

/**
 * DrawerTrigger Component Props
 * 
 * Props for the component that opens the drawer when clicked.
 * 
 * @see https://vaul.emilkowal.ski/trigger For more information about the trigger
 * 
 * @example
 * ```tsx
 * <DrawerTrigger asChild>
 *   <Button>Open Drawer</Button>
 * </DrawerTrigger>
 * ```
 */
export type DrawerTriggerProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>;

/**
 * DrawerPortal Component Props
 * 
 * Props for the component that portals the drawer content into the DOM.
 * 
 * @see https://vaul.emilkowal.ski/portal For more information about the portal
 * 
 * @example
 * ```tsx
 * <DrawerPortal>
 *   <DrawerOverlay />
 *   <DrawerContent>...</DrawerContent>
 * </DrawerPortal>
 * ```
 */
export type DrawerPortalProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>;

/**
 * DrawerClose Component Props
 * 
 * Props for the component that closes the drawer when clicked.
 * 
 * @see https://vaul.emilkowal.ski/close For more information about the close button
 * 
 * @example
 * ```tsx
 * <DrawerClose asChild>
 *   <Button variant="outline">Cancel</Button>
 * </DrawerClose>
 * ```
 */
export type DrawerCloseProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>;

/**
 * DrawerOverlay Component Props
 * 
 * Props for the overlay that covers the screen behind the drawer.
 * 
 * @see https://vaul.emilkowal.ski/overlay For more information about the overlay
 * 
 * @example
 * ```tsx
 * <DrawerOverlay className="bg-black/80" />
 * ```
 */
export type DrawerOverlayProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;

/**
 * DrawerContent Component Props
 * 
 * Props for the main content container of the drawer.
 * 
 * @see https://vaul.emilkowal.ski/content For more information about the content
 * 
 * @example
 * ```tsx
 * <DrawerContent>
 *   <DrawerHeader>...</DrawerHeader>
 *   <div>Main content here</div>
 *   <DrawerFooter>...</DrawerFooter>
 * </DrawerContent>
 * ```
 */
export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;

/**
 * DrawerHeader Component Props
 * 
 * Props for the header section of the drawer.
 * 
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Settings</DrawerTitle>
 *   <DrawerDescription>Make changes to your profile.</DrawerDescription>
 * </DrawerHeader>
 * ```
 */
export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DrawerFooter Component Props
 * 
 * Props for the footer section of the drawer, typically containing action buttons.
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
export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DrawerTitle Component Props
 * 
 * Props for the title component of the drawer.
 * 
 * @see https://vaul.emilkowal.ski/title For more information about the title
 * 
 * @example
 * ```tsx
 * <DrawerTitle>Edit Profile</DrawerTitle>
 * ```
 */
export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;

/**
 * DrawerDescription Component Props
 * 
 * Props for the description component of the drawer.
 * 
 * @see https://vaul.emilkowal.ski/description For more information about the description
 * 
 * @example
 * ```tsx
 * <DrawerDescription>
 *   Make changes to your profile here. Click save when you're done.
 * </DrawerDescription>
 * ```
 */
export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>;
