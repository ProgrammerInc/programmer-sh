/**
 * Text Pressure Animation Component Types
 */

import { HTMLAttributes } from 'react';

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Character position in viewport
 */
export interface CharPosition {
  x: number;
  y: number;
}

/**
 * Text Pressure component own properties
 */
export interface TextPressureOwnProps {
  /**
   * Text to display
   * @default 'Compressa'
   */
  text?: string;

  /**
   * Font family to use
   * @default 'Compressa VF'
   */
  fontFamily?: string;

  /**
   * URL to the font file
   * @default 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2'
   */
  fontUrl?: string;

  /**
   * Enable width variation
   * @default true
   */
  width?: boolean;

  /**
   * Enable weight variation
   * @default true
   */
  weight?: boolean;

  /**
   * Enable italic variation
   * @default true
   */
  italic?: boolean;

  /**
   * Enable opacity variation
   * @default false
   */
  alpha?: boolean;

  /**
   * Enable flex layout for characters
   * @default true
   */
  flex?: boolean;

  /**
   * Enable stroke effect
   * @default false
   */
  stroke?: boolean;

  /**
   * Enable automatic scaling
   * @default false
   */
  scale?: boolean;

  /**
   * Text color
   * @default '#FFFFFF'
   */
  textColor?: string;

  /**
   * Stroke color
   * @default '#FF0000'
   */
  strokeColor?: string;

  /**
   * Stroke width
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Minimum font size in pixels
   * @default 24
   */
  minFontSize?: number;
}

/**
 * Text Pressure component props
 * Combines own props with HTML div attributes
 */
export type TextPressureProps = TextPressureOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TextPressureOwnProps>;

/**
 * Font variation settings
 */
export interface FontVariationSettings {
  wght: number;
  wdth: number;
  ital: number;
}
