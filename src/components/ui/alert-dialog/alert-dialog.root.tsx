/* eslint-disable no-secrets/no-secrets */
/**
 * Alert Dialog Root Component
 *
 * A modal dialog that interrupts the user with important content and expects a response.
 */

'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { memo } from 'react';

import { AlertDialogProps } from './alert-dialog.types';

/**
 * AlertDialog component
 *
 * The root component that wraps all alert dialog parts.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>Open</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *       <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
export const AlertDialog = memo<AlertDialogProps>(AlertDialogPrimitive.Root);

AlertDialog.displayName = 'AlertDialog';

export default AlertDialog;
