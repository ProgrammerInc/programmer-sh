import { AuthModalContext, AuthModalContextType } from '@/components/ui/auth-modal';
import { useContext } from 'react';

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

export default useAuthModal;
