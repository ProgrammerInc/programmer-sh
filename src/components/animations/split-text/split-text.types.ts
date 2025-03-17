/**
 * Type definitions for the Split Text animation component
 */

import { SpringConfig } from '@react-spring/web';

/**
 * Props for the SplitText component
 *
 * @property {string} text - The text content to animate
 * @property {string} className - Additional CSS class names for styling
 * @property {number} delay - The delay between each letter animation in milliseconds
 * @property {AnimationStyle} animationFrom - The starting animation style
 * @property {AnimationStyle} animationTo - The ending animation style
 * @property {SpringConfig['easing']} easing - The easing function for the animation
 * @property {number} threshold - The visibility threshold for triggering the animation
 * @property {string} rootMargin - The root margin for the intersection observer
 * @property {TextAlignOption} textAlign - The text alignment
 * @property {() => void} onLetterAnimationComplete - Callback when all letters have finished animating
 */
export interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: AnimationStyle;
  animationTo?: AnimationStyle;
  easing?: SpringConfig['easing'];
  threshold?: number;
  rootMargin?: string;
  textAlign?: TextAlignOption;
  onLetterAnimationComplete?: () => void;
}

/**
 * Animation style properties for transitions
 */
export interface AnimationStyle {
  opacity: number;
  transform: string;
}

/**
 * Text alignment options
 */
export type TextAlignOption = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';

/**
 * Processed text data
 */
export interface ProcessedText {
  words: string[][];
  letters: string[];
}

/**
 * Container styles for the text
 */
export interface ContainerStyles {
  textAlign: TextAlignOption;
  whiteSpace: 'normal';
  wordWrap: 'break-word';
}

/**
 * Span styles for words and spaces
 */
export interface SpanStyles {
  display: 'inline-block';
  whiteSpace?: 'nowrap';
  width?: string;
}
