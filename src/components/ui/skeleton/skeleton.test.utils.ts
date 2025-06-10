'use client';

import { SkeletonVariant } from './skeleton.types';

/**
 * Utility functions for testing the Skeleton component
 */

/**
 * Get dimensions for a specific skeleton variant
 *
 * @param variant The skeleton variant
 * @returns Object containing width and height CSS values
 */
export function getSkeletonDimensions(variant: SkeletonVariant): { width: string; height: string } {
  switch (variant) {
    case 'avatar':
      return { width: '3rem', height: '3rem' };
    case 'text':
      return { width: '100%', height: '1rem' };
    case 'button':
      return { width: '100%', height: '2.5rem' };
    case 'card':
      return { width: '100%', height: 'auto' };
    case 'circle':
      return { width: '3rem', height: '3rem' };
    default:
      return { width: '100%', height: 'auto' };
  }
}

/**
 * Determine if a skeleton variant should be rendered with specific ARIA attributes
 *
 * @param variant The skeleton variant
 * @returns Object containing recommended ARIA attributes
 */
export function getSkeletonAccessibilityAttributes(
  variant: SkeletonVariant
): Record<string, string> {
  const baseAttributes = {
    role: 'status',
    'aria-busy': 'true',
    'aria-live': 'polite'
  };

  switch (variant) {
    case 'avatar':
      return { ...baseAttributes, 'aria-label': 'Loading user avatar' };
    case 'text':
      return { ...baseAttributes, 'aria-label': 'Loading text content' };
    case 'button':
      return { ...baseAttributes, 'aria-label': 'Loading button' };
    case 'card':
      return { ...baseAttributes, 'aria-label': 'Loading card content' };
    default:
      return baseAttributes;
  }
}

/**
 * Get appropriate test IDs for skeleton variants
 *
 * @param variant The skeleton variant
 * @returns A test ID string for the component
 */
export function getSkeletonTestId(variant: SkeletonVariant): string {
  return `skeleton-${variant}`;
}
