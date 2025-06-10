'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { memo } from 'react';

/**
 * Dialog Trigger Component
 * The button that opens the dialog
 *
 * @example
 * ```tsx
 * <DialogTrigger>
 *   <Button>Open Dialog</Button>
 * </DialogTrigger>
 * ```
 */
const DialogTrigger = memo(DialogPrimitive.Trigger);

DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

export { DialogTrigger };
export default DialogTrigger;
