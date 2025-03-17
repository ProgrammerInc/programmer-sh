'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { SkeletonProps } from './skeleton.types';

/**
 * Skeleton component for displaying loading states.
 * 
 * Renders a placeholder with a subtle animation while content is loading.
 * Use with different sizes and shapes to create various loading placeholders.
 * 
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-12 rounded-full" /> // Avatar skeleton
 * <Skeleton className="h-4 w-[250px]" /> // Text line skeleton
 * ```
 */
const Skeleton = memo(React.forwardRef<
  HTMLDivElement,
  SkeletonProps
>(({ className, ...props }, ref) => {
  const skeletonClassName = useMemo(() => {
    return cn('animate-pulse rounded-md bg-muted', className);
  }, [className]);

  return (
    <div 
      className={skeletonClassName}
      ref={ref}
      {...props} 
    />
  );
}));

Skeleton.displayName = 'Skeleton';

export { Skeleton };
export default Skeleton;
