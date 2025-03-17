/**
 * Type definitions for the CosmicScene component
 */

import React from 'react';

/**
 * Color scheme options for the cosmic scene
 */
export type ColorScheme =
  | 'default'
  | 'neon'
  | 'sunset'
  | 'ocean'
  | 'aurora'
  | 'cosmic'
  | 'forest'
  | 'desert'
  | 'twilight'
  | 'volcano'
  | 'arctic'
  | 'nebula'
  | 'rainbow'
  | 'midnight';

/**
 * Properties for the CosmicScene component
 */
export interface CosmicSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the cosmic grid pattern (default: '20px') */
  size?: string;
  /** Color scheme to use for the cosmic background */
  colorScheme?: ColorScheme;
  /** Whether the scene should react to mouse movements */
  interactive?: boolean;
  /** Elements to render inside the scene */
  children?: React.ReactNode;
  /** Opacity of a black overlay (0-1) */
  overlayOpacity?: number;
}
