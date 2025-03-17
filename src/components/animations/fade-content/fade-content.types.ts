import { ReactNode } from 'react';

/**
 * Props for the FadeContent component
 */
export interface FadeContentProps {
  /** React children to be rendered with fade effect */
  children: ReactNode;

  /** Whether to apply a blur effect during transition (default: false) */
  blur?: boolean;

  /** Duration of the fade animation in milliseconds (default: 1000) */
  duration?: number;

  /** CSS timing function for the animation (default: 'ease-out') */
  easing?: string;

  /** Delay before starting animation after intersection in milliseconds (default: 0) */
  delay?: number;

  /** Intersection observer threshold, 0.0 to 1.0 (default: 0.1) */
  threshold?: number;

  /** Initial opacity before animation starts (default: 0) */
  initialOpacity?: number;

  /** Optional CSS class names */
  className?: string;
}
