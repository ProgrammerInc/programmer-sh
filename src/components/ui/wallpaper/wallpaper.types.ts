import {
  AuroraBackgroundProps,
  AuroraProps,
  BackgroundBeamsProps,
  BackgroundBoxesProps,
  BackgroundLinesProps,
  BalatroProps,
  BallpitProps,
  BlobBackgroundProps,
  CosmicSceneProps,
  DitherProps,
  GradientAnimationProps,
  GradientMeshProps,
  GridDistortionProps,
  GridMotionProps,
  GridPatternProps,
  HyperspaceHeroProps,
  HyperspeedProps,
  IridescenceProps,
  LetterGlitchProps,
  LightningProps,
  LiquidChromeProps,
  MagnetLinesProps,
  MeshMatrixProps,
  MeteorsProps,
  NoiseProps,
  ParticleNetworkProps,
  ParticlesProps,
  RainDropsProps,
  ShootingStarsProps,
  SparklesProps,
  SphereAnimationProps,
  SpotlightProps,
  SquaresProps,
  StarBackgroundProps,
  StarfallProps,
  StarryBackgroundProps,
  SwarmEffectProps,
  ThreadsProps,
  VortexProps,
  WavesProps,
  WavyBackgroundProps,
  WorldMapProps,
  WorldProps
} from '@/components/animations';
import { CSSProperties } from 'react';

export type AspectRatioType = '16:9' | '4:3' | '1:1';
export type AnimationType = 'aceternity' | 'artifact-ui' | 'css' | 'react' | 'reactbits' | 'three';
export type ColorType = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
export type GradientType = 'linear' | 'radial';
export type ImageType = 'base64' | 'file' | 'url';
export type ImageMimeType = 'image/avif' | 'image/gif' | 'image/jpeg' | 'image/png' | 'image/webp';
export type ImageSourceType = 'cloud' | 'generated' | 'local' | 'remote' | 'upload';
export type GeneratedImageSource =
  | 'dall-e'
  | 'firefly'
  | 'flux'
  | 'ideogram'
  | 'janus'
  | 'midjourney'
  | 'playground'
  | 'stable-diffusion';
export type RemoteImageSource = 'pexels' | 'pixabay' | 'unsplash';
export type PatternType = 'css' | 'image' | 'video';
export type OrientationType = 'horizontal' | 'vertical';
export type StorageType = 'cloud' | 'database' | 'local' | 'remote';
export type CloudStorageType =
  | 'adobe'
  | 'azure'
  | 'backblaze'
  | 'box'
  | 'dropbox'
  | 'gcp'
  | 'google'
  | 'oneDrive'
  | 's3'
  | 'storj'
  | 'yandex';
export type RemoteStorageType =
  | 'ftp'
  | 'git'
  | 'ipfs'
  | 'iscsi'
  | 'nfs'
  | 'rsync'
  | 'scp'
  | 'smb'
  | 'sftp'
  | 'url'
  | 'webdav';
export type WallpaperThemeType = 'light' | 'dark' | 'system';
export type VideoType = 'base64' | 'file' | 'url';
export type VideoMimeType = 'video/mp4' | 'video/webm';
export type VideoSourceType = 'cloud' | 'generated' | 'local' | 'remote' | 'upload';
export type GeneratedVideoSource = 'kling' | 'runway' | 'sora';
export type RemoteVideoSource = 'dailymotion' | 'vimeo' | 'youtube';
export type WallpaperType =
  | 'default'
  | 'animation'
  | 'color'
  | 'gradient'
  | 'image'
  | 'pattern'
  | 'video';

export interface WallpaperAnimation {
  id: string;
  name?: string;
  description?: string;
  animationProps?:
    | AuroraProps
    | AuroraBackgroundProps
    | BackgroundBeamsProps
    | BackgroundBoxesProps
    | BackgroundLinesProps
    | BalatroProps
    | BallpitProps
    | BlobBackgroundProps
    | CosmicSceneProps
    | DitherProps
    | GradientAnimationProps
    | GradientMeshProps
    | GridDistortionProps
    | GridMotionProps
    | GridPatternProps
    | HyperspaceHeroProps
    | HyperspeedProps
    | IridescenceProps
    | LetterGlitchProps
    | LightningProps
    | LiquidChromeProps
    | MagnetLinesProps
    | MeshMatrixProps
    | MeteorsProps
    | NoiseProps
    | ParticleNetworkProps
    | ParticlesProps
    | RainDropsProps
    | [ShootingStarsProps, StarBackgroundProps]
    | SparklesProps
    | SphereAnimationProps
    | SpotlightProps
    | SquaresProps
    | StarfallProps
    | StarryBackgroundProps
    | SwarmEffectProps
    | ThreadsProps
    | VortexProps
    | WavesProps
    | WavyBackgroundProps
    | WorldProps
    | WorldMapProps;
  type: AnimationType;
}

export interface WallpaperBackground {
  id: string;
  name?: string;
  description?: string;
  animation?: WallpaperAnimation;
  colors?: WallpaperColor[];
  gradient?: WallpaperGradient;
  image?: WallpaperImage;
  pattern?: WallpaperPattern;
  style?: CSSProperties;
  type: WallpaperType;
  video?: WallpaperVideo;
}

export interface WallpaperColor {
  id: string;
  name?: string;
  description?: string;
  color: string;
  type: ColorType;
}

export interface WallpaperGradient {
  id: string;
  name?: string;
  description?: string;
  alpha?: number;
  gradient?: string;
  style?: CSSProperties;
  type: GradientType;
}

export interface WallpaperImage {
  id: string;
  name?: string;
  description?: string;
  aspectRatio?: AspectRatioType;
  backups?: WallpaperImage[];
  base64?: string;
  className?: string;
  filename?: string;
  folder?: string;
  height?: number;
  mimeType: ImageMimeType;
  orientation?: OrientationType;
  path?: string;
  remoteType?: RemoteStorageType;
  size?: number;
  source?: GeneratedImageSource | RemoteImageSource;
  sourceType?: ImageSourceType;
  storageType?: StorageType;
  style?: CSSProperties;
  type: ImageType;
  url?: string;
  userId?: string;
  username?: string;
  width?: number;
}

export interface WallpaperPattern {
  id: string;
  name?: string;
  description?: string;
  className?: string;
  colors?: WallpaperColor[];
  gradient?: WallpaperGradient;
  image?: WallpaperImage;
  style?: CSSProperties;
  type: PatternType;
  video?: WallpaperVideo;
}

export interface WallpaperVideo {
  id: string;
  name?: string;
  description?: string;
  aspectRatio?: AspectRatioType;
  backups?: WallpaperVideo[];
  base64?: string;
  className?: string;
  cloudType?: CloudStorageType;
  filename?: string;
  folder?: string;
  height?: number;
  mimeType: VideoMimeType;
  orientation?: OrientationType;
  path?: string;
  remoteType?: RemoteStorageType;
  size?: number;
  source?: GeneratedVideoSource | RemoteVideoSource;
  sourceType?: VideoSourceType;
  storageType?: StorageType;
  style?: CSSProperties;
  type: VideoType;
  url?: string;
  userId?: string;
  username?: string;
  width?: number;
}

// Wallpaper definition
export interface Wallpaper {
  id: string;
  name?: string;
  description?: string;
  background: WallpaperBackground;
  theme?: WallpaperThemeType;
  type: WallpaperType;
}

export interface WallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  className?: string;
  style?: CSSProperties;
  animationRef?: React.RefObject<HTMLDivElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
  contentRef?: React.RefObject<HTMLDivElement>;
  interactive?: boolean;
  randomize?: boolean;
  theme?: WallpaperThemeType;
  wallpaper?: string;
  wallpapers?: Record<string, Wallpaper>;
}

export default Wallpaper;
