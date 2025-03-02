
import { useState, useEffect } from 'react';
import Terminal from '@/components/Terminal';

const HISTORY_STORAGE_KEY = 'terminal_command_history';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialCommands, setInitialCommands] = useState<string[]>([]);

  useEffect(() => {
    // Check if there's existing history
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        
        // Check if there's history and if the last command was NOT 'welcome'
        if (parsedHistory.length > 0) {
          const lastCommand = parsedHistory[parsedHistory.length - 1].command;
          
          // Only show welcome if it wasn't the last command
          if (lastCommand !== 'welcome') {
            setInitialCommands(['welcome']);
          } else {
            // Don't show welcome again if it was the last command
            setInitialCommands([]);
          }
        } else {
          // Empty history, show welcome
          setInitialCommands(['welcome']);
        }
      } catch (error) {
        // Error parsing history, show welcome as fallback
        console.error('Error parsing history:', error);
        setInitialCommands(['welcome']);
      }
    } else {
      // No history at all, show welcome
      setInitialCommands(['welcome']);
    }
    
    // Simulate loading for smoother entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(100,255,218,0.05),rgba(0,0,0,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(100,255,218,0.05),rgba(0,0,0,0))]"></div>
      </div>

      <div
        className={`w-full max-w-4xl h-[80vh] transition-all duration-1000 ease-out terminal-glow-shadow ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <Terminal initialCommands={initialCommands} />
      </div>
    </div>
  );
};

export default Index;
