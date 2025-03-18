/**
 * Slider Component
 *
 * A flexible slider component based on Radix UI's Slider primitive.
 * Allows users to select a value or range from a range of values.
 *
 * Features:
 * - Single value or range selection
 * - Customizable min, max, and step values
 * - Keyboard navigation support
 * - Screen reader accessibility
 * - Customizable styling with CSS modules
 *
 * @example
 * ```tsx
 * // Basic slider with single value
 * <Slider defaultValue={[50]} max={100} step={1} />
 *
 * // Range slider with two values
 * <Slider defaultValue={[20, 80]} max={100} step={1} />
 *
 * // Custom styled slider
 * <Slider>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 * </Slider>
 *
 * // Slider with aria-label for accessibility
 * <Slider aria-label="Volume" defaultValue={[50]} />
 * ```
 */

// Export slider components
export * from './slider';
export * from './slider.types';

// For backwards compatibility
import { Slider } from './slider';
export default Slider;
