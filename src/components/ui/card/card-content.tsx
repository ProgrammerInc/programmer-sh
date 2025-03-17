'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { CardContentProps } from './card.types';

/**
 * CardContent component
 * 
 * Container for the main content of a card.
 */
const CardContent = memo(React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    const contentClassName = useMemo(() => {
      return cn('p-6 pt-0', className);
    }, [className]);

    return <div ref={ref} className={contentClassName} {...props} />;
  }
));

CardContent.displayName = 'CardContent';

export { CardContent };
export default CardContent;
