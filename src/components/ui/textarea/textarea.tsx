'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { TextareaProps } from './textarea.types';

/**
 * Textarea component
 * 
 * A multi-line text input component.
 * 
 * @example
 * ```tsx
 * <Textarea placeholder="Type your message here" />
 * <Textarea disabled />
 * <Textarea className="custom-class" />
 * ```
 */
const Textarea = memo(React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, ...props }, ref) => {
  // Memoize the className calculation
  const textareaClassName = useMemo(() => {
    return cn(
      'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    );
  }, [className]);

  return (
    <textarea
      className={textareaClassName}
      ref={ref}
      {...props}
    />
  );
}));

Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;
