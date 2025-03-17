/**
 * Constants for the AnimatedContent animation component
 */
import { SpringConfig } from '@react-spring/web';
import styles from './animated-content.module.css';
import { AnimationDirection } from './animated-content.types';

/**
 * Default values for the AnimatedContent component
 */
export const DEFAULT_VALUES = {
  /** Default animation distance in pixels */
  DISTANCE: 100,
  /** Default animation direction */
  DIRECTION: AnimationDirection.Vertical,
  /** Default reverse setting */
  REVERSE: false,
  /** Default initial opacity */
  INITIAL_OPACITY: 0,
  /** Default animate opacity setting */
  ANIMATE_OPACITY: true,
  /** Default scale value */
  SCALE: 1,
  /** Default intersection observer threshold */
  THRESHOLD: 0.1,
  /** Default animation delay in milliseconds */
  DELAY: 0
};

/**
 * Default spring configuration for animations
 */
export const DEFAULT_SPRING_CONFIG: SpringConfig = {
  /** Default tension value for spring animation */
  tension: 50,
  /** Default friction value for spring animation */
  friction: 25
};

/**
 * Mapping of animation directions to their respective transform properties
 */
export const DIRECTION_TO_TRANSFORM_MAP: Record<AnimationDirection, string> = {
  [AnimationDirection.Vertical]: 'Y',
  [AnimationDirection.Horizontal]: 'X'
};

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /** Container className */
  CONTAINER: styles['animated-content-container']
};
