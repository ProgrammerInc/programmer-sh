'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

/**
 * Progress Component Props
 *
 * Props for the Progress component that extends Radix UI's Progress primitive.
 * Provides a visual indicator to show completion status of a task.
 *
 * @see [Radix UI Progress](https://www.radix-ui.com/primitives/docs/components/progress)
 */
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /**
   * The current progress value (0-100)
   *
   * Represents the current completion percentage of the task.
   * - 0 represents no progress
   * - 100 represents completion
   * - Values between 0-100 represent partial completion
   * - If undefined, the progress will show 0%
   *
   * @default 0
   */
  value?: number;

  /**
   * Accessibility label for the progress indicator
   *
   * Provides an accessible name for screen readers.
   * Use this to describe what this progress bar represents.
   *
   * @example "File upload progress"
   * @example "Installation completion"
   */
  'aria-label'?: string;
}
