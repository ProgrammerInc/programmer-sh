/**
 * Constants used by the Aurora Background component
 *
 * @module AuroraBackground
 */

import { AuroraAnimationConfig } from './aurora-background.types';

/**
 * Default aurora animation configuration
 *
 * @property {string[]} gradientColors - Default gradient colors for the aurora effect
 * @property {number} blurAmount - Default blur amount in pixels
 * @property {number} opacity - Default opacity value (0-1)
 * @property {boolean} invertInLightMode - Whether to invert colors in light mode
 */
export const DEFAULT_AURORA_CONFIG: AuroraAnimationConfig = {
  gradientColors: [
    'var(--blue-500)',
    'var(--indigo-300)',
    'var(--blue-300)',
    'var(--violet-200)',
    'var(--blue-400)'
  ],
  blurAmount: 10,
  opacity: 0.5,
  invertInLightMode: true
};

/**
 * CSS class names used in the Aurora Background component
 */
export const CSS_CLASSES = {
  container: 'relative flex flex-col h-[100vh] items-center justify-center transition-bg',
  auroraBase: `
    [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
    [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
    [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
    [background-image:var(--white-gradient),var(--aurora)]
    dark:[background-image:var(--dark-gradient),var(--aurora)]
    [background-size:300%,_200%]
    [background-position:50%_50%,50%_50%]
    filter blur-[10px] invert dark:invert-0
    after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
    after:dark:[background-image:var(--dark-gradient),var(--aurora)]
    after:[background-size:200%,_100%] 
    after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
    pointer-events-none
    absolute -inset-[10px] opacity-50 will-change-transform
  `,
  radialGradient:
    '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]'
};
