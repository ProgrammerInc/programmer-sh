import { createFeatureLogger } from '@/services/logger/logger.utils';
import { useEffect } from 'react';

// Create a dedicated logger for outside click detection
const outsideClickLogger = createFeatureLogger('OutsideClick');

/**
 * Custom hook that handles clicks outside of a specified element
 * @param ref - React ref object pointing to the element to monitor
 * @param callback - Function to call when a click outside is detected
 */
export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent | TouchEvent) => void
): void => {
  useEffect(() => {
    try {
      outsideClickLogger.debug('Setting up outside click detection');

      const listener = (event: MouseEvent | TouchEvent): void => {
        try {
          // Do nothing if the element being clicked is the target element or their children
          if (!ref.current || !event.target) {
            return;
          }

          // Check if the click is outside the referenced element
          const target = event.target as Node;
          if (ref.current.contains(target)) {
            return;
          }

          // Call the callback if the click is outside
          callback(event);
          outsideClickLogger.debug('Outside click detected');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          outsideClickLogger.error('Error handling outside click event', { error: errorMessage });
        }
      };

      // Add event listeners for mouse and touch events
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      // Cleanup function
      return () => {
        try {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
          outsideClickLogger.debug('Outside click detection cleanup complete');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          outsideClickLogger.error('Error during outside click cleanup', { error: errorMessage });
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      outsideClickLogger.error('Error setting up outside click detection', { error: errorMessage });
      return () => {}; // Empty cleanup function
    }
  }, [ref, callback]);
};

export default useOutsideClick;
