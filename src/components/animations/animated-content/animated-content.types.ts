import { SpringConfig } from '@react-spring/web';
import { ReactNode } from 'react';

/**
 * Direction options for the animation
 */
export enum AnimationDirection {
  /** Animation moves vertically (up/down) */
  Vertical = 'vertical',
  /** Animation moves horizontally (left/right) */
  Horizontal = 'horizontal'
}

/**
 * Props for the AnimatedContent component
 */
export interface AnimatedContentProps {
  /** The content to be animated */
  children: ReactNode;
  /** Distance in pixels for the animation transition (default: 100) */
  distance?: number;
  /** Direction of the animation (default: vertical) */
  direction?: `${AnimationDirection}`;
  /** Whether to reverse the animation direction (default: false) */
  reverse?: boolean;
  /** Spring configuration for the animation (default: { tension: 50, friction: 25 }) */
  config?: SpringConfig;
  /** Initial opacity value before animation (default: 0) */
  initialOpacity?: number;
  /** Whether to animate opacity along with position (default: true) */
  animateOpacity?: boolean;
  /** Initial scale value before animation (default: 1) */
  scale?: number;
  /** Intersection observer threshold for triggering animation (default: 0.1) */
  threshold?: number;
  /** Delay in milliseconds before starting animation after intersection (default: 0) */
  delay?: number;
  /** Additional class name for the container */
  className?: string;
}

/**
 * Mapping of animation directions to their respective transform properties
 */
export const directionToTransformMap: Record<AnimationDirection, string> = {
  [AnimationDirection.Vertical]: 'Y',
  [AnimationDirection.Horizontal]: 'X'
};
