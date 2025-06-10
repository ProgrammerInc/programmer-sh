/* eslint-disable no-secrets/no-secrets */
'use client';

import {
  Aurora,
  AuroraCanvasProps,
  AuroraProps,
  BackgroundBeamsProps,
  BackgroundBoxesProps,
  BackgroundLines,
  BackgroundLinesProps,
  Balatro,
  BalatroProps,
  BallpitProps,
  BeamPortal,
  BlobBackground,
  BlobBackgroundProps,
  CosmicSceneProps,
  CrazyBallpit,
  Dither,
  DitherProps,
  GradientAnimation,
  GradientAnimationProps,
  GradientMesh,
  GradientMeshProps,
  GridDistortionProps,
  GridMotion,
  GridMotionProps,
  GridPattern,
  GridPatternProps,
  HyperspaceHero,
  HyperspaceHeroProps,
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
  MeshMatrixProps,
  MeteorsProps,
  Noise,
  NoiseProps,
  ParticleNetworkProps,
  ParticleVeilProps,
  ParticlesProps,
  RainDrops,
  RainDropsProps,
  ShootingStars,
  Sparkles,
  SparklesProps,
  SphereAnimation,
  SphereAnimationProps,
  SpotlightEnhanced,
  SpotlightNewProps,
  Squares,
  SquaresProps,
  Starfall,
  StarfallProps,
  StarryBackground,
  StarsBackground,
  SwarmEffect,
  SwarmEffectProps,
  Threads,
  ThreadsAudioProvider,
  ThreadsProps,
  VortexProps,
  Waves,
  WavesProps,
  WavyBackground,
  WavyBackgroundProps,
  WorldMap,
  WorldMapProps,
  WorldProps
} from '@/components/animations';

// Import types for lazy loaded components
import type { CrazyBallpitProps } from '@/components/animations';

import { hexToRgb } from '@/components/animations/particles/particles.utils';
import {
  AnimationLoader,
  LazyAuroraBackground,
  LazyAuroraCanvas,
  LazyBackgroundBeams,
  LazyBackgroundBoxes,
  LazyBallpit,
  LazyCosmicScene,
  LazyGlobe,
  LazyGridDistortion,
  LazyHyperspeed,
  LazyMeshMatrix,
  LazyMeteors,
  LazyParticleNetwork,
  LazyParticleVeil,
  LazyParticles,
  LazyVortex
} from '@/lib/lazy-components';
import defaultBlobs from '@/presets/blob.presets';
import { globeArcs, globeConfig } from '@/presets/globe.presets';
import wallpaperPresets from '@/presets/wallpaper.presets';
import { Suspense, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import WallpaperAudioControl from './wallpaper-audio-control';

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

    // Debug logging for wallpaper selection
    useEffect(() => {
      console.log('[Wallpaper Debug] Current wallpaper ID:', wallpaper);
      console.log('[Wallpaper Debug] Current animation:', animation?.id || 'none');
      console.log('[Wallpaper Debug] Background config:', background);
    }, [wallpaper, background, animation]);

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
            {/* Handle Southern Lights animation */}
            {animation.id === 'southern-lights' && (
              <Suspense fallback={<AnimationLoader />}>
                <div className="h-full w-full overflow-hidden">
                  <div
                    className={`
                      [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
                      [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
                      [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
                      [background-image:var(--white-gradient),var(--aurora)]
                      dark:[background-image:var(--dark-gradient),var(--aurora)]
                      [background-size:300%,_200%]
                      [background-position:50%_50%,50%_50%]
                      filter blur-[10px] invert dark:invert-0
                      after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
                      after:dark:[background-image:var(--dark-gradient),var(--aurora)]
                      after:[background-size:200%,_100%] 
                      after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
                      pointer-events-none
                      fixed inset-0 opacity-50 will-change-transform
                      [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]
                    `}
                    aria-hidden="true"
                  />
                  <StarsBackground className="stars-background w-full h-full" aria-hidden="true" />
                </div>
              </Suspense>
            )}
            {animation.id === 'aurora' && (
              <Aurora
                colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
                {...(animation.animationProps as AuroraProps)}
              />
            )}
            {animation.id === 'aurora-canvas' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyAuroraCanvas {...(animation.animationProps as AuroraCanvasProps)} />
              </Suspense>
            )}
            {animation.id === 'aurora-background' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyAuroraBackground
                  className="h-full w-full"
                  showRadialGradient={true}
                  withStars={true}
                >
                  <div className="h-full w-full" />
                </LazyAuroraBackground>
              </Suspense>
            )}
            {animation.id === 'background-beams' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyBackgroundBeams {...(animation.animationProps as BackgroundBeamsProps)} />
              </Suspense>
            )}
            {animation.id === 'background-boxes' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyBackgroundBoxes {...(animation.animationProps as BackgroundBoxesProps)} />
              </Suspense>
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
              <Suspense fallback={<AnimationLoader />}>
                <LazyBallpit
                  className="w-full h-full block"
                  colors={[0x3a29ff, 0x6c01b4, 0xff0070, 0xffbd2d, 0x25c93f]}
                  ambientColor={0x1a1f2c}
                  ambientIntensity={0.2}
                  lightIntensity={0.5}
                  materialParams={{
                    metalness: 0.5,
                    roughness: 0.5,
                    clearcoat: 1,
                    clearcoatRoughness: 0.15
                  }}
                  followCursor={false}
                  count={100}
                  {...(animation.animationProps as BallpitProps)}
                />
              </Suspense>
            )}
            {animation.id === 'crazy-ballpit' && (
              <CrazyBallpit
                className="w-full h-full block"
                colors={[0x3a29ff, 0x6c01b4, 0xff0070, 0xffbd2d, 0x25c93f]}
                ambientColor={0x1a1f2c}
                ambientIntensity={0.2}
                lightIntensity={0.5}
                materialParams={{
                  metalness: 0.5,
                  roughness: 0.5,
                  clearcoat: 1,
                  clearcoatRoughness: 0.15
                }}
                followCursor={false}
                count={100}
                {...(animation.animationProps as CrazyBallpitProps)}
              />
            )}
            {animation.id === 'beam-portal' && (
              <BeamPortal colorScheme="aurora" pattern="radial" intensity="active" shimmer={true} />
            )}
            {animation.id === 'blob-background' && (
              <BlobBackground
                blobs={defaultBlobs}
                {...(animation.animationProps as BlobBackgroundProps)}
              />
            )}
            {animation.id === 'cosmic-scene' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyCosmicScene
                  colorScheme="neon"
                  overlayOpacity={0.2}
                  {...(animation.animationProps as CosmicSceneProps)}
                />
              </Suspense>
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
              <Suspense fallback={<AnimationLoader />}>
                <LazyGlobe
                  data={globeArcs.map(arc => ({
                    ...arc,
                    // Ensure all values are valid numbers
                    startLat: Number.isFinite(arc.startLat) ? arc.startLat : 0,
                    startLng: Number.isFinite(arc.startLng) ? arc.startLng : 0,
                    endLat: Number.isFinite(arc.endLat) ? arc.endLat : 0,
                    endLng: Number.isFinite(arc.endLng) ? arc.endLng : 0,
                    arcAlt: Number.isFinite(arc.arcAlt) ? arc.arcAlt : 0.1,
                    // Ensure color is never undefined
                    color: arc.color || '#06b6d4'
                  }))}
                  globeConfig={{
                    ...globeConfig,
                    // Ensure lighting properties are never undefined
                    ambientLight: globeConfig.ambientLight || '#ffffff',
                    directionalLeftLight: globeConfig.directionalLeftLight || '#ffffff',
                    directionalTopLight: globeConfig.directionalTopLight || '#ffffff',
                    pointLight: globeConfig.pointLight || '#ffffff',
                    // Apply animation props if available
                    ...(animation.animationProps as WorldProps)?.globeConfig
                  }}
                />
              </Suspense>
            )}
            {animation.id === 'gradient-animation' && (
              <GradientAnimation {...(animation.animationProps as GradientAnimationProps)} />
            )}
            {animation.id === 'gradient-mesh' && (
              <GradientMesh {...(animation.animationProps as GradientMeshProps)} />
            )}
            {animation.id === 'grid-distortion' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyGridDistortion
                  imageSrc={image.url}
                  grid={10}
                  mouse={0.1}
                  strength={0.15}
                  relaxation={0.9}
                  className="grid-distortion"
                  {...(animation.animationProps as GridDistortionProps)}
                />
              </Suspense>
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
            {animation.id === 'grid-pattern' && (
              <GridPattern
                gridType="dots"
                gridSize={24}
                opacity={0.6}
                color={foregroundColor}
                animate={false}
                className="dark:opacity-80"
                {...(animation.animationProps as GridPatternProps)}
              />
            )}
            {animation.id === 'hyperspace-hero' && (
              <HyperspaceHero
                text="Programmer.SH"
                textColor="linear-gradient(135deg, #8a2be2, #ff69b4)"
                starCount={400}
                speed={2}
                {...(animation.animationProps as HyperspaceHeroProps)}
              />
            )}
            {animation.id === 'hyperspeed' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyHyperspeed
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
              </Suspense>
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
            {animation.id === 'mesh-matrix' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyMeshMatrix
                  videoSrc="https://videos.pexels.com/video-files/3163534/3163534-sd_640_360_30fps.mp4"
                  meshColor={foregroundColor}
                  meshDensity={25}
                  distortionIntensity={1.5}
                  {...(animation.animationProps as MeshMatrixProps)}
                />
              </Suspense>
            )}
            {animation.id === 'meteors' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyMeteors
                  number={20}
                  color="#fff"
                  {...(animation.animationProps as MeteorsProps)}
                />
              </Suspense>
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
            {animation.id === 'particle-network' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyParticleNetwork
                  particleCount={120}
                  particleSize={2}
                  particleColor={foregroundColor}
                  lineColor={foregroundColor}
                  maxDistance={100}
                  speed={0.5}
                  interactive={true}
                  {...(animation.animationProps as ParticleNetworkProps)}
                />
              </Suspense>
            )}
            {animation.id === 'particles' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyParticles
                  particleColors={[foregroundColor]}
                  particleCount={2000}
                  particleSpread={5}
                  speed={0.2}
                  particleBaseSize={50}
                  disableRotation={true}
                  moveParticlesOnHover={false}
                  className="w-full h-full"
                  {...(animation.animationProps as ParticlesProps)}
                />
              </Suspense>
            )}
            {animation.id === 'particle-veil' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyParticleVeil
                  className={`particle-veil-container w-full h-full ${animation.id}`}
                  particleCount={200}
                  particleColors={[foregroundColor]}
                  interactionRadius={120}
                  speed={0.8}
                  sizeRange={[2, 5]}
                  {...(animation.animationProps as ParticleVeilProps)}
                />
              </Suspense>
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
            {animation.id === 'sphere-animation' && (
              <SphereAnimation {...(animation.animationProps as SphereAnimationProps)} />
            )}
            {animation.id === 'spotlight' && (
              <SpotlightEnhanced {...(animation.animationProps as SpotlightNewProps)} />
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
            {animation.id === 'starfall' && (
              <Starfall
                starCount={20}
                primaryColor={foregroundColor}
                className="opacity-70"
                {...(animation.animationProps as StarfallProps)}
              />
            )}
            {animation.id === 'starry-background' && <StarryBackground />}
            {animation.id === 'swarm-effect' && (
              <SwarmEffect
                src="/images/placeholder.svg"
                particleSize={2}
                particleSpacing={4}
                particleColor="hsl(210, 100%, 60%)"
                displacementRadius={50}
                hoverEffect="scatter"
                className="h-[400px] w-full"
                {...(animation.animationProps as SwarmEffectProps)}
              />
            )}
            {animation.id === 'threads' && (
              <>
                <ThreadsAudioProvider initialEnabled={true}>
                  {({ audioEnabled }) => (
                    <>
                      <Threads
                        amplitude={3}
                        color={
                          colorType === 'hex'
                            ? hexToRgb(foregroundColor)
                            : (foregroundColor as unknown as [number, number, number])
                        }
                        distance={0}
                        enableMouseInteraction={!audioEnabled && interactive}
                        {...(animation.animationProps as ThreadsProps)}
                      />
                      {/* Audio controls for threads animation */}
                      <WallpaperAudioControl position="bottom-right" />
                    </>
                  )}
                </ThreadsAudioProvider>
              </>
            )}
            {animation.id === 'vortex' && (
              <Suspense fallback={<AnimationLoader />}>
                <LazyVortex
                  backgroundColor={backgroundColor}
                  {...(animation.animationProps as VortexProps)}
                />
              </Suspense>
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
                backgroundFill={backgroundColor}
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
