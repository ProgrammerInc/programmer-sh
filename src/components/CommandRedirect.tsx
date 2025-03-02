
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { processCommand } from '@/utils/commands';
import { isValidCommand } from '@/utils/commands/urlCommandHandler';

const CommandRedirect = () => {
  const { command } = useParams<{ command: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!command || !isValidCommand(command)) {
      toast({
        title: 'Invalid Command',
        description: `Command '${command}' not recognized. Redirecting to home page.`,
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    // Store the command in session storage for the main page to execute
    sessionStorage.setItem('urlCommand', command);
    navigate('/');
  }, [command, navigate, toast]);

  return <div className="flex items-center justify-center h-screen">Executing command: {command}...</div>;
};

export default CommandRedirect;
