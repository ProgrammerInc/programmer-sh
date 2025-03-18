import React from 'react';
import { OGLRenderingContext, Plane, Transform } from 'ogl';

/**
 * GL Type
 * 
 * Type alias for OGLRenderingContext from the OGL library.
 */
export type GL = OGLRenderingContext;

/**
 * OGLProgram Type
 * 
 * Type alias for Program from the OGL library.
 */
export type OGLProgram = import('ogl').Program;

/**
 * OGLMesh Type
 * 
 * Type alias for Mesh from the OGL library.
 */
export type OGLMesh = import('ogl').Mesh;

/**
 * OGLTransform Type
 * 
 * Type alias for Transform from the OGL library.
 */
export type OGLTransform = Transform;

/**
 * OGLPlane Type
 * 
 * Type alias for Plane from the OGL library.
 */
export type OGLPlane = Plane;

/**
 * ScreenSize Interface
 * 
 * Defines the dimensions of the screen.
 */
export interface ScreenSize {
  /**
   * The width of the screen in pixels
   */
  width: number;
  
  /**
   * The height of the screen in pixels
   */
  height: number;
}

/**
 * ViewportSize Interface
 * 
 * Defines the dimensions of the viewport.
 */
export interface ViewportSize {
  /**
   * The width of the viewport
   */
  width: number;
  
  /**
   * The height of the viewport
   */
  height: number;
}

/**
 * ScrollState Interface
 * 
 * Defines the state of scrolling for the component.
 */
export interface ScrollState {
  /**
   * Optional position value for scroll state
   */
  position?: number;
  
  /**
   * Ease value for smooth scrolling
   */
  ease: number;
  
  /**
   * Current scroll position
   */
  current: number;
  
  /**
   * Target scroll position
   */
  target: number;
  
  /**
   * Last scroll position for tracking changes
   */
  last: number;
}

/**
 * AutoBindOptions Interface
 * 
 * Options for the AutoBind utility function.
 */
export interface AutoBindOptions {
  /**
   * Methods to include in auto-binding
   */
  include?: Array<string | RegExp>;
  
  /**
   * Methods to exclude from auto-binding
   */
  exclude?: Array<string | RegExp>;
}

/**
 * MediaParams Interface
 * 
 * Parameters for creating a Media instance.
 */
export interface MediaParams {
  /**
   * WebGL rendering context
   */
  gl: GL;
  
  /**
   * Plane geometry for the media
   */
  geometry: OGLPlane;
  
  /**
   * Scene transform
   */
  scene: OGLTransform;
  
  /**
   * Screen dimensions
   */
  screen: ScreenSize;
  
  /**
   * Viewport dimensions
   */
  viewport: ViewportSize;
  
  /**
   * URL of the image to display
   */
  image: string;
  
  /**
   * Total number of media items
   */
  length: number;
  
  /**
   * Index of this media item
   */
  index: number;
  
  /**
   * Width of the plane in pixels
   */
  planeWidth: number;
  
  /**
   * Height of the plane in pixels
   */
  planeHeight: number;
  
  /**
   * Distortion amount for the effect
   */
  distortion: number;
}

/**
 * CanvasParams Interface
 * 
 * Parameters for creating a Canvas instance.
 */
export interface CanvasParams {
  /**
   * Container element for the canvas
   */
  container: HTMLElement;
  
  /**
   * Canvas element for rendering
   */
  canvas: HTMLCanvasElement;
  
  /**
   * Array of image URLs to display
   */
  items: string[];
  
  /**
   * Width of each plane in pixels
   */
  planeWidth: number;
  
  /**
   * Height of each plane in pixels
   */
  planeHeight: number;
  
  /**
   * Amount of distortion to apply
   */
  distortion: number;
  
  /**
   * Scrolling ease amount for smooth animation
   */
  scrollEase: number;
  
  /**
   * Camera field of view in degrees
   */
  cameraFov: number;
  
  /**
   * Camera Z position
   */
  cameraZ: number;
}

/**
 * FlyingPostersProps Interface
 * 
 * Props for the FlyingPosters component.
 * 
 * @example
 * ```tsx
 * <FlyingPosters
 *   items={[
 *     '/images/poster1.jpg',
 *     '/images/poster2.jpg',
 *     '/images/poster3.jpg',
 *   ]}
 *   planeWidth={320}
 *   planeHeight={320}
 *   distortion={3}
 * />
 * ```
 */
export interface FlyingPostersProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of image URLs to display as flying posters
   * @default []
   */
  items?: string[];
  
  /**
   * Width of each plane in pixels
   * @default 320
   */
  planeWidth?: number;
  
  /**
   * Height of each plane in pixels
   * @default 320
   */
  planeHeight?: number;
  
  /**
   * Amount of distortion to apply to the effect
   * @default 3
   */
  distortion?: number;
  
  /**
   * Scrolling ease amount for smooth animation
   * @default 0.01
   */
  scrollEase?: number;
  
  /**
   * Camera field of view in degrees
   * @default 45
   */
  cameraFov?: number;
  
  /**
   * Camera Z position
   * @default 20
   */
  cameraZ?: number;
}
