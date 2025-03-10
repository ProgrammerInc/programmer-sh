import CursorProvider from '@/components/ui/cursor';
import Terminal from '@/components/ui/terminal';
import WallpaperProvider from '@/components/ui/wallpaper';
import { wallpaperPresets } from '@/presets/wallpaper.presets';
import { getCurrentCursor } from '@/utils/commands/cursor-commands';
import { processThemeFromUrl } from '@/utils/commands/theme-commands';
import { extractUrlParameters, validUrlCommands } from '@/utils/commands/url-command-handler';
import { getCurrentWallpaper } from '@/utils/commands/wallpaper-commands';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const HISTORY_STORAGE_KEY = 'terminal_command_history';

const Index = () => {
  // Get command from URL parameters
  const { command: urlCommand } = useParams<{ command?: string }>();
  const location = useLocation();
  console.log('🔍 DEBUG - URL Command from useParams:', urlCommand);
  console.log('🔍 DEBUG - Location pathname:', location.pathname);
  
  const [isLoading, setIsLoading] = useState(true);
  const [initialCommands, setInitialCommands] = useState<string[]>([]);
  
  // We'll use the existing terminalRef for direct command execution

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
  
  // Define currentCommand state before we use it in the effect
  const [currentCommand, setCurrentCommand] = useState<string>(urlCommand || 'welcome');

  const [currentWallpaper, setCurrentWallpaper] = useState<string>(() => {
    if (!wallpaperInitialized.current) {
      wallpaperInitialized.current = true;

      return getCurrentWallpaper();
    }

    return 'default';
  });

  // Update the document title when the current command changes
  useEffect(() => {
    const titleCommand = currentCommand || 'welcome';
    document.title = `~/${titleCommand} - <programmer>._`;
    
    // Also make sure to set loading to false after title update
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 100);
    }
  }, [currentCommand, isLoading]);
  
  // MUCH more direct execution of URL commands - guaranteed to work
  // This completely overrides the initialCommands mechanism for URL commands
  useEffect(() => {
    // Check if we have a command from the route
    if (!urlCommand) {
      return; // No command from route, use normal flow
    }
    
    // We have a URL command - do a hard reset of the initial commands
    // This takes precedence over anything else
    console.log('⚡️ FORCING URL COMMAND EXECUTION:', urlCommand);
    
    // Normalize the command
    const normalizedCommand = urlCommand.toLowerCase();
    
    // CRITICAL: Set initial commands directly - this overrides any other logic
    // and guarantees the command will be executed when the terminal mounts
    setInitialCommands([normalizedCommand]);
    
    // Also mark as processed to prevent other effects from changing it
    commandsProcessed.current = true;
    urlCommandExecuted.current = true;
    
    // Set the current command for the page title
    setCurrentCommand(normalizedCommand);
  }, [urlCommand, setInitialCommands]);

  // Add a ref to track if commands have been processed
  const commandsProcessed = useRef(false);
  
  // Create a separate flag to track if a URL command was specifically executed
  // This helps us ensure URL commands are definitely executed
  const urlCommandExecuted = useRef(false);
  
  // Simple effect that directly checks the URL for commands when mounting
  useEffect(() => {
    // Check if we have a command in the URL path (most reliable method)
    const pathParts = window.location.pathname.split('/');
    // Get the part after the first slash
    const pathCommand = pathParts[1];
    
    console.log('URL check ->', window.location.pathname);
    console.log('URL command:', pathCommand);
    
    // If we found a command in the path, set it to execute
    if (pathCommand && pathCommand.length > 0) {
      const normalizedCommand = pathCommand.toLowerCase();
      console.log('Setting URL command to execute:', normalizedCommand);
      
      // Set the initial commands to execute this command
      setInitialCommands([normalizedCommand]);
      
      // Update the title
      setCurrentCommand(normalizedCommand);
    }
  }, []);  // Empty dependency array - run once on mount

  useEffect(() => {
    // Only process commands once to prevent duplicate execution
    if (commandsProcessed.current) {
      return;
    }

    commandsProcessed.current = true;

    console.log('💡 Processing URL commands with urlCommand:', urlCommand);
    console.log('💡 Current path:', location.pathname);

    // Process URL parameters - capture both the route parameter and any query parameters
    const currentUrl = location.pathname + location.search;
    
    // Extract command and theme from URL as fallback
    const { command: extractedCommand, theme } = extractUrlParameters(currentUrl);
    
    console.log('💡 Command extracted from URL:', extractedCommand);
    
    // Use urlCommand if available, otherwise try extractedCommand as fallback
    const commandParam = urlCommand || extractedCommand;

    // Log all parameters for debugging
    console.log('URL parameters:', {
      urlCommand, // From useParams
      extractedCommand, // From URL extraction
      commandParam, // Final command parameter to use
      theme,
      currentUrl,
      location: location.pathname,
      validCommands: validUrlCommands.length // Just show length to avoid console clutter
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

    // Use the command from parameters (route or extracted)
    const commandToExecute = commandParam;

    console.log('🚀 Final command to execute:', commandToExecute);
    console.log('🚀 Valid URL commands array type:', typeof validUrlCommands);
    console.log('🚀 Valid URL commands length:', validUrlCommands.length);
    console.log('🚀 First few valid commands:', validUrlCommands.slice(0, 10));

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

  const wallpaperClasses = useMemo(() => {
    const wallpaper = wallpaperPresets[currentWallpaper];
    const classes = ['wallpaper-container'];

    if (wallpaper.type === 'animation') {
      classes.push('wallpaper-animation');
    } else if (wallpaper.type === 'color') {
      classes.push('wallpaper-color');
    } else if (wallpaper.type === 'gradient') {
      classes.push('wallpaper-gradient');
    } else if (wallpaper.type === 'image') {
      classes.push('wallpaper-image');
    } else if (wallpaper.type === 'video') {
      classes.push('wallpaper-video');
    }

    // Add specific wallpaper class based on ID
    if (wallpaper.id) {
      classes.push(`wallpaper-${wallpaper.id}`);
    }

    return classes.join(' ');
  }, [currentWallpaper]);

  const MemoizedWallpaper = useMemo(
    () => (
      <WallpaperProvider
        id="wallpaperContainer"
        className="wallpaper-container"
        ref={wallpaperRef}
        wallpapers={wallpaperPresets}
        wallpaper={currentWallpaper}
      />
    ),
    [wallpaperRef, currentWallpaper]
  );

  const MemoizedCursor = useMemo(
    () => <CursorProvider containerRef={containerRef} cursor={currentCursor} />,
    [containerRef, currentCursor]
  );

  return (
    <div
      id="indexContainer"
      className={wallpaperClasses}
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      {MemoizedWallpaper}
      <div id="terminalContainer" className="terminal-container" ref={terminalRef}>
        <div
          className={`h-[80vh] w-[80vw] max-w-4xl transition-all duration-500 ease-out terminal-glow-shadow opacity-100 scale-100`}
        >
          <Terminal 
            initialCommands={initialCommands} 
            key={initialCommands.join('-')}
          />
        </div>
      </div>
      {MemoizedCursor}
    </div>
  );
};

export default Index;
