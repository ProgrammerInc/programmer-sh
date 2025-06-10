/**
 * Alert Dialog Trigger Component
 *
 * The button that opens the alert dialog.
 */

'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { memo } from 'react';

import { AlertDialogTriggerProps } from './alert-dialog.types';

/**
 * AlertDialogTrigger component
 *
 * The button that opens the alert dialog when clicked.
 *
 * @example
 * ```tsx
 * <AlertDialogTrigger>Open Alert</AlertDialogTrigger>
 * ```
 */
export const AlertDialogTrigger = memo<AlertDialogTriggerProps>(AlertDialogPrimitive.Trigger);

AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName;

export default AlertDialogTrigger;
