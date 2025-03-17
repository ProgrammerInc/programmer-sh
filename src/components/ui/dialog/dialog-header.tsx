'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { DialogHeaderProps } from './dialog.types';

/**
 * Dialog Header Component
 * Container for the dialog title and description
 */
const DialogHeader = memo(({
  className,
  ...props
}: DialogHeaderProps) => {
  const headerClassName = useMemo(() => {
    return cn('flex flex-col space-y-1.5 text-center sm:text-left', className);
  }, [className]);

  return <div className={headerClassName} {...props} />;
});

DialogHeader.displayName = 'DialogHeader';

export { DialogHeader };
export default DialogHeader;
