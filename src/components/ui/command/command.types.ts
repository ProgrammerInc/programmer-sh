import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';

/**
 * Command component props
 */
export type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

/**
 * Command dialog component props
 */
export type CommandDialogProps = DialogProps;

/**
 * Command input component props
 */
export type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;

/**
 * Command list component props
 */
export type CommandListProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

/**
 * Command empty component props
 */
export type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

/**
 * Command group component props
 */
export type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

/**
 * Command separator component props
 */
export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;

/**
 * Command item component props
 */
export type CommandItemProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>;

/**
 * Command shortcut component props
 */
export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
