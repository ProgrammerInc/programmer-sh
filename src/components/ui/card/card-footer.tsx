'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { CardFooterProps } from './card.types';

/**
 * CardFooter component
 * 
 * Container for actions and content at the bottom of a card.
 */
const CardFooter = memo(React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    const footerClassName = useMemo(() => {
      return cn('flex items-center p-6 pt-0', className);
    }, [className]);

    return <div ref={ref} className={footerClassName} {...props} />;
  }
));

CardFooter.displayName = 'CardFooter';

export { CardFooter };
export default CardFooter;
