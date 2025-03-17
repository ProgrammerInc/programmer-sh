/**
 * Type definitions for the DecryptedText component
 */

/**
 * Direction for the text reveal animation
 */
export type RevealDirection = 'start' | 'end' | 'center';

/**
 * Animation trigger method
 */
export type AnimateTrigger = 'view' | 'hover';

/**
 * Properties for the DecryptedText component
 */
export interface DecryptedTextProps {
  /** Text to be animated/decrypted */
  text: string;
  /** Speed of the decryption animation in milliseconds */
  speed?: number;
  /** Maximum number of iterations for the scrambling effect */
  maxIterations?: number;
  /** Whether to reveal characters sequentially */
  sequential?: boolean;
  /** Direction from which to reveal the text */
  revealDirection?: RevealDirection;
  /** Whether to use only characters from the original text for scrambling */
  useOriginalCharsOnly?: boolean;
  /** Set of characters to use for scrambling */
  characters?: string;
  /** CSS class for decrypted characters */
  className?: string;
  /** CSS class for encrypted characters */
  encryptedClassName?: string;
  /** CSS class for the parent container */
  parentClassName?: string;
  /** What interaction triggers the animation */
  animateOn?: AnimateTrigger;
  /** Allow for additional props */
  [key: string]: unknown;
}
