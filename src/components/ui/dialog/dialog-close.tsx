'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { memo } from 'react';

import { DialogCloseProps } from './dialog.types';

/**
 * Dialog Close Component
 * Button that closes the dialog when clicked
 *
 * @example
 * ```tsx
 * <DialogClose>Close</DialogClose>
 * ```
 */
const DialogClose = memo(DialogPrimitive.Close);

DialogClose.displayName = DialogPrimitive.Close.displayName;

export { DialogClose };
export default DialogClose;
