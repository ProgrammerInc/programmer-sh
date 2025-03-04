import { Waves } from '@/components/animations';
import Aurora from '@/components/animations/aurora/aurora';
import Balatro from '@/components/animations/balatro/balatro';
import Ballpit from '@/components/animations/ballpit/ballpit';
import Dither from '@/components/animations/dither/dither';
import GridDistortion from '@/components/animations/grid-distortion/grid-distortion';
import Hyperspeed from '@/components/animations/hyperspeed/hyperspeed';
import Iridescence from '@/components/animations/iridescence/iridescence';
import { LetterGlitch } from '@/components/animations/letter-glitch';
import { Lightning } from '@/components/animations/lightning';
import LiquidChrome from '@/components/animations/liquid-chrome';
import MagnetLines from '@/components/animations/magnet-lines';
import Particles from '@/components/animations/particles/particles';
import Threads from '@/components/animations/threads/threads';
import SplashCursor from '@/components/cursors/splash-cursor';
import Terminal from '@/components/ui/terminal';
import { getCurrentCursor } from '@/utils/commands/cursorCommand';
import { processThemeFromUrl } from '@/utils/commands/themeCommand';
import { extractUrlParameters, validUrlCommands } from '@/utils/commands/urlCommandHandler';
import { getCurrentWallpaper, wallpapers } from '@/utils/commands/wallpaperCommand';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const HISTORY_STORAGE_KEY = 'terminal_command_history';

const Index = () => {
  const { command: urlCommand } = useParams<{ command?: string }>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [initialCommands, setInitialCommands] = useState<string[]>([]);
  const [currentCursor, setCursor] = useState<string>(getCurrentCursor());
  const [currentWallpaper, setCurrentWallpaper] = useState<string>(getCurrentWallpaper());
  const [currentCommand, setCurrentCommand] = useState<string>('welcome');

  // Update the document title when the current command changes
  useEffect(() => {
    const titleCommand = currentCommand || 'welcome';
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
    <div className={wallpaperClasses}>
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'aurora' && (
        <div
          id="auroraContainer"
          className={`aurora-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Aurora
            colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'balatro' && (
        <div
          id="balatroContainer"
          className={`balatro-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'ballpit' && (
        <div
          id="ballpitContainer"
          className={`ballpit-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Ballpit
            colors={[0x3a29ff, 0x6c01b4, 0xff0070, 0xffbd2d, 0x25c93f]}
            ambientColor={0x1a1f2c}
            ambientIntensity={0}
            lightIntensity={0}
            materialParams={{
              metalness: 0.5,
              roughness: 0.5,
              clearcoat: 1,
              clearcoatRoughness: 0.15
            }}
            followCursor={false}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'dither' && (
        <div
          id="ditherContainer"
          className={`dither-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
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
      {wallpaperClasses.includes('wallpaper-animation') &&
        currentWallpaper === 'grid-distortion' && (
          <div
            id="gridDistortionContainer"
            className={`grid-distortion-container animation-container wallpaper-gradient wallpaper-${currentWallpaper}`}
          >
            <GridDistortion
              imageSrc={wallpapers[currentWallpaper].url}
              grid={10}
              mouse={0.1}
              strength={0.15}
              relaxation={0.9}
              className="grid-distortion"
            />
          </div>
        )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'hyperspeed' && (
        <div
          id="hyperspeedContainer"
          className={`hyperspeed-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Hyperspeed
            effectOptions={{
              onSpeedUp: () => {},
              onSlowDown: () => {},
              distortion: 'turbulentDistortion',
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 4,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [60, 80],
              movingCloserSpeed: [-120, -160],
              carLightsLength: [400 * 0.03, 400 * 0.2],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xffffff,
                brokenLines: 0xffffff,
                leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                sticks: 0x03b3c3
              }
            }}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'iridescence' && (
        <div
          id="iridescenceContainer"
          className={`iridescence-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Iridescence color={[1, 1, 1]} mouseReact={false} amplitude={0.1} speed={1.0} />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'letter-glitch' && (
        <div
          id="letterGlitchContainer"
          className={`letter-glitch-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <LetterGlitch
            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
            glitchSpeed={50}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'lightning' && (
        <div
          id="lightningContainer"
          className={`lightning-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'liquid-chrome' && (
        <div
          id="liquidChromeContainer"
          className={`liquid-chrome-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <LiquidChrome
            baseColor={[0.3, 0.2, 0.5]}
            speed={0.25}
            amplitude={0.6}
            interactive={true}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'magnet-lines' && (
        <div
          id="magnetLinesContainer"
          className={`magnet-lines-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <MagnetLines
            rows={9}
            columns={9}
            containerSize="100%"
            lineColor="#64ffda"
            lineWidth="0.8vmin"
            lineHeight="9vmin"
            baseAngle={0}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'particles' && (
        <div
          id="particlesContainer"
          className={`particles-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Particles
            particleColors={['#64ffda']}
            particleCount={2000}
            particleSpread={5}
            speed={0.2}
            particleBaseSize={50}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={true}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'threads' && (
        <div
          id="threadsContainer"
          className={`threads-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Threads
            amplitude={3}
            color={[0.4, 1, 0.85]}
            distance={0}
            enableMouseInteraction={true}
          />
        </div>
      )}
      {wallpaperClasses.includes('wallpaper-animation') && currentWallpaper === 'waves' && (
        <div
          id="wavesContainer"
          className={`waves-container animation-container wallpaper-image wallpaper-${currentWallpaper}`}
        >
          <Waves
            lineColor="#64ffda"
            backgroundColor="rgba(0, 0, 0, 0.7)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
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
      </div>
      <div id="cursorContainer" className="cursor-container">
        {currentCursor === 'splash' && <SplashCursor />}
      </div>
    </div>
  );
};

export default Index;
