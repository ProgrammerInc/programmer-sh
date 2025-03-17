'use client';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

// Create a dedicated logger for mouse tracking
const mouseLogger = createFeatureLogger('MouseTracker');

/**
 * Interface representing the state of the mouse
 */
interface MouseState {
  x: number | null;
  y: number | null;
  elementX: number | null;
  elementY: number | null;
  elementPositionX: number | null;
  elementPositionY: number | null;
}

/**
 * Custom hook for tracking mouse position relative to the document and a ref element
 * @returns A tuple containing the mouse state and a ref to attach to an element
 */
export function useMouse(): [MouseState, RefObject<HTMLDivElement>] {
  const [state, setState] = useState<MouseState>({
    x: null,
    y: null,
    elementX: null,
    elementY: null,
    elementPositionX: null,
    elementPositionY: null
  });

  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    try {
      mouseLogger.debug('Initializing mouse tracking');

      const handleMouseMove = (event: MouseEvent) => {
        try {
          const newState: Partial<MouseState> = {
            x: event.pageX,
            y: event.pageY
          };

          if (ref.current instanceof Element) {
            const { left, top } = ref.current.getBoundingClientRect();
            const elementPositionX = left + window.scrollX;
            const elementPositionY = top + window.scrollY;
            const elementX = event.pageX - elementPositionX;
            const elementY = event.pageY - elementPositionY;

            newState.elementX = elementX;
            newState.elementY = elementY;
            newState.elementPositionX = elementPositionX;
            newState.elementPositionY = elementPositionY;
          }

          setState(s => ({
            ...s,
            ...newState
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          mouseLogger.error('Error tracking mouse movement', { error: errorMessage });
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      mouseLogger.debug('Mouse tracking initialized');

      return () => {
        try {
          document.removeEventListener('mousemove', handleMouseMove);
          mouseLogger.debug('Mouse tracking cleanup complete');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          mouseLogger.error('Error during mouse tracking cleanup', { error: errorMessage });
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      mouseLogger.error('Error setting up mouse tracking', { error: errorMessage });
      return () => {}; // Empty cleanup function
    }
  }, []);

  return [state, ref];
}
