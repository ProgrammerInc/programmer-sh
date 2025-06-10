/**
 * TextFlagCursor Component
 *
 * A cursor component that creates a text flag effect following the mouse cursor.
 *
 * @module TextFlagCursor
 */
'use client';

import { memo } from 'react';
import { DEFAULT_CONFIG } from './textflag-cursor.constants';
import { useTextFlagCursor } from './textflag-cursor.hooks';
import styles from './textflag-cursor.module.css';
import { TextFlagCursorProps } from './textflag-cursor.types';

/**
 * TextFlagCursor component that creates a text flag effect around the cursor.
 *
 * @param props - Component properties
 * @returns JSX element
 */
export const TextFlagCursor = memo<TextFlagCursorProps>(({ config = {}, className, ...rest }) => {
  // Merge default config with user-provided config
  const textFlagConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };

  // Use custom hook for cursor behavior
  useTextFlagCursor(textFlagConfig);

  // The component doesn't render anything visible directly
  // The canvas is created and managed by the hook
  return (
    <div
      className={`${styles['textflag-cursor-wrapper']} ${className ?? ''}`}
      data-testid="textflag-cursor"
      {...rest}
    />
  );
});

TextFlagCursor.displayName = 'TextFlagCursor';

export default TextFlagCursor;
