import * as SheetPrimitive from '@radix-ui/react-dialog';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { sheetVariants } from './sheet.variants';

/**
 * Sheet root component props
 */
export type SheetProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;

/**
 * Sheet trigger component props
 */
export type SheetTriggerProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>;

/**
 * Sheet close component props
 */
export type SheetCloseProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>;

/**
 * Sheet portal component props
 */
export type SheetPortalProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>;

/**
 * Sheet overlay component props
 */
export type SheetOverlayProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>;

/**
 * Sheet content component props
 */
export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

/**
 * Sheet header component props
 */
export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Sheet footer component props
 */
export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Sheet title component props
 */
export type SheetTitleProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>;

/**
 * Sheet description component props
 */
export type SheetDescriptionProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>;
