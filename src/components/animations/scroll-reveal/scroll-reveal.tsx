/**
 * Scroll Reveal animation component
 */
'use client';

import { memo, useMemo, useRef } from 'react';

import {
  CSS_CLASSES,
  DEFAULT_BASE_OPACITY,
  DEFAULT_BASE_ROTATION,
  DEFAULT_BLUR_STRENGTH,
  DEFAULT_ENABLE_BLUR,
  DEFAULT_ROTATION_END,
  DEFAULT_WORD_ANIMATION_END
} from './scroll-reveal.constants';
import { useScrollRevealAnimation } from './scroll-reveal.hooks';
import styles from './scroll-reveal.module.css';
import { ScrollRevealProps } from './scroll-reveal.types';
import { cn, splitTextIntoWords } from './scroll-reveal.utils';

/**
 * ScrollReveal component that animates text with rotation, opacity, and blur effects triggered by scrolling
 *
 * @component
 * @example
 * ```tsx
 * <ScrollReveal>
 *   Hello World
 * </ScrollReveal>
 * ```
 */
export const ScrollReveal = memo<ScrollRevealProps>(
  ({
    children,
    scrollContainerRef,
    enableBlur = DEFAULT_ENABLE_BLUR,
    baseOpacity = DEFAULT_BASE_OPACITY,
    baseRotation = DEFAULT_BASE_ROTATION,
    blurStrength = DEFAULT_BLUR_STRENGTH,
    containerClassName = '',
    textClassName = '',
    rotationEnd = DEFAULT_ROTATION_END,
    wordAnimationEnd = DEFAULT_WORD_ANIMATION_END
  }) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    // Split text into individual word spans for animation
    const splitText = useMemo(() => {
      return splitTextIntoWords(children, styles[CSS_CLASSES.WORD]);
    }, [children]);

    // Initialize scroll animations
    useScrollRevealAnimation(
      containerRef,
      scrollContainerRef,
      enableBlur,
      baseOpacity,
      baseRotation,
      blurStrength,
      rotationEnd,
      wordAnimationEnd
    );

    return (
      <h2 ref={containerRef} className={cn(styles[CSS_CLASSES.CONTAINER], containerClassName)}>
        {/* Hidden text for screen readers */}
        <span className={styles[CSS_CLASSES.SR_ONLY]}>
          {typeof children === 'string' ? children : ''}
        </span>

        {/* Visible animated text */}
        <p className={cn(styles[CSS_CLASSES.TEXT_WRAPPER], textClassName)}>{splitText}</p>
      </h2>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';
export default ScrollReveal;
