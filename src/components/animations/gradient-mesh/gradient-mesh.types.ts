/**
 * Type definitions for the Gradient Mesh component
 */

import React from 'react';

/**
 * Props for the GradientMesh component
 */
export interface GradientMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Primary color for the gradient
   * @default "#4f46e5"
   */
  primaryColor?: string;

  /**
   * Secondary color for the gradient
   * @default "#9333ea"
   */
  secondaryColor?: string;

  /**
   * Accent color for additional depth
   * @default "#ec4899"
   */
  accentColor?: string;

  /**
   * Animation speed in seconds
   * @default 20
   */
  animationSpeed?: number;

  /**
   * Blur intensity for the gradient
   * @default 100
   */
  blurIntensity?: number;
}
