import { useTerminalAuth } from '@/hooks/use-terminal-auth';
import { supabase } from '@/integrations/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Lock, Mail, Twitter, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export type AuthMode = 'login' | 'signup';

export interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  anchorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode, anchorRef, onClose }) => {
  const [currentMode, setCurrentMode] = useState<AuthMode>(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const { login, signup } = useTerminalAuth();

  // Update mode when prop changes
  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  // Position the modal below the header
  useEffect(() => {
    if (anchorRef.current && isOpen) {
      const rect = anchorRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom,
        left: rect.left + rect.width / 2,
        width: Math.min(400, window.innerWidth - 40) // Responsive width
      });
    }
  }, [anchorRef, isOpen]);

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
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose, anchorRef]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const toggleMode = () => {
    setCurrentMode(currentMode === 'login' ? 'signup' : 'login');
    resetForm();
  };

  const validateForm = () => {
    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (currentMode === 'login') {
        const result = await login(email, password);
        if (result.success) {
          resetForm();
          onClose();
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
  };

  const handleOAuthLogin = async (provider: 'github' | 'google' | 'twitter') => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left - modalPosition.width / 2}px`,
            width: `${modalPosition.width}px`,
            zIndex: 50
          }}
          className="rounded-md border border-terminal-border shadow-lg terminal-glass overflow-hidden"
        >
          <div className="bg-terminal-background-translucent p-4 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-terminal-foreground text-lg font-medium">
                {currentMode === 'login' ? 'Login' : 'Create Account'}
              </h2>
              <button
                onClick={onClose}
                className="text-terminal-muted hover:text-terminal-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-terminal-foreground mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-terminal-muted" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-terminal-input text-terminal-foreground w-full pl-10 pr-3 py-2 rounded-md border border-terminal-border focus:outline-none focus:ring-2 focus:ring-terminal-prompt/50"
                    placeholder="your@email.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-terminal-foreground mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-terminal-muted" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="bg-terminal-input text-terminal-foreground w-full pl-10 pr-3 py-2 rounded-md border border-terminal-border focus:outline-none focus:ring-2 focus:ring-terminal-prompt/50"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              </div>

              {currentMode === 'signup' && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-terminal-foreground mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-terminal-muted" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="bg-terminal-input text-terminal-foreground w-full pl-10 pr-3 py-2 rounded-md border border-terminal-border focus:outline-none focus:ring-2 focus:ring-terminal-prompt/50"
                      placeholder="••••••••"
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-terminal-prompt text-terminal-background rounded-md hover:bg-terminal-prompt/90 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Processing...' : currentMode === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="relative flex items-center justify-center mt-4">
              <div className="border-t border-terminal-border flex-grow"></div>
              <span className="text-terminal-muted text-sm px-2">OR</span>
              <div className="border-t border-terminal-border flex-grow"></div>
            </div>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                disabled={loading}
                className="w-full flex items-center justify-center py-2 px-4 bg-[#24292e] text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 transition-colors"
              >
                <Github size={18} className="mr-2" />
                Continue with GitHub
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="w-full flex items-center justify-center py-2 px-4 bg-[#4285F4] text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#fff"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fff"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#fff"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('twitter')}
                disabled={loading}
                className="w-full flex items-center justify-center py-2 px-4 bg-[#1DA1F2] text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 transition-colors"
              >
                <Twitter size={18} className="mr-2" />
                Continue with Twitter
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-terminal-prompt text-sm hover:underline"
              >
                {currentMode === 'login'
                  ? 'Need an account? Sign up'
                  : 'Already have an account? Log in'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
