'use client';

import * as React from 'react';

/**
 * Skeleton Component Variants
 *
 * Different visual variants for the skeleton component.
 */
export type SkeletonVariant = 'default' | 'circle' | 'avatar' | 'text' | 'button' | 'card';

/**
 * Skeleton Component Props
 *
 * Props for the Skeleton component that displays loading placeholders.
 * The component accepts all standard HTML attributes of the underlying element type.
 *
 * @property {string} [className] - Additional CSS classes to apply
 * @property {SkeletonVariant} [variant] - Visual variant of the skeleton (default: 'default')
 * @property {boolean} [pulse] - Whether to show the pulsing animation (default: true)
 * @property {boolean} [visible] - Whether the skeleton is visible (default: true)
 * @property {string} [loadingLabel] - Accessible label for screen readers
 */
export interface SkeletonProps {
  /** Additional CSS classes to apply */
  className?: string;

  /** Child content (rarely used in skeletons) */
  children?: React.ReactNode;

  /** Visual variant of the skeleton */
  variant?: SkeletonVariant;

  /** Whether to show the pulsing animation */
  pulse?: boolean;

  /** Whether the skeleton is visible */
  visible?: boolean;

  /** Accessible label for screen readers */
  loadingLabel?: string;
}
