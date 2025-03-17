/**
 * Constants for the Split Text animation component
 */

import { AnimationStyle, TextAlignOption } from './split-text.types';

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /** Parent container class */
  PARENT_CONTAINER: 'split-text-parent',
  /** Letter class */
  LETTER: 'split-text-letter',
  /** Word class */
  WORD: 'split-text-word',
  /** Space class */
  SPACE: 'split-text-space',
  /** Overflow hidden class */
  OVERFLOW_HIDDEN: 'overflow-hidden',
  /** Inline class */
  INLINE: 'inline',
  /** Inline block class */
  INLINE_BLOCK: 'inline-block',
  /** Transform class */
  TRANSFORM: 'transform',
  /** Transition opacity class */
  TRANSITION_OPACITY: 'transition-opacity',
  /** Will change transform class */
  WILL_CHANGE_TRANSFORM: 'will-change-transform'
};

/**
 * Default animation configuration
 */
export const DEFAULT_ANIMATION = {
  /** @type {AnimationStyle} Default starting animation values */
  FROM: { opacity: 0, transform: 'translate3d(0,40px,0)' },
  /** @type {AnimationStyle} Default ending animation values */
  TO: { opacity: 1, transform: 'translate3d(0,0,0)' },
  /** @type {number} Default delay between letter animations in milliseconds */
  DELAY: 100
};

/**
 * Intersection observer defaults
 */
export const INTERSECTION = {
  /** @type {number} Default threshold for triggering the animation */
  THRESHOLD: 0.1,
  /** @type {string} Default root margin for the intersection observer */
  ROOT_MARGIN: '-100px'
};

/**
 * Text styling defaults
 */
export const TEXT_STYLE = {
  /** @type {TextAlignOption} Default text alignment */
  ALIGN: 'center' as TextAlignOption,
  /** @type {string} Space width in em units */
  SPACE_WIDTH: '0.3em'
};
