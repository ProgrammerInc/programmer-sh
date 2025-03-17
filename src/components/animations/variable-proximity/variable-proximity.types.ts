/**
 * Variable Proximity Animation Component Types
 */

import { CSSProperties, MutableRefObject } from 'react';

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Font variation axis settings
 */
export interface AxisSetting {
  axis: string;
  fromValue: number;
  toValue: number;
}

/**
 * Falloff types for proximity effect
 */
export type FalloffType = 'linear' | 'exponential' | 'gaussian';

/**
 * Variable Proximity component own properties
 */
export interface VariableProximityOwnProps {
  /**
   * Text to display with the proximity effect
   */
  label: string;

  /**
   * Font variation settings for the furthest distance
   * Format: 'axis1' value1, 'axis2' value2, ...
   */
  fromFontVariationSettings: string;

  /**
   * Font variation settings for the closest distance
   * Format: 'axis1' value1, 'axis2' value2, ...
   */
  toFontVariationSettings: string;

  /**
   * Reference to the container element
   */
  containerRef: MutableRefObject<HTMLElement | null>;

  /**
   * Radius of effect in pixels
   * @default 50
   */
  radius?: number;

  /**
   * Type of falloff calculation
   * @default 'linear'
   */
  falloff?: FalloffType;

  /**
   * Additional className for the component
   */
  className?: string;

  /**
   * onClick handler
   */
  onClick?: () => void;

  /**
   * Additional inline styles
   */
  style?: CSSProperties;
}

/**
 * Variable Proximity component props
 * Combines own props with HTML span attributes
 */
export type VariableProximityProps = VariableProximityOwnProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, keyof VariableProximityOwnProps>;
