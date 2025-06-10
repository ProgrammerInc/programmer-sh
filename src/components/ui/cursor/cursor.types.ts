/**
 * Cursor component types
 */

import {
  ArrowCursorProps,
  BlobCursorProps,
  BubbleCursorProps,
  CharacterCursorProps,
  CrosshairProps,
  FairyDustCursorProps,
  MagicTrailCursorProps,
  RainbowCursorProps,
  RibbonsProps,
  RippleCursorProps,
  SnowflakeCursorProps,
  SpotlightCursorProps,
  SpringyCursorProps,
  TextFlagCursorProps,
  TrailingCursorProps
} from '@/components/cursors';
import { HTMLAttributes, RefObject } from 'react';

/**
 * Type of cursor to display
 *
 * @typedef {string} CursorType
 */
export type CursorType = 'default' | 'cursor' | 'image' | 'animation';

/**
 * Cursor definition interface
 *
 * This describes a cursor preset with all its properties
 *
 * @interface Cursor
 */
export interface Cursor {
  /** Unique identifier for the cursor */
  id: string;
  /** Display name of the cursor */
  name: string;
  /** Description of the cursor effect */
  description: string;
  /** Type of cursor (default, cursor, image, animation) */
  type: CursorType;
  /** Animation name for animation type cursors */
  animation?: string;
  /** Props to pass to the animation component */
  animationProps?:
    | ArrowCursorProps
    | BlobCursorProps
    | BubbleCursorProps
    | CharacterCursorProps
    | CrosshairProps
    | FairyDustCursorProps
    | MagicTrailCursorProps
    | RainbowCursorProps
    | RibbonsProps
    | RippleCursorProps
    | SnowflakeCursorProps
    | SpotlightCursorProps
    | SpringyCursorProps
    | TextFlagCursorProps
    | TrailingCursorProps;
  /** Additional animation type classification */
  animationType?: string;
  /** Theme preference for the cursor */
  theme?: 'light' | 'dark';
  /** URL for image type cursors */
  url?: string;
}

/**
 * Props for the Cursor Provider component
 *
 * @interface CursorProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 * @example
 * ```tsx
 * <CursorProvider
 *   cursor="rainbow"
 *   theme="dark"
 *   color="#ff5500"
 * />
 * ```
 */
export interface CursorProps extends HTMLAttributes<HTMLDivElement> {
  /** Color to use for cursor elements (default is based on theme) */
  color?: string;
  /** Optional ref to attach the cursor container to an existing element */
  containerRef?: RefObject<HTMLDivElement> | null;
  /** The cursor preset to use (default: 'default') */
  cursor?: string;
  /** Theme preference affecting cursor colors (default: 'dark') */
  theme?: 'light' | 'dark';
}
