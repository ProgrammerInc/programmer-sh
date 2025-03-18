/**
 * Aspect Ratio Component Types
 *
 * Type definitions for the Aspect Ratio component.
 */

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as React from 'react';

/**
 * AspectRatio component props
 * 
 * @property ratio - The desired ratio as a number (width/height). Examples: 16/9, 4/3, 1/1
 * @property className - Optional CSS class to apply to the component
 * @property children - Content to display within the aspect ratio container
 */
export interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  /** The ratio to maintain, expressed as width/height (e.g., 16/9, 4/3, 1) */
  ratio?: number;
}
