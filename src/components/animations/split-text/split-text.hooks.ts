/**
 * Custom hooks for the Split Text animation component
 */

import { SpringConfig, useSprings } from '@react-spring/web';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INTERSECTION } from './split-text.constants';
import { AnimationStyle, ProcessedText } from './split-text.types';
import { processText } from './split-text.utils';

/**
 * Hook to process text into words and letters
 *
 * @param text - The text to process
 * @returns Processed text containing words and letters arrays
 */
export const useProcessedText = (text: string): ProcessedText => {
  return useMemo(() => processText(text), [text]);
};

/**
 * Hook to handle visibility using Intersection Observer
 *
 * @param threshold - Visibility threshold to trigger animation
 * @param rootMargin - Root margin for intersection observer
 * @returns Object containing reference to observe and visibility state
 */
export const useVisibilityObserver = (
  threshold: number = INTERSECTION.THRESHOLD,
  rootMargin: string = INTERSECTION.ROOT_MARGIN
) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // IntersectionObserver setup with useCallback to maintain reference stability
  const setupObserver = useCallback(() => {
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

    return observer;
  }, [threshold, rootMargin]);

  // Setup intersection observer effect
  useEffect(() => {
    const observer = setupObserver();
    return () => observer.disconnect();
  }, [setupObserver]);

  return { ref, inView };
};

/**
 * Hook to manage letter animation completion tracking
 *
 * @param letterCount - Total number of letters to animate
 * @param onComplete - Callback function when all letters have finished animating
 * @param text - Text dependency to reset the counter when it changes
 * @returns Callback function to increment the animation counter
 */
export const useAnimationCompletion = (
  letterCount: number,
  onComplete?: () => void,
  text?: string
) => {
  const animatedCount = useRef(0);

  // Reset the animation counter when text changes
  useEffect(() => {
    animatedCount.current = 0;
  }, [letterCount, text]);

  return useCallback(
    (inViewValue: boolean) => {
      return inViewValue
        ? () => {
            animatedCount.current += 1;
            if (animatedCount.current === letterCount && onComplete) {
              onComplete();
            }
          }
        : undefined;
    },
    [letterCount, onComplete]
  );
};

/**
 * Hook to create animation springs for letters
 *
 * @param letters - Array of letters to animate
 * @param inView - Whether the component is in view
 * @param animationFrom - Starting animation style
 * @param animationTo - Ending animation style
 * @param delay - Delay between each letter animation
 * @param easing - Animation easing function
 * @param onLetterAnimationComplete - Callback when all letters have finished animating
 * @returns Spring animations for each letter
 */
export const useLetterAnimations = (
  letters: string[],
  inView: boolean,
  animationFrom: AnimationStyle,
  animationTo: AnimationStyle,
  delay: number,
  easing: SpringConfig['easing'],
  onLetterAnimationComplete?: () => void
) => {
  const onRest = useAnimationCompletion(
    letters.length,
    onLetterAnimationComplete,
    letters.join('')
  );

  return useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView ? animationTo : animationFrom,
      delay: i * delay,
      config: { easing },
      onRest: onRest(inView)
    }))
  );
};
