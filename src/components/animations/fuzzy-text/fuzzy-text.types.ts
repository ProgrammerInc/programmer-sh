/**
 * Type definitions for the FuzzyText component
 */

import { ReactNode } from 'react';

/**
 * Properties for the FuzzyText component
 */
export interface FuzzyTextProps {
  /** Content to be rendered with the fuzzy effect */
  children: ReactNode;
  /** Font size, can be a number (px) or string with units */
  fontSize?: number | string;
  /** Font weight, can be a number or string */
  fontWeight?: string | number;
  /** Font family, uses computed style if set to 'inherit' */
  fontFamily?: string;
  /** Text color */
  color?: string;
  /** Whether to enable hover interaction effect */
  enableHover?: boolean;
  /** Base intensity of the fuzzy effect */
  baseIntensity?: number;
  /** Intensity of the fuzzy effect when hovering */
  hoverIntensity?: number;
}
