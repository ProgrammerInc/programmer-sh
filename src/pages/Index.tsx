import CursorProvider from '@/components/ui/cursor';
import Terminal from '@/components/ui/terminal';
import WallpaperProvider from '@/components/ui/wallpaper';
import wallpapers from '@/presets/wallpaper.presets';
import { getCurrentCursor } from '@/utils/commands/cursor-commands';
import { processThemeFromUrl } from '@/utils/commands/theme-commands';
import { extractUrlParameters, validUrlCommands } from '@/utils/commands/url-command-handler';
import { getCurrentWallpaper } from '@/utils/commands/wallpaper-commands';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const HISTORY_STORAGE_KEY = 'terminal_command_history';

const Index = () => {
  const { command: urlCommand } = useParams<{ command?: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [initialCommands, setInitialCommands] = useState<string[]>([]);

  // Container refs for primary components
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const wallpaperRef = useRef<HTMLDivElement>(null);

  // Use refs to track initialization status
  const cursorInitialized = useRef(false);
  const wallpaperInitialized = useRef(false);

  // Use state with lazy initialization to prevent multiple calls
  const [currentCursor, setCursor] = useState<string>(() => {
    if (!cursorInitialized.current) {
      cursorInitialized.current = true;
      return getCurrentCursor();
    }
    return 'default';
  });

  const [currentWallpaper, setCurrentWallpaper] = useState<string>(() => {
    if (!wallpaperInitialized.current) {
      wallpaperInitialized.current = true;
      return getCurrentWallpaper();
    }
    return 'particles';
  });
  const [currentCommand, setCurrentCommand] = useState<string>(urlCommand || 'welcome');

  // Update the document title when the current command changes
  useEffect(() => {
    const titleCommand = currentCommand || 'welcome';
    document.title = `~/${titleCommand} - <programmer>._`;
  }, [currentCommand]);

  // Add a ref to track if commands have been processed
  const commandsProcessed = useRef(false);

  useEffect(() => {
    // Only process commands once to prevent duplicate execution
    if (commandsProcessed.current) {
      return;
    }
    commandsProcessed.current = true;

    console.log('Processing URL commands with urlCommand:', urlCommand);

    // Process URL parameters - capture both the route parameter and any query parameters
    const currentUrl = location.pathname + location.search;
    const { command: pathCommand, theme } = extractUrlParameters(currentUrl);

    // Log all parameters for debugging
    console.log('URL parameters:', {
      urlCommand, // From route parameter
      pathCommand, // From URL extraction
      theme,
      currentUrl,
      validCommands: validUrlCommands
    });

    // Process theme parameter if present
    if (theme) {
      processThemeFromUrl(theme);
    }

    // Prepare initial commands
    let commands: string[] = [];

    // Log what we're doing
    console.log(
      'Processing URL parameters with high priority - will NOT show welcome if URL command exists'
    );

    // Determine valid command to execute
    const commandToExecute = urlCommand || pathCommand;

    console.log('URL command found:', commandToExecute);
    console.log('Valid URL commands array type:', typeof validUrlCommands);
    console.log('Valid URL commands length:', validUrlCommands.length);

    // If we have a command from the URL, add it to our initial commands
    if (commandToExecute) {
      // Force lowercase for consistent matching
      const normalizedCommand = commandToExecute.toLowerCase();

      // Check if exact command exists
      let isValidCommand = validUrlCommands.includes(normalizedCommand);

      // If not found, try case-insensitive search
      if (!isValidCommand) {
        isValidCommand = validUrlCommands.some(cmd => cmd.toLowerCase() === normalizedCommand);
      }

      console.log('Command to execute:', normalizedCommand);
      console.log('Is valid command:', isValidCommand);

      if (isValidCommand) {
        console.log('Valid URL command found:', normalizedCommand);
        setCurrentCommand(normalizedCommand);

        // Either replace welcome or add after welcome
        if (normalizedCommand === 'welcome') {
          commands = ['welcome'];
        } else {
          // Just execute the command directly
          commands = [normalizedCommand];
          console.log('Setting commands to:', commands);
        }
      } else {
        // Hard-code some known commands as a fallback
        const knownCommands = [
          'help',
          'about',
          'skills',
          'projects',
          'contact',
          'experience',
          'education'
        ];

        if (knownCommands.includes(normalizedCommand)) {
          console.log('Using fallback for known command:', normalizedCommand);
          commands = [normalizedCommand];
        } else {
          console.warn('Invalid URL command:', normalizedCommand);
          // If invalid command, we'll still show the welcome screen
          commands = ['welcome'];
          // Optionally show an error message about invalid command
          commands.push(
            `echo Command '${normalizedCommand}' not found. Try 'help' to see available commands.`
          );
        }
      }
    } else {
      // If no URL command was provided, show welcome
      console.log('No URL command found, showing welcome');
      commands = ['welcome'];
    }

    console.log('Initial commands to execute:', commands);

    setInitialCommands(commands);

    // Simulate loading for smoother entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [urlCommand, location]);

  // Listen for cursor changes
  useEffect(() => {
    const handleCursorChange = (event: Event) => {
      const { cursorId } = (event as CustomEvent).detail;

      setCursor(cursorId);
    };

    document.addEventListener('cursorChange', handleCursorChange);

    return () => {
      document.removeEventListener('cursorChange', handleCursorChange);
    };
  }, []);

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
    } else if (wallpaper.type === 'color') {
      classes.push('wallpaper-color');
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
    <div id="indexContainer" className={wallpaperClasses} ref={containerRef}>
      <WallpaperProvider
        id="wallpaperContainer"
        className="wallpaper-container"
        ref={wallpaperRef}
        wallpaper={wallpapers[currentWallpaper]}
      >
        <div id="terminalContainer" className="terminal-container" ref={terminalRef}>
          <div
            className={`h-[80vh] w-[80vw] max-w-4xl transition-all duration-1000 ease-out terminal-glow-shadow ${
              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <Terminal initialCommands={initialCommands} />
          </div>
        </div>
      </WallpaperProvider>
      <CursorProvider containerRef={containerRef} cursor={currentCursor} />
    </div>
  );
};

export default Index;
