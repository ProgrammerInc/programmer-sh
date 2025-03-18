/**
 * Elastic Slider Component Module
 * 
 * A slider component with elastic effects when dragging beyond the bounds.
 * It provides visual feedback through animations and haptic-like UI responses.
 */

// Named exports for the elastic slider component and types
export * from './elastic-slider';
export * from './elastic-slider.types';

// Default export for backward compatibility
import { ElasticSlider } from './elastic-slider';
export default ElasticSlider;
