
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useTerminalAuth = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session) {
        setUserEmail(data.session.user.email);
        console.log('User is logged in:', data.session.user.email);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEmail(session?.user?.email);
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user.email);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { userEmail, setUserEmail };
};
