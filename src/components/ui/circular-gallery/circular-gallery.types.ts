/**
 * Type definitions for the Circular Gallery component
 */

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

/**
 * OpenGL renderer type
 */
export type GL = Renderer['gl'];

/**
 * Screen size interface
 */
export interface ScreenSize {
  width: number;
  height: number;
}

/**
 * Viewport interface
 */
export interface Viewport {
  width: number;
  height: number;
}

/**
 * Gallery item interface
 */
export interface GalleryItem {
  image: string;
  text: string;
}

/**
 * Title props interface
 */
export interface TitleProps {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
}

/**
 * Media props interface
 */
export interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
}

/**
 * App configuration interface
 */
export interface AppConfig {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
}

/**
 * Scroll state interface
 */
export interface ScrollState {
  ease: number;
  current: number;
  target: number;
  last: number;
  position?: number;
}

/**
 * Circular Gallery component props
 */
export interface CircularGalleryProps {
  /**
   * Array of gallery items to display
   */
  items?: GalleryItem[];
  
  /**
   * Bend factor for the curved gallery layout
   * @default 3
   */
  bend?: number;
  
  /**
   * Text color for item labels
   * @default '#ffffff'
   */
  textColor?: string;
  
  /**
   * Border radius for gallery items
   * @default 0.05
   */
  borderRadius?: number;
  
  /**
   * Font for text labels
   * @default 'bold 30px DM Sans'
   */
  font?: string;
}
