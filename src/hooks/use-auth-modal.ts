import { AuthModalContext } from '@/contexts/auth-modal-context';
import { useContext } from 'react';

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

export default useAuthModal;
