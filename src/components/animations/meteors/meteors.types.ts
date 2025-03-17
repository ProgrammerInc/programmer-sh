import { HTMLAttributes } from 'react';

/**
 * Props for the Meteors component
 *
 * @example
 * <Meteors
 *   number={100}
 *   color="#4c1d95"
 *   withStars={true}
 *   className="opacity-70"
 * />
 */
export interface MeteorsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom color for the meteors gradient.
   * Set as CSS variable --meteor-from-color if provided
   */
  color?: string;

  /**
   * Number of meteor elements to render.
   * Default is 50 if not specified.
   */
  number?: number;

  /**
   * Optional CSS class name to apply to the meteors
   */
  className?: string;

  /**
   * Whether to render the StarsBackground component as well.
   * Default is true.
   */
  withStars?: boolean;
}
