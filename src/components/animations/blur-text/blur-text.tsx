'use client';

import { SpringValue, animated, useTrail } from '@react-spring/web';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_FROM_BOTTOM,
  DEFAULT_FROM_TOP,
  DEFAULT_SPRING_CONFIG,
  DEFAULT_TO
} from './blur-text.constants';
import { BlurTextProps } from './blur-text.types';

// Define style properties type for the animated span
interface AnimatedStyle {
  filter: SpringValue<string>;
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
  [key: string]: SpringValue<unknown> | SpringValue<string> | SpringValue<number>;
}

/**
 * A component that animates text with a blur effect when it enters the viewport.
 * Text can be animated by words or individual letters with configurable animations.
 *
 * @param props - Component properties
 * @returns Memoized React component with animated text elements
 */
export const BlurText = memo(function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = DEFAULT_SPRING_CONFIG.easing,
  onAnimationComplete
}: BlurTextProps) {
  // Split text into elements that will be animated
  const elements = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [text, animateBy]
  );

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompleted = useRef(false);

  // Default animations based on direction
  const defaultFrom = useMemo(
    () => (direction === 'top' ? DEFAULT_FROM_TOP : DEFAULT_FROM_BOTTOM),
    [direction]
  );

  // Setup intersection observer to trigger animation when element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Use trail animation for smoother sequence effect
  const trail = useTrail<AnimatedStyle>(elements.length, {
    from: animationFrom || defaultFrom,
    to: inView ? animationTo?.[0] || DEFAULT_TO : animationFrom || defaultFrom,
    config: {
      ...DEFAULT_SPRING_CONFIG,
      easing
    },
    delay: inView ? delay : 0,
    onRest: () => {
      if (!animationCompleted.current && onAnimationComplete) {
        animationCompleted.current = true;
        onAnimationComplete();
      }
    }
  });

  // Create base class name with flexibility for custom styling
  const baseClassName = useMemo(() => {
    return `blur-text ${className} flex flex-wrap`;
  }, [className]);

  // Style for animated spans
  const spanClassName = 'inline-block transition-transform will-change-[transform,filter,opacity]';

  return (
    <p ref={ref} className={baseClassName}>
      {trail.map((style, index) => (
        <animated.span key={index} style={style} className={spanClassName}>
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </p>
  );
});

// Add displayName to help with debugging
BlurText.displayName = 'BlurText';

export default BlurText;
