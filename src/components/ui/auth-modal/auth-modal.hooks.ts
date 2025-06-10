/**
 * Auth Modal Hooks
 *
 * Custom hooks for the Auth Modal component.
 */

'use client';

import { useTerminalAuth } from '@/hooks/use-terminal-auth.hook';
import { supabase } from '@/integrations/supabase/supabase.client';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { AuthModalContext } from './auth-modal.context';
import { AuthMode } from './auth-modal.types';
import { getModalPosition, getOAuthRedirectUrl, validateEmail } from './auth-modal.utils';

/**
 * Hook that provides access to the Auth Modal context
 *
 * @returns Auth Modal context values
 * @throws Error if used outside of AuthModalProvider
 */
export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

/**
 * Hook for Auth Modal form state management
 *
 * @param initialMode - Initial auth mode ('login' or 'signup')
 * @returns Form state and handlers
 */
export const useAuthForm = (initialMode: AuthMode) => {
  const [currentMode, setCurrentMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useTerminalAuth();

  // Update mode when prop changes
  useEffect(() => {
    setCurrentMode(initialMode);
  }, [initialMode]);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, []);

  const toggleMode = useCallback(() => {
    setCurrentMode(currentMode === 'login' ? 'signup' : 'login');
    resetForm();
  }, [currentMode, resetForm]);

  const validateForm = useCallback(() => {
    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return false;
    }

    if (!password) {
      toast.error('Password is required');
      return false;
    }

    if (currentMode === 'signup') {
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }
    }

    return true;
  }, [email, password, confirmPassword, currentMode]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent, onSuccess?: () => void) => {
      e.preventDefault();

      if (!validateForm()) return;

      setLoading(true);

      try {
        if (currentMode === 'login') {
          const result = await login(email, password);
          if (result.success) {
            resetForm();
            onSuccess?.();
          }
        } else {
          const result = await signup(email, password);
          if (result.success) {
            resetForm();
            setCurrentMode('login');
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    },
    [currentMode, email, password, login, signup, validateForm, resetForm]
  );

  const handleOAuthLogin = useCallback(async (provider: 'github' | 'google' | 'twitter') => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getOAuthRedirectUrl()
        }
      });

      if (error) {
        toast.error(`${provider} login failed: ${error.message}`);
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`${provider} login failed`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    currentMode,
    setCurrentMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    resetForm,
    toggleMode,
    handleSubmit,
    handleOAuthLogin
  };
};

/**
 * Hook for modal positioning and click-outside handling
 *
 * @param isOpen - Whether the modal is open
 * @param anchorRef - Reference to the anchor element
 * @param onClose - Function to call when closing the modal
 * @returns Modal ref and position
 */
export const useModalPosition = (
  isOpen: boolean,
  anchorRef: React.RefObject<HTMLDivElement>,
  onClose: () => void
) => {
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to update modal position
  const updateModalPosition = useCallback(() => {
    if (anchorRef.current && isOpen) {
      setModalPosition(getModalPosition(anchorRef.current));
    }
  }, [anchorRef, isOpen]);

  // Position the modal when opened and anchor changes
  useEffect(() => {
    updateModalPosition();
  }, [updateModalPosition]);

  // Update position on window resize
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      updateModalPosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, updateModalPosition]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return { modalRef, modalPosition };
};
