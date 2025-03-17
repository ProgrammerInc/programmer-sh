'use client';

import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import { BadgeProps } from './badge.types';
import { badgeVariants } from './badge.variants';

/**
 * Badge component
 * 
 * A small visual indicator for statuses, labels, and categories.
 * 
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Destructive</Badge>
 * <Badge variant="outline">Outline</Badge>
 * ```
 */
const Badge = memo(({ className, variant, ...props }: BadgeProps) => {
  // Memoize the className calculation
  const badgeClassName = useMemo(() => {
    return cn(badgeVariants({ variant }), className);
  }, [variant, className]);

  return <div className={badgeClassName} {...props} />;
});

Badge.displayName = 'Badge';

export { Badge };
export default Badge;
