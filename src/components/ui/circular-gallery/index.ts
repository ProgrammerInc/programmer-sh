export { CircularGallery } from './circular-gallery';
export { default } from './circular-gallery';
// Re-export all types except GL (use explicit named exports to avoid conflicts)
export type {
  ScreenSize,
  Viewport,
  TitleProps,
  MediaProps,
  AppConfig,
  // Rename ScrollState to avoid naming conflicts
  ScrollState as CircularGalleryScrollState,
  CircularGalleryProps,
  // Rename GL to avoid naming conflicts
  GL as CircularGalleryGL
} from './circular-gallery.types';
