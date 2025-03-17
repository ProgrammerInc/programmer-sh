'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { memo } from 'react';

import { DialogCloseProps } from './dialog.types';

/**
 * Dialog Close Component
 * Button that closes the dialog when clicked
 */
const DialogClose = memo(DialogPrimitive.Close);

DialogClose.displayName = 'DialogClose';

export { DialogClose };
export default DialogClose;
