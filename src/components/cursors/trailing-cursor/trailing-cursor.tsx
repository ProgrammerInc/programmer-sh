'use client';

import { useTrailingCursor } from './trailing-cursor.hooks';
import type { TrailingCursorProps } from './trailing-cursor.types';

/**
 * TrailingCursor component that creates a trailing effect following the cursor
 *
 * @param props - Component properties
 * @returns JSX.Element | null
 */
export const TrailingCursor: React.FC<TrailingCursorProps> = props => {
  // Use the trailing cursor hook to handle all the effect logic
  useTrailingCursor(props);

  // This component doesn't render anything directly - it manipulates the DOM via refs
  return null;
};

export default TrailingCursor;
