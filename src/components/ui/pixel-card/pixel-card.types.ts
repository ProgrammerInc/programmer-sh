'use client';

import * as React from 'react';

/**
 * Pixel Card Variant Types
 * 
 * Available visual style variants for the PixelCard component.
 */
export type PixelCardVariant = 'default' | 'blue' | 'yellow' | 'pink';

/**
 * Pixel Card Props
 * 
 * Props for the PixelCard component that creates a card with animated pixel effects on hover/focus.
 * 
 * @property variant - The color scheme variant for the card
 * @property gap - Spacing between pixels in the animation
 * @property speed - Animation speed for the pixels
 * @property colors - Comma-separated list of hex color values for pixels
 * @property noFocus - Whether to disable focus animations
 * @property className - Additional CSS classes to apply
 * @property children - Content to render inside the card
 */
export interface PixelCardProps {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: PixelCardVariant;
  
  /**
   * Spacing between pixels in animation grid
   * @default 15 (from variants)
   */
  gap?: number;
  
  /**
   * Animation speed for the pixels
   * @default 0.1 (from variants)
   */
  speed?: number;
  
  /**
   * Comma-separated list of hex color values for pixels
   * @example '#ef4444,#f59e0b,#84cc16'
   */
  colors?: string;
  
  /**
   * Whether to disable focus animations
   * @default false
   */
  noFocus?: boolean;
  
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
  
  /**
   * Content to render inside the card
   */
  children: React.ReactNode;
}

/**
 * Pixel Properties
 * 
 * Internal interface for pixel configuration within the animation.
 */
export interface PixelConfig {
  activeColor: string | null;
  gap: number;
  speed: number;
  colors: string;
  noFocus: boolean;
}
