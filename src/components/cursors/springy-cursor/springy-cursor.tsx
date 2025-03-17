/**
 * SpringyCursor Component
 *
 * A cursor component that displays a chain of springy particles that follow the mouse cursor
 * with physics-based animation.
 *
 * @module SpringyCursor
 */
'use client';

import { memo, useRef } from 'react';
import { DEFAULT_EMOJI } from './springy-cursor.constants';
import { useSpringyCursor } from './springy-cursor.hooks';
import styles from './springy-cursor.module.css';
import { SpringyCursorProps } from './springy-cursor.types';

/**
 * SpringyCursor component that creates a chain of springy particles following the cursor.
 * Uses physics-based animation to create realistic spring behavior.
 *
 * @param props - Component properties
 * @returns JSX element
 */
export const SpringyCursor = memo<SpringyCursorProps>(
  ({ emoji = DEFAULT_EMOJI, wrapperElement }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Use our custom hook to implement the springy cursor behavior
    // The containerRef is used to access the DOM element where the particles will be rendered
    useSpringyCursor({ emoji, wrapperElement }, canvasRef);

    return <canvas ref={canvasRef} className={styles['springy-cursor-canvas']} />;
  }
);

SpringyCursor.displayName = 'SpringyCursor';

export default SpringyCursor;
