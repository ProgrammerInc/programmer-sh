'use client';

import { cn } from '@/utils/app.utils';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { ProgressProps } from './progress.types';

/**
 * Progress component based on Radix UI's Progress primitive
 * 
 * A graphical element that displays the completion progress of a task.
 * 
 * @example
 * ```tsx
 * <Progress value={33} />
 * 
 * <Progress value={66} className="h-2" />
 * 
 * <Progress value={100} className="h-3 w-[60%]" />
 * ```
 */
const Progress = memo(React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, ...props }, ref) => {
  const rootClassName = useMemo(() => {
    return cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className);
  }, [className]);

  const indicatorStyle = useMemo(() => {
    return { transform: `translateX(-${100 - (value || 0)}%)` };
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={rootClassName}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={indicatorStyle}
      />
    </ProgressPrimitive.Root>
  );
}));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

export default Progress;
