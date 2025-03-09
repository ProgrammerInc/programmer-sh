import {
  AuroraBackgroundProps,
  AuroraProps,
  BackgroundBeamsProps,
  BackgroundBoxesProps,
  BackgroundLinesProps,
  BalatroProps,
  BallpitProps,
  DitherProps,
  GradientAnimationProps,
  GridDistortionProps,
  GridMotionProps,
  HyperspeedProps,
  IridescenceProps,
  LetterGlitchProps,
  LightningProps,
  MagnetLinesProps,
  MeteorsProps,
  NoiseProps,
  ParticlesProps,
  RainDropsProps,
  ShootingStarsProps,
  SparklesProps,
  SpotlightProps,
  SquaresProps,
  StarBackgroundProps,
  ThreadsProps,
  VortexProps,
  WavesProps,
  WavyBackgroundProps,
  WorldMapProps,
  WorldProps
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
    | AuroraBackgroundProps
    | BackgroundBeamsProps
    | BackgroundBoxesProps
    | BackgroundLinesProps
    | BalatroProps
    | BallpitProps
    | DitherProps
    | GradientAnimationProps
    | GridDistortionProps
    | GridMotionProps
    | HyperspeedProps
    | IridescenceProps
    | LetterGlitchProps
    | LightningProps
    | LiquidChromeProps
    | MagnetLinesProps
    | MeteorsProps
    | NoiseProps
    | ParticlesProps
    | RainDropsProps
    | [ShootingStarsProps, StarBackgroundProps]
    | SparklesProps
    | SpotlightProps
    | SquaresProps
    | ThreadsProps
    | VortexProps
    | WavesProps
    | WavyBackgroundProps
    | WorldProps
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

export interface WallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  theme?: 'light' | 'dark';
  animationRef?: React.RefObject<HTMLDivElement> | null;
  containerRef?: React.RefObject<HTMLDivElement> | null;
  contentRef?: React.RefObject<HTMLDivElement> | null;
  wallpaper?: Wallpaper;
}

export default Wallpaper;
