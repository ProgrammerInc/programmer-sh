import { createFeatureLogger } from '@/services/logger/logger.utils';
import { createContext, useContext } from 'react';

// Create a dedicated logger for mouse enter tracking
const mouseEnterLogger = createFeatureLogger('MouseEnter');

/**
 * Type definition for the MouseEnterContext value
 * Tuple containing the current state and a function to update it
 */
type MouseEnterContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

/**
 * Context for tracking mouse enter state across components
 */
export const MouseEnterContext = createContext<MouseEnterContextType | undefined>(undefined);

/**
 * Custom hook to access the MouseEnterContext
 * @returns A tuple containing the mouse enter state and a function to update it
 * @throws Error if used outside of a MouseEnterProvider
 */
export const useMouseEnter = (): MouseEnterContextType => {
  const context = useContext(MouseEnterContext);

  if (context === undefined) {
    const error = new Error('useMouseEnter must be used within a MouseEnterProvider');
    mouseEnterLogger.error('Context access error', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }

  mouseEnterLogger.debug('Mouse enter context accessed');
  return context;
};

export default useMouseEnter;
