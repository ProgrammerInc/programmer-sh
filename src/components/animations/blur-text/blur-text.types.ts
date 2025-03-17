/**
 * Type definitions for the BlurText component
 */

// Import the EasingFunction type from react-spring
import { EasingFunction } from '@react-spring/web';

/**
 * Properties for the BlurText component
 */
export interface BlurTextProps {
  /** Text content to animate */
  text?: string;
  /** Delay before animation starts (in ms) */
  delay?: number;
  /** Optional CSS classes */
  className?: string;
  /** Whether to animate by words or individual letters */
  animateBy?: 'words' | 'letters';
  /** Direction from which the animation enters */
  direction?: 'top' | 'bottom';
  /** IntersectionObserver threshold value */
  threshold?: number;
  /** IntersectionObserver root margin value */
  rootMargin?: string;
  /** Initial animation state */
  animationFrom?: Record<string, unknown>;
  /** Target animation states (array for multi-step animations) */
  animationTo?: Record<string, unknown>[];
  /** Animation easing function */
  easing?: EasingFunction;
  /** Callback fired when animation completes */
  onAnimationComplete?: () => void;
}
