import { supabase } from '@/integrations/supabase/supabase.client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useTerminalAuth = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();

        if (!error && data.session) {
          setUserEmail(data.session.user.email);
          console.log('User is logged in:', data.session.user.email);
        }
      } catch (err) {
        console.error('Error checking session:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEmail(session?.user?.email || null);

      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user.email);
        toast.success(`Signed in as ${session?.user.email}`);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        toast.success('Signed out successfully');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(`Login failed: ${error.message}`);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Login failed: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        toast.error(`Signup failed: ${error.message}`);
        return { success: false, error: error.message };
      }

      toast.success('Signup successful! Please check your email for confirmation.');
      return { success: true, user: data.user };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Signup failed: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(`Logout failed: ${error.message}`);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
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
