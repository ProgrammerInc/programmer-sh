/**
 * SpotlightCursor Component
 *
 * A cursor component that creates a spotlight effect following the mouse cursor.
 *
 * @module SpotlightCursor
 */
'use client';

import { memo, useRef } from 'react';
import { DEFAULT_CONFIG } from './spotlight-cursor.constants';
import { useSpotlightCursor } from './spotlight-cursor.hooks';
import styles from './spotlight-cursor.module.css';
import { SpotlightCursorProps } from './spotlight-cursor.types';

/**
 * SpotlightCursor component that creates a spotlight effect around the cursor.
 *
 * @param props - Component properties
 * @returns JSX element
 */
export const SpotlightCursor = memo<SpotlightCursorProps>(({ config = {}, className, ...rest }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Merge default config with user-provided config
  const spotlightConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };

  // Use custom hook for cursor behavior
  useSpotlightCursor(spotlightConfig, canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles['spotlight-cursor-canvas']} ${className ?? ''}`}
      {...rest}
    />
  );
});

SpotlightCursor.displayName = 'SpotlightCursor';

export default SpotlightCursor;
