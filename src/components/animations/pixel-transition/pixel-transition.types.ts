/**
 * Types for the Pixel Transition animation component
 */
import { CSSProperties } from 'react';

/**
 * Props for the Pixel Transition component
 *
 * @interface PixelTransitionProps
 * @property {React.ReactNode} firstContent - Initial content to display
 * @property {React.ReactNode} secondContent - Content to transition to
 * @property {number} [gridSize] - Size of the pixel grid (NxN)
 * @property {string} [pixelColor] - Color of transition pixels
 * @property {number} [animationStepDuration] - Duration of animation in seconds
 * @property {string} [className] - Additional CSS class for container
 * @property {CSSProperties} [style] - Additional inline styles
 * @property {string} [aspectRatio] - Aspect ratio for the container
 */
export interface PixelTransitionProps {
  /**
   * Initial content to display
   */
  firstContent: React.ReactNode;

  /**
   * Content to transition to
   */
  secondContent: React.ReactNode;

  /**
   * Size of the pixel grid (NxN)
   * @default 7
   */
  gridSize?: number;

  /**
   * Color of transition pixels
   * @default 'currentColor'
   */
  pixelColor?: string;

  /**
   * Duration of animation in seconds
   * @default 0.3
   */
  animationStepDuration?: number;

  /**
   * Additional CSS class for container
   */
  className?: string;

  /**
   * Additional inline styles
   */
  style?: CSSProperties;

  /**
   * Aspect ratio for the container
   * @default '100%'
   */
  aspectRatio?: string;
}

/**
 * Pixel element configuration
 *
 * @interface PixelElement
 * @property {HTMLDivElement} element - The DOM element for the pixel
 * @property {number} row - Row position in grid
 * @property {number} col - Column position in grid
 */
export interface PixelElement {
  element: HTMLDivElement;
  row: number;
  col: number;
}
