import Aurora from '@/components/animations/aurora';
import Balatro from '@/components/animations/balatro';
import Ballpit from '@/components/animations/ballpit';
import Dither from '@/components/animations/dither';
import GridDistortion from '@/components/animations/grid-distortion';
import Hyperspeed from '@/components/animations/hyperspeed';
import Iridescence from '@/components/animations/iridescence';
import LetterGlitch from '@/components/animations/letter-glitch';
import Lightning from '@/components/animations/lightning';
import LiquidChrome from '@/components/animations/liquid-chrome';
import MagnetLines from '@/components/animations/magnet-lines';
import Particles from '@/components/animations/particles';
import Threads from '@/components/animations/threads';
import Waves from '@/components/animations/waves';
import React from 'react';
import wallpapers from './wallpaper.presets';
import Wallpaper from './wallpaper.types';

export interface WallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  wallpaper?: Wallpaper;
}

export const WallpaperProvider: React.FC<WallpaperProps> = ({
  id = 'wallpaperContainer',
  className = 'wallpaper-container',
  children,
  style,
  wallpaper = wallpapers.default
}) => {
  {
    // Wallpaper debugging
    console.log('Current wallpaper:', wallpaper);
  }
  return (
    <div
      id={id}
      className={`wallpaper-${wallpaper.id} ${className}`}
      data-wallpaper={wallpaper.id}
      style={{
        backgroundColor: wallpaper.color || 'transparent',
        backgroundImage:
          (wallpaper.type === 'image' &&
            wallpaper.imageType === 'url' &&
            `url(${wallpaper.url})`) ||
          (wallpaper.imageType === 'base64' &&
            `url(data:${wallpaper.mimeType};${wallpaper.imageType},${wallpaper.image})`) ||
          (wallpaper.type === 'gradient' &&
            `${wallpaper.gradientType}-gradient(${wallpaper.gradient})`) ||
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
      {wallpaper.type === 'animation' && (
        <div
          id={`${wallpaper.animation}-container`}
          className={`animation-container ${wallpaper.animation}-container ${wallpaper.image ? 'wallpaper-image' : wallpaper.gradient ? 'wallpaper-gradient' : 'wallpaper-color'} wallpaper-${wallpaper.id}`}
        >
          {wallpaper.animation === 'aurora' && (
            <Aurora
              colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          )}
          {wallpaper.animation === 'balatro' && (
            <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} />
          )}
          {wallpaper.animation === 'ballpit' && (
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
          )}
          {wallpaper.animation === 'dither' && (
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
          )}
          {wallpaper.animation === 'grid-distortion' && (
            <GridDistortion
              imageSrc={wallpaper.url}
              grid={10}
              mouse={0.1}
              strength={0.15}
              relaxation={0.9}
              className="grid-distortion"
            />
          )}
          {wallpaper.animation === 'hyperspeed' && (
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
          )}
          {wallpaper.animation === 'iridescence' && (
            <Iridescence color={[1, 1, 1]} mouseReact={false} amplitude={0.1} speed={1.0} />
          )}
          {wallpaper.animation === 'letter-glitch' && (
            <LetterGlitch
              glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
              glitchSpeed={50}
              centerVignette={false}
              outerVignette={true}
              smooth={true}
            />
          )}
          {wallpaper.animation === 'lightning' && (
            <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
          )}
          {wallpaper.animation === 'liquid-chrome' && (
            <LiquidChrome
              baseColor={[0.3, 0.2, 0.5]}
              speed={0.25}
              amplitude={0.6}
              interactive={true}
            />
          )}
          {wallpaper.animation === 'magnet-lines' && (
            <MagnetLines
              rows={9}
              columns={9}
              containerSize="100%"
              lineColor="#64ffda"
              lineWidth="0.8vmin"
              lineHeight="9vmin"
              baseAngle={0}
            />
          )}
          {wallpaper.animation === 'particles' && (
            <Particles
              particleColors={['#64ffda']}
              particleCount={2000}
              particleSpread={5}
              speed={0.2}
              particleBaseSize={50}
              moveParticlesOnHover={false}
            />
          )}
          {wallpaper.animation === 'threads' && (
            <Threads
              amplitude={3}
              color={[0.4, 1, 0.85]}
              distance={0}
              enableMouseInteraction={true}
            />
          )}
          {wallpaper.animation === 'waves' && (
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
