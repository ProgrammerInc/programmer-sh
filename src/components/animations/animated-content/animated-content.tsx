'use client';

import { cn } from '@/utils/app.utils';
import { animated } from '@react-spring/web';
import { memo, useRef } from 'react';
import { CSS_CLASSES, DEFAULT_SPRING_CONFIG, DEFAULT_VALUES } from './animated-content.constants';
import {
  useAnimationSpring,
  useIntersectionObserver,
  useTransformValues
} from './animated-content.hooks';
import type { AnimatedContentProps } from './animated-content.types';

/**
 * AnimatedContent component
 *
 * A component that animates its children when they enter the viewport.
 * Can animate in different directions, distances, and with various spring configurations.
 *
 * @example
 * ```tsx
 * // Basic vertical animation (from bottom)
 * <AnimatedContent>
 *   <div>This content will slide up when in view</div>
 * </AnimatedContent>
 *
 * // Horizontal animation from right
 * <AnimatedContent direction="horizontal" distance={200}>
 *   <div>This content will slide in from the right</div>
 * </AnimatedContent>
 *
 * // Horizontal animation from left
 * <AnimatedContent direction="horizontal" distance={200} reverse={true}>
 *   <div>This content will slide in from the left</div>
 * </AnimatedContent>
 *
 * // With custom spring configuration
 * <AnimatedContent config={{ tension: 100, friction: 20 }}>
 *   <div>This content has custom spring physics</div>
 * </AnimatedContent>
 *
 * // With delay
 * <AnimatedContent delay={500}>
 *   <div>This content will animate after a 500ms delay</div>
 * </AnimatedContent>
 * ```
 */
export const AnimatedContent = memo(function AnimatedContent({
  children,
  distance = DEFAULT_VALUES.DISTANCE,
  direction = DEFAULT_VALUES.DIRECTION,
  reverse = DEFAULT_VALUES.REVERSE,
  config = DEFAULT_SPRING_CONFIG,
  initialOpacity = DEFAULT_VALUES.INITIAL_OPACITY,
  animateOpacity = DEFAULT_VALUES.ANIMATE_OPACITY,
  scale = DEFAULT_VALUES.SCALE,
  threshold = DEFAULT_VALUES.THRESHOLD,
  delay = DEFAULT_VALUES.DELAY,
  className
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Determine if the element is in view using the intersection observer
  const inView = useIntersectionObserver(ref, threshold, delay);

  // Calculate transform values based on animation parameters
  const { initialTransform, finalTransform } = useTransformValues(
    direction,
    distance,
    reverse,
    scale
  );

  // Set up spring animation
  const springProps = useAnimationSpring(
    inView,
    initialTransform,
    finalTransform,
    initialOpacity,
    animateOpacity,
    config
  );

  return (
    <animated.div ref={ref} style={springProps} className={cn(CSS_CLASSES.CONTAINER, className)}>
      {children}
    </animated.div>
  );
});

AnimatedContent.displayName = 'AnimatedContent';

export default AnimatedContent;
