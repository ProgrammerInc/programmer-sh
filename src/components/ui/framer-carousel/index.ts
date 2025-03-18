/**
 * FramerCarousel Component
 *
 * A 3D carousel component built with Framer Motion for showcasing content with smooth
 * animations and interactive dragging capabilities.
 *
 * Features:
 * - 3D rotation and perspective effects
 * - Touch and drag navigation
 * - Autoplay functionality with pause on hover
 * - Loop mode for continuous scrolling
 * - Adaptable round or rectangular styles
 * - Navigation dots for direct slide access
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FramerCarousel />
 *
 * // With custom options
 * <FramerCarousel
 *   items={customItems}
 *   baseWidth={400}
 *   autoplay={true}
 *   autoplayDelay={3000}
 *   pauseOnHover={true}
 *   loop={true}
 *   round={false}
 * />
 * ```
 *
 * @module
 */

// Import and re-export all components and types
import FramerCarousel, { FramerCarouselDots, FramerCarouselItem } from './framer-carousel';

// Export types explicitly to avoid naming conflicts
export { FramerCarouselItem, FramerCarouselDots, FramerCarousel } from './framer-carousel';
export type { FramerCarouselDotsProps, FramerCarouselItemProps, FramerCarouselProps } from './framer-carousel.types';

// Export default for backwards compatibility
export default FramerCarousel;
