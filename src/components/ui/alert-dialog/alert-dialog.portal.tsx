/**
 * Alert Dialog Portal Component
 *
 * A container that portals its children into a different part of the DOM.
 */

'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { memo } from 'react';

import { AlertDialogPortalProps } from './alert-dialog.types';

/**
 * AlertDialogPortal component
 * 
 * A container that portals its children (the alert dialog content) into the body.
 * 
 * @example
 * ```tsx
 * <AlertDialogPortal>
 *   <AlertDialogOverlay />
 *   <AlertDialogContent>...</AlertDialogContent>
 * </AlertDialogPortal>
 * ```
 */
export const AlertDialogPortal = memo<AlertDialogPortalProps>(AlertDialogPrimitive.Portal);

AlertDialogPortal.displayName = 'AlertDialogPortal';

export default AlertDialogPortal;
