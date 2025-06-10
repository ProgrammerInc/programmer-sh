'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './card.module.css';
import { CardProps } from './card.types';

/**
 * Card component
 *
 * A container component with rounded corners, border, and subtle shadow.
 *
 * @example
 * // Basic card with content
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Card Content</CardContent>
 *   <CardFooter>Card Footer</CardFooter>
 * </Card>
 */
const Card = memo(
  React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
    const cardClassName = useMemo(() => {
      return cn(styles.card, className);
    }, [className]);

    return <div ref={ref} className={cardClassName} {...props} />;
  })
);

Card.displayName = 'Card';

export { Card };
export default Card;
