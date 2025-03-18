'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { memo } from 'react';

import { DialogPortalProps } from './dialog.types';

/**
 * Dialog Portal Component
 * Portals the dialog content into the body
 *
 * @example
 * ```tsx
 * <DialogPortal>
 *   <DialogOverlay />
 *   <DialogContent>...</DialogContent>
 * </DialogPortal>
 * ```
 */
const DialogPortal = memo(({ ...props }: DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
));

DialogPortal.displayName = DialogPrimitive.Portal.displayName;

export { DialogPortal };
export default DialogPortal;
