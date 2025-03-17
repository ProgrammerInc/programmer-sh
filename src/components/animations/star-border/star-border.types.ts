/**
 * Type definitions for the Star Border animation component
 */

import { CSSProperties, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

/**
 * Props for the StarBorder component
 *
 * @template T - Element type to render as (defaults to 'button')
 */
export type StarBorderProps<T extends ElementType = 'button'> = ComponentPropsWithoutRef<T> & {
  /** Element type to render as */
  as?: T;
  /** Additional CSS class names */
  className?: string;
  /** Content to render within the border */
  children?: ReactNode;
  /** Color of the star border effect */
  color?: string;
  /** Animation speed duration */
  speed?: CSSProperties['animationDuration'];
};

/**
 * CSS variables interface for the StarBorder component
 */
export interface StarBorderCssVariables extends CSSProperties {
  '--star-color': string;
  '--animation-duration': CSSProperties['animationDuration'];
}
