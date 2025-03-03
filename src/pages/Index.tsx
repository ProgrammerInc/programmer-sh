import Terminal from '@/components/ui/terminal';
import { Toaster } from '@/components/ui/toaster';
import { LetterGlitch } from '@/utils/animations/letter-glitch';
import { processThemeFromUrl } from '@/utils/commands/themeCommand';
import { extractUrlParameters, validUrlCommands } from '@/utils/commands/urlCommandHandler';
import { getCurrentWallpaper, wallpapers } from '@/utils/commands/wallpaperCommand';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const HISTORY_STORAGE_KEY = 'terminal_command_history';

const Index = () => {
  const { command: urlCommand } = useParams<{ command?: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [initialCommands, setInitialCommands] = useState<string[]>([]);
  const [currentWallpaper, setCurrentWallpaper] = useState<string>(getCurrentWallpaper());
  const [currentCommand, setCurrentCommand] = useState<string>('portfolio');

  // Update the document title when the current command changes
  useEffect(() => {
    const titleCommand = currentCommand || 'portfolio';
    document.title = `~/${titleCommand} - &lt;programmer&gt;._`;
  }, [currentCommand]);

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

    // Always show welcome command if there's no history or we're at the root URL
    if (!savedHistory || savedHistory === '[]' || location.pathname === '/') {
      commands.push('welcome');
      setCurrentCommand('welcome');
    }

    // Determine valid command to execute
    const commandToExecute = command || urlCommand;

    // If we have a valid URL command, add it to our initial commands
    if (commandToExecute && validUrlCommands.includes(commandToExecute)) {
      console.log('Valid URL command found:', commandToExecute);
      setCurrentCommand(commandToExecute);

      // Either replace welcome or add after welcome
      if (commands.length === 0) {
        // If we're not already showing welcome, just use the URL command
        commands = [commandToExecute];
      } else {
        // If we're showing welcome, add the command after welcome
        commands = ['welcome', commandToExecute];
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

  // Listen for command execution to update page title
  useEffect(() => {
    const handleCommandExecution = (event: Event) => {
      const { command } = (event as CustomEvent).detail;
      if (command && typeof command === 'string') {
        setCurrentCommand(command);
      }
    };

    document.addEventListener('commandExecuted', handleCommandExecution);
    return () => {
      document.removeEventListener('commandExecuted', handleCommandExecution);
    };
  }, []);

  // Get wallpaper class names
  const getWallpaperClasses = () => {
    const wallpaper = wallpapers[currentWallpaper];
    const classes = ['wallpaper-container'];

    if (wallpaper.type === 'animation') {
      classes.push('wallpaper-animation');
    } else if (wallpaper.type === 'gradient') {
      classes.push('wallpaper-gradient');
    } else if (wallpaper.type === 'image') {
      classes.push('wallpaper-image');

      // Add specific wallpaper class based on ID
      if (wallpaper.id) {
        classes.push(`wallpaper-${wallpaper.id}`);
      }
    }

    return classes.join(' ');
  };

  const wallpaperClasses = getWallpaperClasses();

  return (
    <div className={wallpaperClasses}>
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'letter-glitch' && (
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
        />
      )}
      <div id="terminalContainer" className="terminal-container">
        <div
          className={`h-[80vh] w-[80vw] max-w-4xl transition-all duration-1000 ease-out terminal-glow-shadow ${
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <Terminal initialCommands={initialCommands} />
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Index;
