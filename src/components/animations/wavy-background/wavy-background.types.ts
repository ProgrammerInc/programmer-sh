/**
 * Types for the WavyBackground animation component
 */
import type { ReactNode } from 'react';

/**
 * Props for the WavyBackground component
 */
export interface WavyBackgroundProps {
  /** Child content to render on top of the wavy background */
  children?: ReactNode;
  /** Additional class name for the children container */
  className?: string;
  /** Additional class name for the outer container */
  containerClassName?: string;
  /** Array of colors to use for the waves */
  colors?: string[];
  /** Width of each wave line */
  waveWidth?: number;
  /** Background fill color */
  backgroundFill?: string;
  /** Blur amount applied to the waves */
  blur?: number;
  /** Animation speed - slow or fast */
  speed?: 'slow' | 'fast';
  /** Opacity of the waves */
  waveOpacity?: number;
  /** Additional props */
  [key: string]: unknown;
}
