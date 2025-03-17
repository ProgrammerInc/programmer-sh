/**
 * Constants for the Rotating Text animation component
 */
import { AnimatePresenceMode, SplitBy, StaggerFrom } from './rotating-text.types';

/**
 * Default transition properties for text animations
 */
export const DEFAULT_TRANSITION = {
  type: 'spring',
  damping: 25,
  stiffness: 300
};

/**
 * Default initial animation state
 */
export const DEFAULT_INITIAL = { y: '100%', opacity: 0 };

/**
 * Default animate-to animation state
 */
export const DEFAULT_ANIMATE = { y: 0, opacity: 1 };

/**
 * Default exit animation state
 */
export const DEFAULT_EXIT = { y: '-120%', opacity: 0 };

/**
 * Default time between text rotations (in milliseconds)
 */
export const DEFAULT_ROTATION_INTERVAL = 2000;

/**
 * Default stagger duration between elements (in milliseconds)
 */
export const DEFAULT_STAGGER_DURATION = 0;

/**
 * Default origin point for stagger animations
 */
export const DEFAULT_STAGGER_FROM: StaggerFrom = 'first';

/**
 * Default AnimatePresence mode
 */
export const DEFAULT_ANIMATE_PRESENCE_MODE: AnimatePresenceMode = 'wait';

/**
 * Default whether to animate on initial render
 */
export const DEFAULT_ANIMATE_PRESENCE_INITIAL = false;

/**
 * Default text splitting strategy
 */
export const DEFAULT_SPLIT_BY: SplitBy = 'characters';

/**
 * Default auto-rotation setting
 */
export const DEFAULT_AUTO = true;

/**
 * Default looping setting
 */
export const DEFAULT_LOOP = true;

/**
 * CSS class names for different elements
 */
export const CSS_CLASSES = {
  MAIN: 'rotating-text__container',
  FLEX_WRAP: 'rotating-text__flex-wrap',
  FLEX_COLUMN: 'rotating-text__flex-column',
  SPLIT_LEVEL: 'rotating-text__split-level',
  ELEMENT_LEVEL: 'rotating-text__element-level',
  SR_ONLY: 'rotating-text__sr-only',
  WHITESPACE: 'rotating-text__whitespace',
  INLINE_BLOCK: 'rotating-text__inline-block',
  INLINE_FLEX: 'rotating-text__inline-flex'
};
