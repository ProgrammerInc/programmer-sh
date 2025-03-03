import Terminal from '@/components/ui/terminal';
import { Toaster } from '@/components/ui/toaster';
import Aurora from '@/utils/animations/aurora/aurora';
import Balatro from '@/utils/animations/balatro/balatro';
import Dither from '@/utils/animations/dither/dither';
import { LetterGlitch } from '@/utils/animations/letter-glitch';
import { Lightning } from '@/utils/animations/lightning';
import Threads from '@/utils/animations/threads/threads';
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
    document.title = `~/${titleCommand} - <programmer>._`;
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
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'aurora' && (
        <Aurora
          colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'balatro' && (
        <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} />
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'dither' && (
        <div id="ditherContainer" className="dither-container">
          <Dither
            waveColor={[0.5, 0.5, 0.5]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'letter-glitch' && (
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'lightning' && (
        <div id="lightningContainer" className="lightning-container">
          <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'threads' && (
        <div id="threadsContainer" className="threads-container">
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        </div>
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
