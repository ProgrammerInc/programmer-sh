/**
 * InfiniteScroll Component Type Definitions
 * 
 * Types for the InfiniteScroll component that provides a smooth infinite scrolling container
 * with vertical movement and customizable styling.
 * 
 * @module
 */

import { ReactNode } from 'react';

/**
 * InfiniteScrollItem Interface
 * 
 * Represents a single item in the infinite scroll container.
 * 
 * @example
 * ```tsx
 * const scrollItems: InfiniteScrollItem[] = [
 *   {
 *     content: <div>Item 1</div>
 *   },
 *   {
 *     content: <div>Item 2</div>
 *   }
 * ];
 * ```
 */
export interface InfiniteScrollItem {
  /** React content to display within the scroll item */
  content: ReactNode;
}

/**
 * InfiniteScrollProps Interface
 * 
 * Props for the InfiniteScroll component.
 * 
 * @example
 * ```tsx
 * <InfiniteScroll
 *   items={scrollItems}
 *   width="30rem"
 *   maxHeight="500px"
 *   autoplay={true}
 *   autoplayDirection="down"
 *   isTilted={true}
 *   tiltDirection="left"
 * />
 * ```
 */
export interface InfiniteScrollProps {
  /** Width of the outer wrapper */
  width?: string;
  
  /** Max-height of the outer wrapper */
  maxHeight?: string;
  
  /** Negative margin to reduce spacing between items */
  negativeMargin?: string;
  
  /** Array of items with content to display */
  items?: InfiniteScrollItem[];
  
  /** Fixed height for each item (in pixels) */
  itemMinHeight?: number;
  
  /** Whether the container is in "skewed" perspective */
  isTilted?: boolean;
  
  /** Direction of the tilt effect ("left" or "right") */
  tiltDirection?: 'left' | 'right';
  
  /** Whether it should automatically scroll */
  autoplay?: boolean;
  
  /** Speed of automatic scrolling (pixels/frame approximately) */
  autoplaySpeed?: number;
  
  /** Direction of automatic scrolling ("down" or "up") */
  autoplayDirection?: 'down' | 'up';
  
  /** Pause autoplay on hover */
  pauseOnHover?: boolean;
}
