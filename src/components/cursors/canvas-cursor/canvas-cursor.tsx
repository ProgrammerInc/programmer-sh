/**
 * Canvas Cursor Component
 *
 * A customizable cursor component that uses HTML5 Canvas for rendering
 * cursor effects and animations.
 *
 * @module CanvasCursor
 */
'use client';

import { createFeatureLogger } from '@/services/logger/logger.utils';
import { memo, useEffect, useRef } from 'react';
import { useCanvasCursorHooks } from './canvas-cursor.hooks';
import { CanvasCursorProps } from './canvas-cursor.types';

// Create a dedicated logger for canvas cursor
const canvasCursorLogger = createFeatureLogger('CanvasCursor');

/**
 * CanvasCursor component that creates canvas-based cursor effects
 * and handles mouse/touch interactions.
 *
 * @param {CanvasCursorProps} props - Component properties
 * @param {HTMLElement} props.wrapperElement - The wrapper element for the canvas cursor
 * @returns {JSX.Element} React component
 */
export const CanvasCursor = memo<CanvasCursorProps>(({ wrapperElement }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    stateRef,
    handleMouseMove,
    handleTouchMove,
    handleTouchStart,
    resizeCanvas,
    cleanup,
    initCanvas
  } = useCanvasCursorHooks();

  // Initialize the canvas when component mounts
  useEffect(() => {
    // Set mounted flag
    stateRef.current.mounted = true;

    // Store a reference to prevent stale closure issues
    const currentStateRef = stateRef;
    const currentCanvasRef = canvasRef.current;

    try {
      initCanvas(currentCanvasRef);

      // Create resize handler with captured ref to avoid stale closure issues
      const handleResize = () => resizeCanvas(currentCanvasRef);

      // Add event listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        // Set mounted to false to prevent further updates
        currentStateRef.current.mounted = false;

        try {
          // Remove event listeners
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('resize', handleResize);

          // Clean up resources
          cleanup();

          canvasCursorLogger.debug('Canvas cursor cleanup complete');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          canvasCursorLogger.error('Error during canvas cursor cleanup', { error: errorMessage });
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      canvasCursorLogger.error('Error initializing canvas cursor', { error: errorMessage });
      return () => {}; // Return empty cleanup function if initialization fails
    }
  }, [
    handleMouseMove,
    handleTouchMove,
    handleTouchStart,
    resizeCanvas,
    cleanup,
    initCanvas,
    stateRef
  ]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" />;
});

export default CanvasCursor;
