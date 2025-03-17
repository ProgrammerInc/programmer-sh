import { AuthModalContext, AuthModalContextType } from '@/components/ui/auth-modal';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { useContext } from 'react';

// Create a dedicated logger for auth modal management
const authModalLogger = createFeatureLogger('AuthModal');

/**
 * Custom hook to access the AuthModalContext
 * @returns The auth modal context containing state and functions to control the auth modal
 * @throws Error if used outside of an AuthModalProvider
 */
export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  
  if (context === undefined) {
    const error = new Error('useAuthModal must be used within an AuthModalProvider');
    authModalLogger.error('Context access error', { 
      error: error.message,
      stack: error.stack 
    });
    throw error;
  }
  
  authModalLogger.debug('Auth modal context accessed');
  return context;
};

export default useAuthModal;
