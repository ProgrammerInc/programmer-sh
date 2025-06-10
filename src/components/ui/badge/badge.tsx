'use client';

import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './badge.module.css';
import { BadgeProps } from './badge.types';

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
const Badge = memo(({ className, variant = 'default', ...props }: BadgeProps) => {
  // Memoize the className calculation
  const badgeClassName = useMemo(() => {
    const variantClass = styles[`badge-${variant}`] || styles['badge-default'];
    return cn(styles['badge-base'], variantClass, className);
  }, [variant, className]);

  return <div className={badgeClassName} {...props} />;
});

Badge.displayName = 'Badge';

export { Badge };
export default Badge;
