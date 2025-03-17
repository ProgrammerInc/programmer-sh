import { HTMLProps, ReactNode } from 'react';

/**
 * Props for the AuroraBackground component
 *
 * @property {ReactNode} children - Content to render inside the aurora background
 * @property {boolean} [showRadialGradient=true] - Whether to apply radial gradient masking effect
 * @property {boolean} [withStars=true] - Whether to show a starry background alongside the aurora
 * @property {string} [ariaLabel] - Accessible label for the aurora background region
 * @property {HTMLProps<HTMLDivElement>} - All standard HTML div props are also accepted
 */
export interface AuroraBackgroundProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  withStars?: boolean;
  ariaLabel?: string;
}

/**
 * Configuration for the aurora animation
 *
 * @property {string[]} [gradientColors] - List of colors for the aurora gradient
 * @property {number} [blurAmount=10] - Amount of blur to apply to the aurora effect in pixels
 * @property {number} [opacity=0.5] - Opacity of the aurora effect (0-1)
 * @property {boolean} [invertInLightMode=true] - Whether to invert the aurora colors in light mode
 */
export interface AuroraAnimationConfig {
  gradientColors?: string[];
  blurAmount?: number;
  opacity?: number;
  invertInLightMode?: boolean;
}
