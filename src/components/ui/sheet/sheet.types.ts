'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { sheetVariants } from './sheet.variants';

/**
 * Sheet Root Component Props
 * 
 * Props for the root Sheet component that contains all sheet-related elements.
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#root | Radix UI Dialog Root}
 */
export type SheetProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;

/**
 * Sheet Trigger Component Props
 * 
 * Props for the button that opens the sheet dialog.
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#trigger | Radix UI Dialog Trigger}
 */
export type SheetTriggerProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>;

/**
 * Sheet Close Component Props
 * 
 * Props for the button that closes the sheet dialog.
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#close | Radix UI Dialog Close}
 */
export type SheetCloseProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>;

/**
 * Sheet Portal Component Props
 * 
 * Props for the portal that renders sheet content outside the DOM hierarchy.
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#portal | Radix UI Dialog Portal}
 */
export type SheetPortalProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>;

/**
 * Sheet Overlay Component Props
 * 
 * Props for the overlay that covers the screen behind the sheet.
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#overlay | Radix UI Dialog Overlay}
 */
export type SheetOverlayProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>;

/**
 * Sheet Content Component Props
 * 
 * Props for the main content container of the sheet.
 * Extends with position variants (top, right, bottom, left).
 * 
 * @property {"top" | "right" | "bottom" | "left"} [side="right"] - The position of the sheet
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#content | Radix UI Dialog Content}
 */
export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

/**
 * Sheet Header Component Props
 * 
 * Props for the header section of the sheet that typically contains the title and description.
 * Uses standard HTML div element props.
 */
export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Sheet Footer Component Props
 * 
 * Props for the footer section of the sheet that typically contains action buttons.
 * Uses standard HTML div element props.
 */
export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Sheet Title Component Props
 * 
 * Props for the title element of the sheet.
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#title | Radix UI Dialog Title}
 */
export type SheetTitleProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>;

/**
 * Sheet Description Component Props
 * 
 * Props for the description element of the sheet.
 * @see {@link https://www.radix-ui.com/primitives/docs/components/dialog#description | Radix UI Dialog Description}
 */
export type SheetDescriptionProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>;
