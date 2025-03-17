'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { memo } from 'react';

import { DialogTriggerProps } from './dialog.types';

/**
 * Dialog Trigger Component
 * The button that opens the dialog
 */
const DialogTrigger = memo(DialogPrimitive.Trigger);

DialogTrigger.displayName = 'DialogTrigger';

export { DialogTrigger };
export default DialogTrigger;
