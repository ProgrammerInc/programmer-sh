import { CSSProperties } from 'react';

/**
 * Props for the GlitchText component
 */
export interface GlitchTextProps {
  /** Text content to display with glitch effect */
  children: string;

  /** Animation speed multiplier (lower is faster) (default: 0.5) */
  speed?: number;

  /** Whether to show colored shadow effects (default: true) */
  enableShadows?: boolean;

  /** Whether the glitch effect only activates on hover (default: false) */
  enableOnHover?: boolean;

  /** Optional CSS class names */
  className?: string;
}

/**
 * Extended CSS Properties interface to support CSS custom properties for the glitch effect
 */
export interface GlitchCSSProperties extends CSSProperties {
  /** Animation duration for the after pseudo-element */
  '--after-duration': string;

  /** Animation duration for the before pseudo-element */
  '--before-duration': string;

  /** Text shadow color and offset for the after pseudo-element */
  '--after-shadow': string;

  /** Text shadow color and offset for the before pseudo-element */
  '--before-shadow': string;
}
