/**
 * InfiniteScroll Component
 *
 * A vertical infinite scrolling container that can display any React content
 * with support for autoplay, tilting effects, and interactive scrolling.
 *
 * Features:
 * - Smooth infinite scrolling with GSAP animations
 * - Autoplay support with customizable speed and direction
 * - Interactive scrolling with mouse/touch input
 * - 3D tilting effect options
 * - Customizable styling
 * - Fade-in/fade-out gradient overlays
 *
 * @example
 * ```tsx
 * import { InfiniteScroll } from '@/components/ui/infinite-scroll';
 *
 * export function MyScrollingContent() {
 *   const items = [
 *     { content: <div>First Item</div> },
 *     { content: <div>Second Item</div> },
 *     { content: <div>Third Item</div> }
 *   ];
 *
 *   return (
 *     <InfiniteScroll
 *       items={items}
 *       autoplay={true}
 *       width="30rem"
 *       isTilted={true}
 *     />
 *   );
 * }
 * ```
 *
 * @module
 */

// Export the InfiniteScroll component
import InfiniteScroll from './infinite-scroll';

// Export types for external usage
export type {
  InfiniteScrollItem,
  InfiniteScrollProps
} from './infinite-scroll.types';

// For backwards compatibility
export default InfiniteScroll;
