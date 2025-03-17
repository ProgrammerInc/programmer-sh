import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

/**
 * Props for the Progress component
 */
export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /**
   * The current value of the progress indicator (0-100)
   */
  value?: number;
}
