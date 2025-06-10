import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

/**
 * Props for the Dialog Root component
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#root} for more information
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogTitle>Dialog Title</DialogTitle>
 *     <DialogDescription>Dialog Description</DialogDescription>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export type DialogRootProps = React.ComponentProps<typeof DialogPrimitive.Root>;

/**
 * Props for the Dialog Trigger component
 * The button that opens the dialog
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#trigger} for more information
 *
 * @example
 * ```tsx
 * <DialogTrigger>Open Dialog</DialogTrigger>
 * ```
 */
export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

/**
 * Props for the Dialog Portal component
 * Portals dialog content into the body element
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#portal} for more information
 */
export type DialogPortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

/**
 * Props for the Dialog Close component
 * Button that closes the dialog when clicked
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#close} for more information
 *
 * @example
 * ```tsx
 * <DialogClose>Close Dialog</DialogClose>
 * ```
 */
export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

/**
 * Props for the Dialog Overlay component
 * The overlay that covers the screen behind the dialog
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#overlay} for more information
 */
export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

/**
 * Props for the Dialog Content component
 * The container for the dialog content
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#content} for more information
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogTitle>Dialog Title</DialogTitle>
 *   <DialogDescription>Dialog Description</DialogDescription>
 * </DialogContent>
 * ```
 */
export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

/**
 * Props for the Dialog Header component
 * The header area of the dialog, usually containing the title and description
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Dialog Title</DialogTitle>
 *   <DialogDescription>Dialog Description</DialogDescription>
 * </DialogHeader>
 * ```
 */
export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for the Dialog Footer component
 * The footer area of the dialog, usually containing the action buttons
 *
 * @example
 * ```tsx
 * <DialogFooter>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Continue</Button>
 * </DialogFooter>
 * ```
 */
export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for the Dialog Title component
 * The title of the dialog
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#title} for more information
 *
 * @example
 * ```tsx
 * <DialogTitle>Dialog Title</DialogTitle>
 * ```
 */
export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

/**
 * Props for the Dialog Description component
 * The description of the dialog
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#description} for more information
 *
 * @example
 * ```tsx
 * <DialogDescription>Dialog Description</DialogDescription>
 * ```
 */
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;
