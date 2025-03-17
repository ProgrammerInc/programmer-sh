/**
 * Custom hooks for the CountUp component
 */

import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import {
  DAMPING_BASE,
  DAMPING_MULTIPLIER,
  DEFAULT_LOCALE,
  STIFFNESS_MULTIPLIER
} from './count-up.constants';

/**
 * Hook to format numbers with separator
 *
 * @param separator The separator to use for thousands
 * @returns Formatting function
 */
export const useNumberFormatter = (separator: string = '') => {
  return useCallback(
    (value: number): string => {
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      };

      const formattedNumber = Intl.NumberFormat(DEFAULT_LOCALE, options).format(value);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [separator]
  );
};

/**
 * Hook for animating a number count up or down
 *
 * @param params Configuration parameters
 * @returns Object containing ref and setup function
 */
export const useCountAnimation = ({
  initialValue,
  targetValue,
  duration,
  delay,
  startWhen,
  onStart,
  onEnd,
  formatNumber
}: {
  initialValue: number;
  targetValue: number;
  duration: number;
  delay: number;
  startWhen: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  formatNumber: (value: number) => string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(initialValue);

  // Calculate damping and stiffness based on duration
  const damping = DAMPING_BASE + DAMPING_MULTIPLIER * (1 / duration);
  const stiffness = STIFFNESS_MULTIPLIER * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  // Set initial text content to the initial value
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatNumber(initialValue);
    }
  }, [initialValue, formatNumber]);

  // Start the animation when in view and startWhen is true
  useEffect(() => {
    if (!isInView || !startWhen) return;

    // Call onStart callback
    if (onStart) {
      onStart();
    }

    // Start the animation after delay
    const animationStartTimeout = setTimeout(() => {
      motionValue.set(targetValue);
    }, delay * 1000);

    // Call onEnd callback after animation completes
    const animationEndTimeout = setTimeout(
      () => {
        if (onEnd) {
          onEnd();
        }
      },
      delay * 1000 + duration * 1000
    );

    // Clean up timeouts on unmount or when dependencies change
    return () => {
      clearTimeout(animationStartTimeout);
      clearTimeout(animationEndTimeout);
    };
  }, [isInView, startWhen, motionValue, targetValue, delay, onStart, onEnd, duration]);

  // Update text content with formatted number on spring value change
  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        ref.current.textContent = formatNumber(Number(latest.toFixed(0)));
      }
    });

    return () => unsubscribe();
  }, [springValue, formatNumber]);

  return { ref };
};
