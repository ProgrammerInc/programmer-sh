/**
 * Type definitions for the CircularText component
 */

/**
 * Properties for the CircularText component
 */
export interface CircularTextProps {
  /** The text content to be displayed around the circle */
  text: string;
  /** Duration of one complete rotation in seconds */
  spinDuration?: number;
  /** Behavior when hovering over the component */
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  /** Additional CSS classes */
  className?: string;
  /** Optional width and height (default is 200px) */
  size?: number;
  /** Optional text size (default is 2xl) */
  fontSize?: string;
}
