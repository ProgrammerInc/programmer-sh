'use client';

import { memo } from 'react';
import {
  DEFAULT_CLASS_NAME,
  DEFAULT_DELAY,
  DEFAULT_DIRECTION,
  DEFAULT_DURATION,
  DEFAULT_FROM,
  DEFAULT_SEPARATOR,
  DEFAULT_START_WHEN
} from './count-up.constants';
import { useCountAnimation, useNumberFormatter } from './count-up.hooks';
import { CountUpProps } from './count-up.types';

/**
 * CountUp component animates a number from one value to another
 * with configurable animation settings
 *
 * @param props Component properties
 * @returns Animated counting number
 */
export const CountUp = memo(function CountUp({
  to,
  from = DEFAULT_FROM,
  direction = DEFAULT_DIRECTION,
  delay = DEFAULT_DELAY,
  duration = DEFAULT_DURATION,
  className = DEFAULT_CLASS_NAME,
  startWhen = DEFAULT_START_WHEN,
  separator = DEFAULT_SEPARATOR,
  onStart,
  onEnd
}: CountUpProps) {
  // Initialize motion value based on direction
  const initialValue = direction === 'down' ? to : from;
  const targetValue = direction === 'down' ? from : to;

  // Use custom formatter hook
  const formatNumber = useNumberFormatter(separator);

  // Use custom animation hook
  const { ref } = useCountAnimation({
    initialValue,
    targetValue,
    duration,
    delay,
    startWhen,
    onStart,
    onEnd,
    formatNumber
  });

  return <span className={className} ref={ref} />;
});

export default CountUp;
