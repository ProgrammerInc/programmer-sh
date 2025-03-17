import { createFeatureLogger } from '@/services/logger/logger.utils';
import { createContext, useContext } from 'react';

// Create a dedicated logger for modal management
const modalLogger = createFeatureLogger('Modal');

/**
 * Interface for modal context type
 */
export interface ModalContextType {
  /** Whether the modal is open */
  open: boolean;
  /** Function to set the modal's open state */
  setOpen: (open: boolean) => void;
}

/**
 * Context for modal state management
 */
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * Custom hook to access the ModalContext
 * @returns The modal context containing open state and setOpen function
 * @throws Error if used outside of a ModalProvider
 */
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  
  if (!context) {
    const error = new Error('useModal must be used within a ModalProvider');
    modalLogger.error('Context access error', { 
      error: error.message,
      stack: error.stack 
    });
    throw error;
  }
  
  modalLogger.debug('Modal context accessed', { isOpen: context.open });
  return context;
};

export default useModal;
