
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Terminal from '@/components/Terminal';
import { Toaster } from '@/components/ui/toaster';
import { validUrlCommands, extractUrlParameters } from '@/utils/commands/urlCommandHandler';
import { processThemeFromUrl } from '@/utils/commands/themeCommand';
import { getCurrentWallpaper, wallpapers } from '@/utils/commands/wallpaperCommand';

const HISTORY_STORAGE_KEY = 'terminal_command_history';

const Index = () => {
  const { command: urlCommand } = useParams<{ command?: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [initialCommands, setInitialCommands] = useState<string[]>([]);
  const [currentWallpaper, setCurrentWallpaper] = useState<string>(getCurrentWallpaper());

  useEffect(() => {
    // Process URL parameters
    const currentUrl = location.pathname + location.search;
    const { command, theme } = extractUrlParameters(currentUrl);

    // Process theme parameter if present
    if (theme) {
      processThemeFromUrl(theme);
    }

    // Check if there's existing history
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);

    // Prepare initial commands
    let commands: string[] = [];

    // Show welcome command if there's no history
    if (!savedHistory || savedHistory === '[]') {
      commands.push('welcome');
    }

    // Determine valid command to execute
    const commandToExecute = command || urlCommand;

    // If we have a valid URL command, add it to our initial commands
    if (commandToExecute && validUrlCommands.includes(commandToExecute)) {
      console.log('Valid URL command found:', commandToExecute);

      // Either replace welcome or add after welcome
      if (commands.length === 0 || (commands.length === 1 && commands[0] === 'welcome')) {
        // If we're showing welcome, add the command after welcome
        commands = ['welcome', commandToExecute];
      } else {
        // Otherwise just use the URL command
        commands = [commandToExecute];
      }
    }

    setInitialCommands(commands);

    // Simulate loading for smoother entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [urlCommand, location]);

  // Listen for wallpaper changes
  useEffect(() => {
    const handleWallpaperChange = (event: Event) => {
      const { wallpaperId } = (event as CustomEvent).detail;
      setCurrentWallpaper(wallpaperId);
    };

    document.addEventListener('wallpaperChange', handleWallpaperChange);
    return () => {
      document.removeEventListener('wallpaperChange', handleWallpaperChange);
    };
  }, []);

  // Prepare wallpaper style
  const getWallpaperStyle = () => {
    const wallpaper = wallpapers[currentWallpaper];
    
    if (wallpaper.type === 'gradient') {
      return {
        background: 'black',
        backgroundImage: `
          radial-gradient(circle at 30% 30%, rgba(100, 255, 218, 0.05), rgba(0, 0, 0, 0)),
          radial-gradient(circle at 70% 70%, rgba(100, 255, 218, 0.05), rgba(0, 0, 0, 0))
        `
      };
    } else if (wallpaper.type === 'image' && wallpaper.url) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${wallpaper.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    return {};
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden" style={getWallpaperStyle()}>
      <div
        className={`w-full max-w-4xl h-[80vh] transition-all duration-1000 ease-out terminal-glow-shadow ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <Terminal initialCommands={initialCommands} />
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
