'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { DialogFooterProps } from './dialog.types';

/**
 * Dialog Footer Component
 * Container for the dialog actions
 */
const DialogFooter = memo(({
  className,
  ...props
}: DialogFooterProps) => {
  const footerClassName = useMemo(() => {
    return cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className);
  }, [className]);

  return <div className={footerClassName} {...props} />;
});

DialogFooter.displayName = 'DialogFooter';

export { DialogFooter };
export default DialogFooter;
