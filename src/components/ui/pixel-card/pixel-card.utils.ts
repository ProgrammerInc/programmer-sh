'use client';

import { PixelConfig } from './pixel-card.types';

/**
 * Pixel Card Variants
 *
 * Predefined color and configuration variants for the PixelCard component.
 */
export const PIXEL_CARD_VARIANTS: Record<string, PixelConfig> = {
  default: {
    activeColor: null,
    gap: 15,
    speed: 0.1,
    colors: '#ef4444,#f59e0b,#84cc16,#10b981,#06b6d4,#6366f1,#8b5cf6,#d946ef',
    noFocus: false
  },
  blue: {
    activeColor: null,
    gap: 15,
    speed: 0.1,
    colors: '#0ea5e9,#0284c7,#0369a1,#075985',
    noFocus: false
  },
  yellow: {
    activeColor: null,
    gap: 15,
    speed: 0.1,
    colors: '#fcd34d,#fbbf24,#f59e0b,#d97706',
    noFocus: false
  },
  pink: {
    activeColor: null,
    gap: 15,
    speed: 0.1,
    colors: '#f9a8d4,#f472b6,#ec4899,#db2777',
    noFocus: false
  }
};

/**
 * Adjusts animation speed based on user's motion preferences
 *
 * @param value - Original speed value
 * @param reducedMotion - Whether reduced motion is preferred
 * @returns Adjusted speed value
 */
export function getEffectiveSpeed(value: number, reducedMotion: boolean): number {
  if (reducedMotion) {
    return value * 5;
  }
  return value;
}
