/**
 * Character Cursor
 *
 * CharacterCursor component that displays trailing characters following the cursor
 *
 * @module CharacterCursor
 */

'use client';

import { memo, useEffect, useRef } from 'react';
import { useCharacterCursorHooks } from './character-cursor.hooks';
import { CharacterCursorProps } from './character-cursor.types';

/**
 * CharacterCursor component that displays animated characters following the cursor.
 * This component creates animated text that follows the user's cursor movements.
 *
 * @param props - Component props
 * @returns React component
 */
export const CharacterCursor = memo<CharacterCursorProps>(
  ({
    characters = ['p', 'r', 'o', 'g', 'r', 'a', 'm', 'm', 'e', 'r'],
    colors = ['#6622CC', '#A755C2', '#B07C9E', '#B59194', '#D2A1B8'],
    cursorOffset = { x: 0, y: 0 },
    font = '15px serif',
    characterLifeSpanFunction = () => Math.floor(Math.random() * 60 + 80),
    initialCharacterVelocityFunction = () => ({
      x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5,
      y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5
    }),
    characterVelocityChangeFunctions = {
      x_func: () => (Math.random() < 0.5 ? -1 : 1) / 30,
      y_func: () => (Math.random() < 0.5 ? -1 : 1) / 15
    },
    characterScalingFunction = (age, lifeSpan) => Math.max(((lifeSpan - age) / lifeSpan) * 2, 0),
    characterNewRotationDegreesFunction = (age, lifeSpan) => (lifeSpan - age) / 5,
    wrapperElement
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Get hooks and functions from the custom hook
    const { stateRef, handleMouseMove, handleTouchMove, handleResize, cleanup, initCanvas } =
      useCharacterCursorHooks({
        characters,
        colors,
        cursorOffset,
        font,
        characterLifeSpanFunction,
        initialCharacterVelocityFunction,
        characterVelocityChangeFunctions,
        characterScalingFunction,
        characterNewRotationDegreesFunction,
        wrapperElement
      });

    // Initialize/cleanup the cursor system
    useEffect(() => {
      // Prevent execution if prefers-reduced-motion is enabled
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        console.log(
          'This browser has prefers reduced motion turned on, so the cursor did not init'
        );
        return () => {};
      }

      // Setup state and mark as mounted
      stateRef.current.mounted = true;

      // Store current refs to avoid closure issues
      const currentStateRef = stateRef;
      const currentCanvasRef = canvasRef.current;

      try {
        // Initialize canvas
        initCanvas(currentCanvasRef);

        // Create resize handler with captured ref to avoid stale closure issues
        const resizeHandler = () => handleResize(currentCanvasRef);

        // Add event listeners
        const element = wrapperElement || document.body;
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('touchmove', handleTouchMove, { passive: true });
        element.addEventListener('touchstart', handleTouchMove, { passive: true });
        window.addEventListener('resize', resizeHandler);

        // Cleanup function
        return () => {
          // Mark as unmounted to prevent further updates
          currentStateRef.current.mounted = false;

          // Remove event listeners
          element.removeEventListener('mousemove', handleMouseMove);
          element.removeEventListener('touchmove', handleTouchMove);
          element.removeEventListener('touchstart', handleTouchMove);
          window.removeEventListener('resize', resizeHandler);

          // Clean up resources
          cleanup();
        };
      } catch (error) {
        console.error('Error initializing CharacterCursor:', error);
        return () => {};
      }
    }, [
      stateRef,
      handleMouseMove,
      handleTouchMove,
      handleResize,
      cleanup,
      initCanvas,
      wrapperElement
    ]);

    return <canvas ref={canvasRef} />;
  }
);

CharacterCursor.displayName = 'CharacterCursor';

export default CharacterCursor;
