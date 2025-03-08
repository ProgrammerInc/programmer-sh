'use client';
import {
  Aurora,
  AuroraProps,
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
  Noise,
  NoiseProps,
  Particles,
  ParticlesProps,
  ShootingStars,
  ShootingStarsProps,
  Squares,
  SquaresProps,
  StarBackgroundProps,
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
import { globeArcs, globeConfig } from '@/components/animations/globe/globe.presets';
import React, { useEffect, useRef } from 'react';
import wallpapers from './wallpaper.presets';
import Wallpaper from './wallpaper.types';

export interface WallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  theme?: 'light' | 'dark';
  wallpaper?: Wallpaper;
}

// Helper function to convert hex color to RGB array
const hexToRgb = (hex: string): [number, number, number] => {
  // Remove the # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Convert to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  return [r, g, b];
};

export const WallpaperProvider: React.FC<WallpaperProps> = ({
  id = 'wallpaperContainer',
  className = 'wallpaper-container',
  children,
  style,
  interactive = true,
  theme = 'dark',
  wallpaper = wallpapers.default
}) => {
  // Wallpaper debugging - only log once
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      console.log('Current wallpaper:', wallpaper);
      isInitialMount.current = false;
    }
  }, [wallpaper]);

  // Wallpaper properties
  const animation = wallpaper.animation || 'default';
  const animationProps = wallpaper.animationProps || {};
  const backgroundColor = wallpaper.backgroundColor || 'transparent';
  const colorType = wallpaper.colorType || 'hex';
  const foregroundColor: [number, number, number] | number | string =
    wallpaper.foregroundColor || '#64ffda';
  const gradient = wallpaper.gradient || 'to bottom, rgba(0, 0, 0, 0.25), rgba(5, 5, 5, 0.7)';
  const gradientType = wallpaper.gradientType || 'linear';
  const image = wallpaper.image;
  const imageType = wallpaper.imageType || 'unsplash';
  const mimeType = wallpaper.mimeType || 'image/png';
  const url = wallpaper.url;
  const wallpaperId = wallpaper.id || 'default';
  const wallpaperType = wallpaper.type || 'image';

  return (
    <div
      id={id}
      className={`wallpaper-${wallpaperId} ${className}`}
      data-wallpaper={wallpaperId}
      style={{
        backgroundColor,
        backgroundImage:
          (wallpaperType === 'image' && imageType === 'url' && `url(${url})`) ||
          (imageType === 'base64' && `url(data:${mimeType};${imageType},${image})`) ||
          (wallpaperType === 'gradient' && `${gradientType}-gradient(${gradient})`) ||
          'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      {wallpaperType === 'animation' && (
        <div
          id={`${animation}-container`}
          className={`animation-container ${animation}-container ${image ? 'wallpaper-image' : gradient ? 'wallpaper-gradient' : 'wallpaper-color'} wallpaper-${wallpaper.id}`}
        >
          {animation === 'aurora' && (
            <Aurora
              colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
              {...(animationProps as AuroraProps)}
            />
          )}
          {animation === 'balatro' && (
            <Balatro
              isRotate={false}
              mouseInteraction={interactive}
              pixelFilter={700}
              {...(animationProps as BalatroProps)}
            />
          )}
          {animation === 'ballpit' && (
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
              {...(animationProps as BallpitProps)}
            />
          )}
          {animation === 'dither' && (
            <Dither
              waveColor={[0.5, 0.5, 0.5]}
              disableAnimation={false}
              enableMouseInteraction={interactive}
              mouseRadius={0.3}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
              {...(animationProps as DitherProps)}
            />
          )}
          {animation === 'globe' && (
            <World data={globeArcs} globeConfig={globeConfig} {...(animationProps as WorldProps)} />
          )}
          {animation === 'gradient-animation' && (
            <GradientAnimation {...(animationProps as GradientAnimationProps)} />
          )}
          {animation === 'grid-distortion' && (
            <GridDistortion
              imageSrc={wallpaper.url}
              grid={10}
              mouse={0.1}
              strength={0.15}
              relaxation={0.9}
              className="grid-distortion"
              {...(animationProps as GridDistortionProps)}
            />
          )}
          {animation === 'grid-motion' && (
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
              {...(animationProps as GridMotionProps)}
            />
          )}
          {animation === 'hyperspeed' && (
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
              {...(animationProps as HyperspeedProps)}
            />
          )}
          {animation === 'iridescence' && (
            <Iridescence
              color={[1, 1, 1]}
              mouseReact={false}
              amplitude={0.1}
              speed={1.0}
              {...(animationProps as IridescenceProps)}
            />
          )}
          {animation === 'letter-glitch' && (
            <LetterGlitch
              glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
              glitchSpeed={50}
              centerVignette={false}
              outerVignette={true}
              smooth={true}
              {...(animationProps as LetterGlitchProps)}
            />
          )}
          {animation === 'lightning' && (
            <Lightning
              hue={220}
              xOffset={0}
              speed={1}
              intensity={1}
              size={1}
              {...(animationProps as LightningProps)}
            />
          )}
          {animation === 'liquid-chrome' && (
            <LiquidChrome
              baseColor={[0.3, 0.2, 0.5]}
              speed={0.25}
              amplitude={0.6}
              interactive={interactive}
              {...(animationProps as LiquidChromeProps)}
            />
          )}
          {animation === 'magnet-lines' && (
            <MagnetLines
              rows={9}
              columns={9}
              containerSize="100%"
              lineColor={foregroundColor}
              lineWidth="0.8vmin"
              lineHeight="9vmin"
              baseAngle={0}
              {...(animationProps as MagnetLinesProps)}
            />
          )}
          {animation === 'noise' && (
            <Noise
              patternSize={250}
              patternScaleX={1}
              patternScaleY={1}
              patternRefreshInterval={2}
              patternAlpha={15}
              {...(animationProps as NoiseProps)}
            />
          )}
          {animation === 'particles' && (
            <Particles
              particleColors={[foregroundColor]}
              particleCount={2000}
              particleSpread={5}
              speed={0.2}
              particleBaseSize={50}
              disableRotation={true}
              moveParticlesOnHover={false}
              {...(animationProps as ParticlesProps)}
            />
          )}
          {animation === 'shooting-stars' && (
            <div className="shooting-stars-container">
              <ShootingStars {...(animationProps[0] as ShootingStarsProps)} />
              <StarsBackground {...(animationProps[1] as StarBackgroundProps)} />
            </div>
          )}
          {animation === 'squares' && (
            <Squares
              speed={0.5}
              squareSize={35}
              direction="down" // up, down, left, right, diagonal
              borderColor={foregroundColor}
              hoverFillColor={backgroundColor}
              {...(animationProps as SquaresProps)}
            />
          )}
          {animation === 'threads' && (
            <Threads
              amplitude={3}
              color={
                colorType === 'hex'
                  ? hexToRgb(foregroundColor)
                  : (foregroundColor as unknown as [number, number, number])
              }
              distance={0}
              enableMouseInteraction={interactive}
              {...(animationProps as ThreadsProps)}
            />
          )}
          {animation === 'vortex' && (
            <Vortex backgroundColor={backgroundColor} {...(animationProps as VortexProps)} />
          )}
          {animation === 'waves' && (
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
              {...(animationProps as WavesProps)}
            />
          )}
          {animation === 'wavy-background' && (
            <WavyBackground
              backgroundColor={backgroundColor}
              {...(animationProps as WavyBackgroundProps)}
            />
          )}
          {animation === 'world-map' && (
            <WorldMap
              dots={[
                {
                  start: { lat: 40.73061, lng: -73.935242 },
                  end: { lat: 48.8534, lng: 2.3488 }
                }
              ]}
              lineColor={foregroundColor}
              {...(animationProps as WorldMapProps)}
            />
          )}
        </div>
      )}
      <div id="wallpaperContent" className="wallpaper-content">
        {children}
      </div>
    </div>
  );
};

export default WallpaperProvider;
