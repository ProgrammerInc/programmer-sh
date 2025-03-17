/**
 * Constants for the BeamPortal component
 */

import { PortalVariant } from './beam-portal.types';

/**
 * Color schemes for different portal variants
 */
export const PORTAL_COLOR_SCHEMES: Record<
  PortalVariant,
  {
    primary: string;
    secondary: string;
    tertiary: string;
  }
> = {
  default: {
    primary: '0, 255, 200',
    secondary: '100, 200, 255',
    tertiary: '150, 100, 255'
  },
  matrix: {
    primary: '0, 255, 0',
    secondary: '0, 200, 0',
    tertiary: '0, 150, 0'
  },
  sunset: {
    primary: '255, 100, 0',
    secondary: '255, 50, 100',
    tertiary: '200, 0, 150'
  },
  aurora: {
    primary: '0, 255, 200',
    secondary: '100, 200, 255',
    tertiary: '150, 100, 255'
  },
  cosmic: {
    primary: '255, 0, 255',
    secondary: '150, 0, 255',
    tertiary: '50, 0, 200'
  },
  cyber: {
    primary: '0, 255, 255',
    secondary: '0, 150, 255',
    tertiary: '0, 100, 255'
  },
  frost: {
    primary: '200, 255, 255',
    secondary: '150, 200, 255',
    tertiary: '100, 150, 255'
  },
  fire: {
    primary: '255, 150, 0',
    secondary: '255, 100, 0',
    tertiary: '255, 50, 0'
  },
  void: {
    primary: '100, 0, 255',
    secondary: '50, 0, 200',
    tertiary: '25, 0, 150'
  },
  neon: {
    primary: '255, 0, 255',
    secondary: '0, 255, 255',
    tertiary: '0, 100, 255'
  },
  ocean: {
    primary: '0, 100, 255',
    secondary: '0, 150, 200',
    tertiary: '0, 200, 255'
  },
  forest: {
    primary: '50, 200, 50',
    secondary: '100, 255, 100',
    tertiary: '0, 150, 50'
  },
  desert: {
    primary: '255, 200, 100',
    secondary: '255, 150, 50',
    tertiary: '200, 100, 50'
  },
  twilight: {
    primary: '200, 100, 255',
    secondary: '100, 50, 200',
    tertiary: '50, 0, 100'
  },
  volcano: {
    primary: '255, 50, 0',
    secondary: '255, 100, 0',
    tertiary: '200, 0, 0'
  },
  arctic: {
    primary: '200, 255, 255',
    secondary: '150, 200, 255',
    tertiary: '100, 150, 255'
  },
  nebula: {
    primary: '150, 100, 255',
    secondary: '200, 50, 255',
    tertiary: '100, 0, 200'
  },
  rainbow: {
    primary: '255, 0, 0',
    secondary: '0, 255, 0',
    tertiary: '0, 0, 255'
  },
  midnight: {
    primary: '50, 0, 100',
    secondary: '0, 0, 100',
    tertiary: '0, 0, 50'
  }
};

/**
 * Animation intensity settings
 */
export const INTENSITY_SETTINGS = {
  calm: { speed: 10, opacity: 0.2, count: 4, delay: 0.5 },
  active: { speed: 7, opacity: 0.3, count: 6, delay: 0.3 },
  intense: { speed: 5, opacity: 0.4, count: 8, delay: 0.2 }
};

/**
 * Pattern styles for beam animations
 */
export const PATTERN_STYLES: Record<
  string,
  {
    transform: string;
    animation: string;
  }
> = {
  default: {
    transform: 'rotate(var(--beam-angle))',
    animation: 'beam-drop'
  },
  linear: {
    transform: 'translateY(var(--offset))',
    animation: 'beam-drop'
  },
  radial: {
    transform: 'rotate(var(--beam-angle))',
    animation: 'beam-drop'
  },
  wave: {
    transform: 'rotate(var(--beam-angle)) translateX(var(--wave-offset))',
    animation: 'beam-wave'
  },
  pulse: {
    transform: 'scale(var(--pulse-scale))',
    animation: 'beam-pulse'
  },
  zigzag: {
    transform: 'rotate(var(--beam-angle)) translateX(var(--zigzag-offset))',
    animation: 'beam-zigzag'
  }
};
