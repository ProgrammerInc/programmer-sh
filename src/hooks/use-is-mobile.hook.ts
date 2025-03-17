import { createFeatureLogger } from '@/services/logger/logger.utils';
import * as React from 'react';

// Create a dedicated logger for the isMobile feature
const isMobileLogger = createFeatureLogger('IsMobile');

/**
 * Mobile breakpoint in pixels
 * Screens below this width are considered mobile devices
 */
export const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook to detect if the current device is a mobile device based on screen width
 * @returns {boolean} True if the device is a mobile device, false otherwise
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    try {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

      const onChange = () => {
        const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
        setIsMobile(newIsMobile);
        isMobileLogger.debug('Mobile status changed', { isMobile: newIsMobile });
      };

      // Add event listener for screen size changes
      mql.addEventListener('change', onChange);

      // Set initial value
      const initialIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(initialIsMobile);
      isMobileLogger.debug('Initial mobile status detected', { isMobile: initialIsMobile });

      // Clean up function
      return () => {
        try {
          mql.removeEventListener('change', onChange);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          isMobileLogger.error('Error removing media query listener', { error: errorMessage });
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      isMobileLogger.error('Error setting up mobile detection', { error: errorMessage });
      setIsMobile(false); // Default to desktop view on error
      return () => {}; // Empty cleanup function
    }
  }, []);

  return !!isMobile;
}

export default useIsMobile;
