/**
 * Alert Dialog Action Component
 *
 * The component for the primary action button in the alert dialog.
 */

'use client';

import { buttonVariants } from '@/components/ui/button/button.variants';
import { cn } from '@/utils/app.utils';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { AlertDialogActionProps } from './alert-dialog.types';

/**
 * AlertDialogAction component
 * 
 * The primary action button in the alert dialog.
 * 
 * @example
 * ```tsx
 * <AlertDialogAction>Continue</AlertDialogAction>
 * ```
 */
export const AlertDialogAction = memo(React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, ...props }, ref) => {
  const actionClassName = useMemo(() => {
    return cn(buttonVariants(), className);
  }, [className]);

  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={actionClassName}
      {...props}
    />
  );
}));

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

export default AlertDialogAction;
