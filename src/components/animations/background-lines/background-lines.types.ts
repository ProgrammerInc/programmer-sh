import { ReactNode } from 'react';

/**
 * Options for SVG animation
 *
 * @interface SVGOptions
 */
export interface SVGOptions {
  /** Duration of the animation in seconds (default: 10) */
  duration?: number;
}

/**
 * Props for the SVG component within BackgroundLines
 *
 * @interface SVGProps
 */
export interface SVGProps {
  /** Optional configuration for the SVG animation */
  svgOptions?: SVGOptions;
}

/**
 * Props for the BackgroundLines component
 *
 * @interface BackgroundLinesProps
 */
export interface BackgroundLinesProps extends SVGProps {
  /** Content to be displayed over the animated background lines */
  children: ReactNode;
  /** Optional className for custom styling */
  className?: string;
}
