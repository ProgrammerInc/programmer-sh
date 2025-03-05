import {
  AuroraProps,
  BalatroProps,
  BallpitProps,
  DitherProps,
  GridDistortionProps,
  HyperspeedProps,
  IridescenceProps,
  LetterGlitchProps,
  LightningProps,
  MagnetLinesProps,
  ParticlesProps,
  ThreadsProps,
  WavesProps
} from '@/components/animations';
import { LiquidChromeProps } from '@/components/animations/liquid-chrome';

export type AnimationType = 'css' | 'react' | 'reactbits' | 'three';
export type ColorType = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
export type GradientType = 'linear' | 'radial';
export type ImageType = 'base64' | 'url';
export type MimeType = 'image/jpeg' | 'image/png' | 'image/webp';
export type ThemeType = 'light' | 'dark' | 'system';
export type WallpaperType = 'animation' | 'color' | 'gradient' | 'image';

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
    | HyperspeedProps
    | IridescenceProps
    | LetterGlitchProps
    | LightningProps
    | LiquidChromeProps
    | MagnetLinesProps
    | ParticlesProps
    | ThreadsProps
    | WavesProps;
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
