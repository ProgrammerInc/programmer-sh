/**
 * Counter component types
 */

import { CSSProperties } from 'react';
import { MotionValue } from 'framer-motion';

/**
 * Props for the Number component which renders a single digit in the counter
 * @interface NumberProps
 */
export interface NumberProps {
  /** The motion value that drives the animation */
  mv: MotionValue<number>;
  /** The number to display (0-9) */
  number: number;
  /** The height of the digit */
  height: number;
}

/**
 * Props for the Digit component which renders a column of numbers (0-9)
 * @interface DigitProps
 */
export interface DigitProps {
  /** The place value of this digit (e.g., 1, 10, 100) */
  place: number;
  /** The current value of the counter */
  value: number;
  /** The height of each digit */
  height: number;
  /** Optional custom styles for the digit container */
  digitStyle?: CSSProperties;
}

/**
 * Props for the Counter component
 * @interface CounterProps
 * @example
 * ```tsx
 * <Counter 
 *   value={123} 
 *   fontSize={48} 
 *   textColor="#333"
 * />
 * ```
 */
export interface CounterProps {
  /** The numeric value to display in the counter */
  value: number;
  /** Font size in pixels (default: 100) */
  fontSize?: number;
  /** Additional padding in pixels (default: 0) */
  padding?: number;
  /** Array of place values to display (default: [100, 10, 1]) */
  places?: number[];
  /** Gap between digits in pixels (default: 8) */
  gap?: number;
  /** Border radius in pixels (default: 4) */
  borderRadius?: number;
  /** Horizontal padding in pixels (default: 8) */
  horizontalPadding?: number;
  /** Text color (default: 'white') */
  textColor?: string;
  /** Font weight (default: 'bold') */
  fontWeight?: CSSProperties['fontWeight'];
  /** Custom styles for the outer container */
  containerStyle?: CSSProperties;
  /** Custom styles for the counter container */
  counterStyle?: CSSProperties;
  /** Custom styles for each digit */
  digitStyle?: CSSProperties;
  /** Height of the gradient overlay in pixels (default: 16) */
  gradientHeight?: number;
  /** Starting color of the gradient (default: 'black') */
  gradientFrom?: string;
  /** Ending color of the gradient (default: 'transparent') */
  gradientTo?: string;
  /** Custom styles for the top gradient */
  topGradientStyle?: CSSProperties;
  /** Custom styles for the bottom gradient */
  bottomGradientStyle?: CSSProperties;
}
