import {
  AuroraProps,
  BalatroProps,
  BallpitProps,
  DitherProps,
  GridDistortionProps,
  GridMotionProps,
  HyperspeedProps,
  IridescenceProps,
  LetterGlitchProps,
  LightningProps,
  MagnetLinesProps,
  NoiseProps,
  ParticlesProps,
  ShootingStarsProps,
  SquaresProps,
  StarBackgroundProps,
  ThreadsProps,
  VortexProps,
  WavesProps,
  WavyBackgroundProps,
  WorldMapProps
} from '@/components/animations';
import { LiquidChromeProps } from '@/components/animations/liquid-chrome';

export type AnimationType = 'aceternity' | 'css' | 'react' | 'reactbits' | 'three';
export type ColorType = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
export type GradientType = 'linear' | 'radial';
export type ImageType = 'base64' | 'url';
export type MimeType = 'image/jpeg' | 'image/png' | 'image/webp';
export type ThemeType = 'light' | 'dark' | 'system';
export type WallpaperType = 'default' | 'animation' | 'color' | 'gradient' | 'image';

// Wallpaper definition
export interface Wallpaper {
  id: string;
  name: string;
  description: string;
  type: WallpaperType;
  animation?: string;
  animationType?: AnimationType;
  animationProps?:
    | AuroraProps
    | BalatroProps
    | BallpitProps
    | DitherProps
    | GridDistortionProps
    | GridMotionProps
    | HyperspeedProps
    | IridescenceProps
    | LetterGlitchProps
    | LightningProps
    | LiquidChromeProps
    | MagnetLinesProps
    | NoiseProps
    | ParticlesProps
    | SquaresProps
    | [ShootingStarsProps, StarBackgroundProps]
    | ThreadsProps
    | VortexProps
    | WavesProps
    | WavyBackgroundProps
    | WorldMapProps;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  colorType?: ColorType;
  foregroundColor?: string;
  gradient?: string;
  gradientType?: GradientType;
  imageType?: ImageType;
  mimeType?: MimeType;
  image?: string;
  url?: string;
  theme?: ThemeType;
}

export default Wallpaper;
