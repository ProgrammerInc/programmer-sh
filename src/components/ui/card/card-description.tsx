'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { CardDescriptionProps } from './card.types';

/**
 * CardDescription component
 * 
 * Descriptive text displayed below the card title.
 */
const CardDescription = memo(React.forwardRef<HTMLParagraphElement, CardDescriptionProps>
(({ className, ...props }, ref) => {
  const descriptionClassName = useMemo(() => {
    return cn('text-sm text-muted-foreground', className);
  }, [className]);

  return <p ref={ref} className={descriptionClassName} {...props} />;
}));

CardDescription.displayName = 'CardDescription';

export { CardDescription };
export default CardDescription;
