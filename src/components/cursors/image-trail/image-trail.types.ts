/**
 * @file image-trail.types.ts
 * @description Type definitions for the ImageTrail cursor component
 */

/**
 * Interface for mouse/touch position coordinates
 */
export interface PointerPosition {
  x: number;
  y: number;
}

/**
 * Interface for rotation coordinates
 */
export interface Rotation {
  x: number;
  y: number;
}

/**
 * Interface for DOM elements within an image item
 */
export interface ImageItemDOM<T extends HTMLElement = HTMLDivElement> {
  el: T;
  inner: HTMLDivElement | null;
}

/**
 * Interface for the properties of the ImageTrail component
 */
export interface ImageTrailProps {
  /** Array of image URLs to display in the trail */
  items?: string[];
  /** Variant number (1-8) for different trail effects */
  variant?: number;
  /** Optional key for proper remounting */
  key?: string | number;
}

/**
 * Forward declare ImageTrailBase to avoid circular imports
 */
export interface IImageTrailBase {
  destroy(): void;
}

/**
 * Interface for the state of an ImageTrail instance
 */
export interface ImageTrailState {
  /** Reference to the container element */
  containerRef: React.RefObject<HTMLDivElement>;
  /** Flag to track if the component is mounted */
  isMounted: boolean;
  /** Class instance for the current variant */
  instance: IImageTrailBase | null;
}
