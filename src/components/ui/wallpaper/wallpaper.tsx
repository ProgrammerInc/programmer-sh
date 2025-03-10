'use client';
import {
  Aurora,
  AuroraBackground,
  AuroraBackgroundProps,
  AuroraProps,
  BackgroundBeams,
  BackgroundBeamsProps,
  BackgroundBoxes,
  BackgroundBoxesProps,
  BackgroundLines,
  BackgroundLinesProps,
  Balatro,
  BalatroProps,
  Ballpit,
  BallpitProps,
  Dither,
  DitherProps,
  GradientAnimation,
  GradientAnimationProps,
  GridDistortion,
  GridDistortionProps,
  GridMotion,
  GridMotionProps,
  Hyperspeed,
  HyperspeedProps,
  Iridescence,
  IridescenceProps,
  LetterGlitch,
  LetterGlitchProps,
  Lightning,
  LightningProps,
  LiquidChrome,
  LiquidChromeProps,
  MagnetLines,
  MagnetLinesProps,
  Meteors,
  MeteorsProps,
  Noise,
  NoiseProps,
  Particles,
  ParticlesProps,
  RainDrops,
  RainDropsProps,
  ShootingStars,
  Sparkles,
  SparklesProps,
  Spotlight,
  SpotlightProps,
  Squares,
  SquaresProps,
  StarsBackground,
  Threads,
  ThreadsProps,
  Vortex,
  VortexProps,
  Waves,
  WavesProps,
  WavyBackground,
  WavyBackgroundProps,
  World,
  WorldMap,
  WorldMapProps,
  WorldProps
} from '@/components/animations';
import { hexToRgb } from '@/lib/utils';
import { globeArcs, globeConfig } from '@/presets/globe.presets';
import wallpaperPresets from '@/presets/wallpaper.presets';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { WallpaperProps } from './wallpaper.types';

export const WallpaperProvider = forwardRef<HTMLDivElement, WallpaperProps>(
  (
    {
      id = 'wallpaperContainer',
      className = 'wallpaper-container',
      children,
      animationRef = null,
      containerRef = null,
      contentRef = null,
      style,
      interactive = true,
      theme = 'dark',
      wallpaper = 'default',
      wallpapers = wallpaperPresets
    },
    ref
  ) => {
    // Wallpaper debugging - only log once
    const isInitialMount = useRef(true);
    useEffect(() => {
      if (isInitialMount.current) {
        console.log('Current wallpaper:', wallpapers[wallpaper]);
        isInitialMount.current = false;
      }
    }, [wallpaper, wallpapers]);

    // Wallpaper properties
    const currentWallpaper = wallpapers[wallpaper];
    const wallpaperAnimationRef = useRef<HTMLDivElement>(animationRef?.current || null);
    const wallpaperContainerRef = useRef<HTMLDivElement>(containerRef?.current || null);
    const wallpaperContentRef = useRef<HTMLDivElement>(contentRef?.current || null);
    const wallpaperVideoRef = useRef<HTMLVideoElement>(null);
    const background = currentWallpaper.background;
    const backgroundStyles: React.CSSProperties = { ...style };

    const { animation, colors, gradient, image, video } = background;

    // Default values
    const colorType = 'hex';
    const foregroundColor = theme === 'dark' ? '#64ffda' : '#000000';
    const backgroundColor = colors && colors.length > 0 ? colors[0].color : 'transparent';
    const backgroundImage =
      gradient && gradient.gradient
        ? `${gradient.type}-gradient(${gradient.gradient})`
        : image && image.url
          ? `url(${image.url})`
          : 'none';

    backgroundStyles.color = foregroundColor;
    backgroundStyles.background = 'none';
    backgroundStyles.backgroundColor = backgroundColor;
    backgroundStyles.backgroundImage = backgroundImage;
    backgroundStyles.backgroundSize = 'cover';
    backgroundStyles.backgroundPosition = 'center';
    backgroundStyles.backgroundRepeat = 'no-repeat';

    useImperativeHandle(ref, () => wallpaperContainerRef.current!);

    return (
      <div
        id={id}
        className={`wallpaper-${currentWallpaper.id} ${className}`}
        data-wallpaper={currentWallpaper.id}
        ref={wallpaperContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ...backgroundStyles
        }}
      >
        {currentWallpaper.type === 'animation' && (
          <div
            id={`${animation.id}-container`}
            className={`animation-container ${animation.id}-container ${image ? 'wallpaper-image' : gradient ? 'wallpaper-gradient' : 'wallpaper-color'} wallpaper-${currentWallpaper.id}`}
            ref={wallpaperAnimationRef}
          >
            {animation.id === 'aurora' && (
              <Aurora
                colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
                {...(animation.animationProps as AuroraProps)}
              />
            )}
            {animation.id === 'background-beams' && (
              <BackgroundBeams {...(animation.animationProps as BackgroundBeamsProps)} />
            )}
            {animation.id === 'background-boxes' && (
              <BackgroundBoxes {...(animation.animationProps as BackgroundBoxesProps)} />
            )}
            {animation.id === 'background-lines' && (
              <BackgroundLines {...(animation.animationProps as BackgroundLinesProps)} />
            )}
            {animation.id === 'balatro' && (
              <Balatro
                isRotate={false}
                mouseInteraction={interactive}
                pixelFilter={700}
                {...(animation.animationProps as BalatroProps)}
              />
            )}
            {animation.id === 'ballpit' && (
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
                {...(animation.animationProps as BallpitProps)}
              />
            )}
            {animation.id === 'dither' && (
              <Dither
                waveColor={[0.5, 0.5, 0.5]}
                disableAnimation={false}
                enableMouseInteraction={interactive}
                mouseRadius={0.3}
                colorNum={4}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
                {...(animation.animationProps as DitherProps)}
              />
            )}
            {animation.id === 'globe' && (
              <World
                data={globeArcs}
                globeConfig={globeConfig}
                {...(animation.animationProps as WorldProps)}
              />
            )}
            {animation.id === 'gradient-animation' && (
              <GradientAnimation {...(animation.animationProps as GradientAnimationProps)} />
            )}
            {animation.id === 'grid-distortion' && (
              <GridDistortion
                imageSrc={image.url}
                grid={10}
                mouse={0.1}
                strength={0.15}
                relaxation={0.9}
                className="grid-distortion"
                {...(animation.animationProps as GridDistortionProps)}
              />
            )}
            {animation.id === 'grid-motion' && (
              <GridMotion
                items={[
                  'Terminal',
                  'Code',
                  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  'Systems',
                  'Design',
                  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  'Web',
                  'Apps',
                  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  'Mobile',
                  'UX/UI',
                  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  'Database',
                  'Cloud',
                  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  'DevOps',
                  'Security',
                  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  'Analysis',
                  'ML/AI',
                  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  'Responsive',
                  'Scalable'
                ]}
                gradientColor="rgba(30, 30, 30, 0.8)"
                {...(animation.animationProps as GridMotionProps)}
              />
            )}
            {animation.id === 'hyperspeed' && (
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
                {...(animation.animationProps as HyperspeedProps)}
              />
            )}
            {animation.id === 'iridescence' && (
              <Iridescence
                color={[1, 1, 1]}
                mouseReact={false}
                amplitude={0.1}
                speed={1.0}
                {...(animation.animationProps as IridescenceProps)}
              />
            )}
            {animation.id === 'letter-glitch' && (
              <LetterGlitch
                glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
                glitchSpeed={50}
                centerVignette={false}
                outerVignette={true}
                smooth={true}
                {...(animation.animationProps as LetterGlitchProps)}
              />
            )}
            {animation.id === 'lightning' && (
              <Lightning
                hue={220}
                xOffset={0}
                speed={1}
                intensity={1}
                size={1}
                {...(animation.animationProps as LightningProps)}
              />
            )}
            {animation.id === 'liquid-chrome' && (
              <LiquidChrome
                baseColor={[0.3, 0.2, 0.5]}
                speed={0.25}
                amplitude={0.6}
                interactive={interactive}
                {...(animation.animationProps as LiquidChromeProps)}
              />
            )}
            {animation.id === 'magnet-lines' && (
              <MagnetLines
                rows={9}
                columns={9}
                containerSize="100%"
                lineColor={foregroundColor}
                lineWidth="0.8vmin"
                lineHeight="9vmin"
                baseAngle={0}
                {...(animation.animationProps as MagnetLinesProps)}
              />
            )}
            {animation.id === 'meteors' && (
              <div className="meteors-container">
                <Meteors className="meteor" {...(animation.animationProps as MeteorsProps)} />
              </div>
            )}
            {animation.id === 'noise' && (
              <Noise
                patternSize={250}
                patternScaleX={1}
                patternScaleY={1}
                patternRefreshInterval={2}
                patternAlpha={15}
                {...(animation.animationProps as NoiseProps)}
              />
            )}
            {animation.id === 'particles' && (
              <Particles
                particleColors={[foregroundColor]}
                particleCount={2000}
                particleSpread={5}
                speed={0.2}
                particleBaseSize={50}
                disableRotation={true}
                moveParticlesOnHover={false}
                {...(animation.animationProps as ParticlesProps)}
              />
            )}
            {animation.id === 'rain-drops' && (
              <RainDrops {...(animation.animationProps as RainDropsProps)} />
            )}
            {animation.id === 'shooting-stars' && (
              <div className="shooting-stars-container">
                <ShootingStars
                  className="shooting-stars absolute top-0 left-0 w-full h-full z-1"
                  starColor={foregroundColor}
                  trailColor={foregroundColor}
                  // {...(animation.animationProps[0] as ShootingStarsProps)}
                />
                <StarsBackground
                  className="stars-background absolute top-0 left-0 w-full h-full z-0"
                  // {...(animation.animationProps[1] as StarBackgroundProps)}
                />
              </div>
            )}
            {animation.id === 'southern-lights' && (
              <AuroraBackground {...(animation.animationProps as AuroraBackgroundProps)} />
            )}
            {animation.id === 'sparkles' && (
              <Sparkles
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor={foregroundColor}
                {...(animation.animationProps as SparklesProps)}
              />
            )}
            {animation.id === 'spotlight' && (
              <Spotlight {...(animation.animationProps as SpotlightProps)} />
            )}
            {animation.id === 'squares' && (
              <Squares
                speed={0.5}
                squareSize={35}
                direction="down" // up, down, left, right, diagonal
                borderColor={foregroundColor}
                hoverFillColor={backgroundColor}
                {...(animation.animationProps as SquaresProps)}
              />
            )}
            {animation.id === 'threads' && (
              <Threads
                amplitude={3}
                color={
                  colorType === 'hex'
                    ? (hexToRgb(foregroundColor, true) as [number, number, number])
                    : (foregroundColor as unknown as [number, number, number])
                }
                distance={0}
                enableMouseInteraction={interactive}
                {...(animation.animationProps as ThreadsProps)}
              />
            )}
            {animation.id === 'vortex' && (
              <Vortex
                backgroundColor={backgroundColor}
                {...(animation.animationProps as VortexProps)}
              />
            )}
            {animation.id === 'waves' && (
              <Waves
                lineColor={foregroundColor}
                backgroundColor={backgroundColor}
                waveSpeedX={0.02}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
                {...(animation.animationProps as WavesProps)}
              />
            )}
            {animation.id === 'wavy-background' && (
              <WavyBackground
                backgroundColor={backgroundColor}
                {...(animation.animationProps as WavyBackgroundProps)}
              />
            )}
            {animation.id === 'world-map' && (
              <WorldMap
                dots={[
                  {
                    start: { lat: 40.73061, lng: -73.935242 },
                    end: { lat: 48.8534, lng: 2.3488 }
                  }
                ]}
                lineColor={foregroundColor}
                {...(animation.animationProps as WorldMapProps)}
              />
            )}
          </div>
        )}
        {currentWallpaper.type === 'video' && (
          <video
            ref={wallpaperVideoRef}
            src={video.url}
            autoPlay
            muted
            loop
            className="wallpaper-video"
          />
        )}
        <div id="wallpaperContent" className="wallpaper-content" ref={wallpaperContentRef}>
          {children}
        </div>
      </div>
    );
  }
);

export default WallpaperProvider;
