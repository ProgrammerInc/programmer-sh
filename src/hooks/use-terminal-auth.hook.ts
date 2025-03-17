import { supabase } from '@/integrations/supabase/supabase.client';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Create a dedicated logger for terminal authentication
const terminalAuthLogger = createFeatureLogger('TerminalAuth');

/**
 * Interface for authentication response
 */
interface AuthResponse<T = unknown> {
  success: boolean;
  error?: string;
  user?: T;
}

/**
 * Custom hook for terminal authentication functionality
 * @returns Object containing authentication state and methods
 */
export const useTerminalAuth = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();

        if (!error && data.session) {
          setUserEmail(data.session.user.email);
          terminalAuthLogger.info('User is logged in', { email: data.session.user.email });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        terminalAuthLogger.error('Error checking session', { error: errorMessage });
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      try {
        setUserEmail(session?.user?.email || null);

        if (event === 'SIGNED_IN') {
          terminalAuthLogger.info('User signed in', { email: session?.user.email });
          toast.success(`Signed in as ${session?.user.email}`);
        } else if (event === 'SIGNED_OUT') {
          terminalAuthLogger.info('User signed out');
          toast.success('Signed out successfully');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        terminalAuthLogger.error('Error in auth state change handler', { error: errorMessage });
      }
    });

    return () => {
      try {
        authListener.subscription.unsubscribe();
        terminalAuthLogger.debug('Auth listener unsubscribed');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        terminalAuthLogger.error('Error unsubscribing from auth listener', { error: errorMessage });
      }
    };
  }, []);

  /**
   * Log in a user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Authentication response with success status and user or error
   */
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      terminalAuthLogger.debug('Attempting login', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        terminalAuthLogger.error('Login failed', { error: error.message });
        toast.error(`Login failed: ${error.message}`);
        return { success: false, error: error.message };
      }

      terminalAuthLogger.info('Login successful', { email });
      return { success: true, user: data.user };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      terminalAuthLogger.error('Login exception', { error: errorMessage });
      toast.error(`Login failed: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign up a new user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Authentication response with success status and user or error
   */
  const signup = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      terminalAuthLogger.debug('Attempting signup', { email });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        terminalAuthLogger.error('Signup failed', { error: error.message });
        toast.error(`Signup failed: ${error.message}`);
        return { success: false, error: error.message };
      }

      terminalAuthLogger.info('Signup successful', { email });
      toast.success('Signup successful! Please check your email for confirmation.');
      return { success: true, user: data.user };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      terminalAuthLogger.error('Signup exception', { error: errorMessage });
      toast.error(`Signup failed: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out the current user
   * @returns Authentication response with success status or error
   */
  const logout = async (): Promise<AuthResponse> => {
    try {
      setLoading(true);
      terminalAuthLogger.debug('Attempting logout');
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        terminalAuthLogger.error('Logout failed', { error: error.message });
        toast.error(`Logout failed: ${error.message}`);
        return { success: false, error: error.message };
      }

      terminalAuthLogger.info('Logout successful');
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      terminalAuthLogger.error('Logout exception', { error: errorMessage });
      toast.error(`Logout failed: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    userEmail,
    setUserEmail,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!userEmail
  };
};

export default useTerminalAuth;
