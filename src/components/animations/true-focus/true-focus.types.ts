/**
 * True Focus Animation Component Types
 */

import { HTMLAttributes } from 'react';

/**
 * Rectangle dimensions and position for focus highlight
 */
export interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * True Focus component own properties
 */
export interface TrueFocusOwnProps {
  /**
   * The sentence to display and animate focus between words
   * @default 'True Focus'
   */
  sentence?: string;

  /**
   * Whether to enable manual mode (focus follows mouse)
   * @default false
   */
  manualMode?: boolean;

  /**
   * Amount of blur for non-focused words in pixels
   * @default 5
   */
  blurAmount?: number;

  /**
   * Border color for the focus highlight
   * @default 'green'
   */
  borderColor?: string;

  /**
   * Glow color for the focus highlight
   * @default 'rgba(0, 255, 0, 0.6)'
   */
  glowColor?: string;

  /**
   * Duration of the focus animation in seconds
   * @default 0.5
   */
  animationDuration?: number;

  /**
   * Pause between animations in seconds
   * @default 1
   */
  pauseBetweenAnimations?: number;
}

/**
 * True Focus component props
 * Combines own props with HTML div attributes
 */
export type TrueFocusProps = TrueFocusOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TrueFocusOwnProps>;
