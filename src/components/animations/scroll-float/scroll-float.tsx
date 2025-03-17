/**
 * Scroll Float animation component
 */
'use client';

import { memo, useMemo, useRef } from 'react';

import {
  CSS_CLASSES,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_EASE,
  DEFAULT_SCROLL_END,
  DEFAULT_SCROLL_START,
  DEFAULT_STAGGER
} from './scroll-float.constants';
import { useScrollFloatAnimation } from './scroll-float.hooks';
import styles from './scroll-float.module.css';
import { ScrollFloatProps } from './scroll-float.types';
import { cn, splitTextIntoChars } from './scroll-float.utils';

/**
 * ScrollFloat component that animates text with a floating effect triggered by scrolling
 *
 * @component
 * @example
 * ```tsx
 * <ScrollFloat>
 *   Hello World
 * </ScrollFloat>
 * ```
 */
export const ScrollFloat = memo<ScrollFloatProps>(
  ({
    children,
    scrollContainerRef,
    containerClassName = '',
    textClassName = '',
    animationDuration = DEFAULT_ANIMATION_DURATION,
    ease = DEFAULT_EASE,
    scrollStart = DEFAULT_SCROLL_START,
    scrollEnd = DEFAULT_SCROLL_END,
    stagger = DEFAULT_STAGGER
  }) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    // Split text into individual character spans for animation
    const splitText = useMemo(() => {
      return splitTextIntoChars(children, styles[CSS_CLASSES.CHAR]);
    }, [children]);

    // Initialize scroll animation
    useScrollFloatAnimation(
      containerRef,
      scrollContainerRef,
      animationDuration,
      ease,
      scrollStart,
      scrollEnd,
      stagger
    );

    return (
      <h2 ref={containerRef} className={cn(styles[CSS_CLASSES.CONTAINER], containerClassName)}>
        {/* Hidden text for screen readers */}
        <span className={styles['sr-only']}>{typeof children === 'string' ? children : ''}</span>

        {/* Visible animated text */}
        <span className={cn(styles[CSS_CLASSES.TEXT_WRAPPER], textClassName)}>{splitText}</span>
      </h2>
    );
  }
);

ScrollFloat.displayName = 'ScrollFloat';
export default ScrollFloat;
