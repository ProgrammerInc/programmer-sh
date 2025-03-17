'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { memo } from 'react';

import { DialogPortalProps } from './dialog.types';

/**
 * Dialog Portal Component
 * Portals the dialog content into the body
 */
const DialogPortal = memo(DialogPrimitive.Portal);

DialogPortal.displayName = 'DialogPortal';

export { DialogPortal };
export default DialogPortal;
