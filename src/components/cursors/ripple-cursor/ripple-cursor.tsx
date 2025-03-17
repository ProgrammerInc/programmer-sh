'use client';

import { memo } from 'react';

import { CONTAINER_CLASS_NAME, DEFAULT_VALUES, RIPPLE_CLASS_NAME } from './ripple-cursor.constants';
import { useRippleEffect, useRippleStyles } from './ripple-cursor.hooks';
import type { RippleCursorProps } from './ripple-cursor.types';

/**
 * RippleCursor component creates ripple effects that follow the cursor movement.
 *
 * @param props - Configuration options for the ripple effect
 * @returns React component with ripple effect
 */
export const RippleCursor = memo(function RippleCursor({
  maxSize = DEFAULT_VALUES.maxSize,
  duration = DEFAULT_VALUES.duration,
  blur = DEFAULT_VALUES.blur,
  color = DEFAULT_VALUES.color
}: RippleCursorProps) {
  // Use our custom hooks to manage ripple state and styles
  const ripples = useRippleEffect(duration);
  const { getStyles } = useRippleStyles({ maxSize, duration, blur, color });

  return (
    <div className={CONTAINER_CLASS_NAME}>
      {ripples.map(ripple => (
        <div key={ripple.id} className={RIPPLE_CLASS_NAME} style={getStyles(ripple)} />
      ))}
    </div>
  );
});

export default RippleCursor;
