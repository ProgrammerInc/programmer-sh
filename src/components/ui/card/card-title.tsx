'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { CardTitleProps } from './card.types';

/**
 * CardTitle component
 * 
 * The title displayed at the top of a card.
 */
const CardTitle = memo(React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    const titleClassName = useMemo(() => {
      return cn('text-2xl font-semibold leading-none tracking-tight', className);
    }, [className]);

    return <h3 ref={ref} className={titleClassName} {...props} />;
  }
));

CardTitle.displayName = 'CardTitle';

export { CardTitle };
export default CardTitle;
