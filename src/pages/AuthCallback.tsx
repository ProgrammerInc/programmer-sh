import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // The hash contains the token & other info from OAuth providers
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setError(error.message);
          toast.error(`Authentication failed: ${error.message}`);
          return;
        }

        if (data?.session) {
          toast.success(`Successfully signed in as ${data.session.user.email}`);
        }

        // Redirect to home after successful authentication
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Error during auth callback:', err);
        setError('An unexpected error occurred during authentication.');
        toast.error('Authentication failed. Please try again.');
      }
    };

    // Process the callback when component mounts
    handleAuthCallback();
  }, [navigate]);

  // Show loading or error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-terminal-background text-terminal-foreground">
        <div className="p-8 rounded-md border border-terminal-border terminal-glass">
          <h1 className="text-2xl font-semibold mb-4 text-terminal-prompt">Authentication Error</h1>
          <p>{error}</p>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="mt-4 px-4 py-2 bg-terminal-prompt text-terminal-background rounded-md"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Show loading state while processing
  return (
    <div className="h-screen flex items-center justify-center bg-terminal-background text-terminal-foreground">
      <div className="p-8 rounded-md border border-terminal-border terminal-glass">
        <h1 className="text-2xl font-semibold mb-4 text-terminal-prompt">Authenticating...</h1>
        <p>Please wait while we complete your authentication.</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-terminal-prompt border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
