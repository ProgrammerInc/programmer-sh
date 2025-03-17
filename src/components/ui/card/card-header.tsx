'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { CardHeaderProps } from './card.types';

/**
 * CardHeader component
 * 
 * Container for card title and description at the top of a card.
 */
const CardHeader = memo(React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    const headerClassName = useMemo(() => {
      return cn('flex flex-col space-y-1.5 p-6', className);
    }, [className]);

    return <div ref={ref} className={headerClassName} {...props} />;
  }
));

CardHeader.displayName = 'CardHeader';

export { CardHeader };
export default CardHeader;
