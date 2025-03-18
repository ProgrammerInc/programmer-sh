/**
 * @file framer-carousel.types.ts
 * @description Type definitions for the FramerCarousel component.
 */
import { MotionValue, SpringOptions } from 'framer-motion';

/**
 * Represents an item in the FramerCarousel.
 * Each item consists of a title, description, unique ID, and icon.
 * 
 * @example
 * ```tsx
 * const carouselItem: FramerCarouselItem = {
 *   title: 'Text Animations',
 *   description: 'Cool text animations for your projects.',
 *   id: 1,
 *   icon: <FiFileText className="h-[16px] w-[16px] text-white" />
 * };
 * ```
 */
export interface FramerCarouselItem {
  /** Title of the carousel item */
  title: string;
  
  /** Descriptive text for the carousel item */
  description: string;
  
  /** Unique identifier for the carousel item */
  id: number;
  
  /** Icon element to display with the carousel item */
  icon: JSX.Element;
}

/**
 * Props for the FramerCarousel component.
 * 
 * @example
 * ```tsx
 * <FramerCarousel
 *   items={carouselItems}
 *   baseWidth={400}
 *   autoplay={true}
 *   autoplayDelay={5000}
 *   pauseOnHover={true}
 *   loop={true}
 *   round={false}
 * />
 * ```
 */
export interface FramerCarouselProps {
  /** Array of items to display in the carousel */
  items?: FramerCarouselItem[];
  
  /** Base width of the carousel container in pixels */
  baseWidth?: number;
  
  /** Whether to automatically advance slides */
  autoplay?: boolean;
  
  /** Delay between autoplay transitions in milliseconds */
  autoplayDelay?: number;
  
  /** Whether to pause autoplay when user hovers over the carousel */
  pauseOnHover?: boolean;
  
  /** Whether to loop back to the first slide after the last slide */
  loop?: boolean;
  
  /** Whether to display the carousel in a round shape */
  round?: boolean;
}

/**
 * Props for the FramerCarouselItem component.
 * 
 * @internal
 */
export interface FramerCarouselItemProps {
  /** The carousel item data */
  item: FramerCarouselItem;
  
  /** Width of the carousel item */
  width: number;
  
  /** Whether the carousel is in round mode */
  round: boolean;
  
  /** Animation transition configuration */
  transition: SpringOptions | { duration: number };
  
  /** Rotation Y transform value */
  rotateY: MotionValue<number>;
}

/**
 * Props for the FramerCarouselDots component.
 * 
 * @internal
 */
export interface FramerCarouselDotsProps {
  /** Total number of items in the carousel */
  items: FramerCarouselItem[];
  
  /** Current active index */
  currentIndex: number;
  
  /** Function to set the current index */
  setCurrentIndex: (index: number) => void;
  
  /** Whether the carousel is in round mode */
  round: boolean;
}
