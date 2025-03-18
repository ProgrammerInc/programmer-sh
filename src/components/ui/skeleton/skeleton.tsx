'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useMemo } from 'react';

import styles from './skeleton.module.css';
import { SkeletonProps, SkeletonVariant } from './skeleton.types';

/**
 * Skeleton Component
 * 
 * A placeholder component that animates a pulsing effect while content is loading.
 * 
 * Features:
 * - Customizable dimensions and shape through className prop
 * - Multiple preset variants (default, circle, avatar, text, button, card)
 * - Optional pulsing animation
 * - Polymorphic component (can render as any HTML element)
 * - Accessible loading state indicators
 * - Can be composed to create complex loading UI patterns
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Skeleton className="h-12 w-full" />
 * 
 * // With variant
 * <Skeleton variant="avatar" />
 * 
 * // With custom element
 * <Skeleton as="span" className="h-4 w-[250px]" />
 * 
 * // With accessibility label
 * <Skeleton loadingLabel="Loading user profile" className="h-12 w-12 rounded-full" />
 * 
 * // Disable animation
 * <Skeleton pulse={false} className="h-4 w-full" />
 * 
 * // Card skeleton with composition
 * <div className="space-y-2">
 *   <Skeleton variant="card" className="h-40" />
 *   <Skeleton variant="text" className="w-full" />
 *   <Skeleton variant="text" className="w-3/4" />
 * </div>
 * ```
 */

interface PolymorphicSkeletonProps extends SkeletonProps {
  as?: React.ElementType;
}

// Use memo for performance optimization
const Skeleton = memo(React.forwardRef<HTMLElement, PolymorphicSkeletonProps>(
  ({ 
    className, 
    as: Component = 'div',
    variant = 'default',
    pulse = true,
    visible = true,
    loadingLabel,
    ...props 
  }, ref) => {
    // Compute variant classes based on the selected variant
    const variantClasses = useMemo(() => {
      switch (variant) {
        case 'circle':
          return styles.circle;
        case 'avatar':
          return styles.avatar;
        case 'text':
          return styles.text;
        case 'button':
          return styles.button;
        case 'card':
          return styles.card;
        default:
          return '';
      }
    }, [variant]);
  
    // Compute all class names
    const skeletonClassName = useMemo(() => {
      return cn(
        styles.skeleton,
        pulse && styles.pulse,
        visible ? styles.visible : styles.hidden,
        variantClasses,
        className
      );
    }, [className, pulse, visible, variantClasses]);
  
    return (
      <Component 
        className={skeletonClassName}
        ref={ref}
        role="status"
        aria-busy="true"
        aria-live="polite"
        {...(loadingLabel && { 'aria-label': loadingLabel })}
        {...props} 
      />
    );
  }
));

Skeleton.displayName = 'Skeleton';

export { Skeleton };
export default Skeleton;
