/**
 * Type definitions for the CountUp component
 */

/**
 * Properties for the CountUp component
 */
export interface CountUpProps {
  /** Target number to count to */
  to: number;
  /** Starting number (default: 0) */
  from?: number;
  /** Direction of counting animation (default: 'up') */
  direction?: 'up' | 'down';
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Duration of the animation in seconds (default: 2) */
  duration?: number;
  /** CSS class name for styling */
  className?: string;
  /** Whether to start the animation (default: true) */
  startWhen?: boolean;
  /** Separator for formatting numbers (e.g., ',', '.', ' ') */
  separator?: string;
  /** Callback fired when animation starts */
  onStart?: () => void;
  /** Callback fired when animation ends */
  onEnd?: () => void;
}
