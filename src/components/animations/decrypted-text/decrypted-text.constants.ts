/**
 * Constants for the DecryptedText component
 */

import { AnimateTrigger, RevealDirection } from './decrypted-text.types';

/**
 * Default animation speed in milliseconds
 */
export const DEFAULT_SPEED = 50;

/**
 * Default maximum number of iterations for non-sequential animations
 */
export const DEFAULT_MAX_ITERATIONS = 10;

/**
 * Default value for sequential animation
 */
export const DEFAULT_SEQUENTIAL = false;

/**
 * Default direction for revealing characters
 */
export const DEFAULT_REVEAL_DIRECTION: RevealDirection = 'start';

/**
 * Default setting for using only original characters
 */
export const DEFAULT_USE_ORIGINAL_CHARS_ONLY = false;

/**
 * Default set of characters used for scrambling
 */
export const DEFAULT_CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

/**
 * Default CSS class for decrypted characters
 */
export const DEFAULT_CLASS_NAME = '';

/**
 * Default CSS class for encrypted characters
 */
export const DEFAULT_ENCRYPTED_CLASS_NAME = '';

/**
 * Default CSS class for the parent container
 */
export const DEFAULT_PARENT_CLASS_NAME = '';

/**
 * Default trigger for animation
 */
export const DEFAULT_ANIMATE_ON: AnimateTrigger = 'hover';

/**
 * Default intersection observer threshold
 */
export const DEFAULT_INTERSECTION_THRESHOLD = 0.1;

/**
 * Default intersection observer root margin
 */
export const DEFAULT_ROOT_MARGIN = '0px';
