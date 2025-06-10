/**
 * Elastic Slider Component Module
 *
 * A slider component with elastic effects when dragging beyond the bounds.
 * It provides visual feedback through animations and haptic-like UI responses.
 */

// Import components first
import { ElasticSlider } from './elastic-slider';

// Named exports for the elastic slider component
export { ElasticSlider };

// Export types with explicit names to avoid conflicts
export type { 
  ElasticSliderProps,
  // Rename SliderProps to avoid conflicts with the standard slider component
  SliderProps as ElasticSliderInternalProps 
} from './elastic-slider.types';

// Default export for backward compatibility
export default ElasticSlider;
