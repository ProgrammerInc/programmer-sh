'use client';

import { memo } from 'react';

import { useSnowflakeEffect } from './snowflake-cursor.hooks';
import type { SnowflakeCursorProps } from './snowflake-cursor.types';

/**
 * SnowflakeCursor component creates a snowflake particle effect that follows the cursor movement.
 *
 * @param props - Configuration options for the snowflake cursor
 * @returns React component with snowflake effect
 */
export const SnowflakeCursor = memo(function SnowflakeCursor({ element }: SnowflakeCursorProps) {
  // Use our custom hook to manage the snowflake effect
  useSnowflakeEffect(element);

  // Component doesn't render any visible elements itself
  // The canvas is created and managed by the hook
  return null;
});

export default SnowflakeCursor;
