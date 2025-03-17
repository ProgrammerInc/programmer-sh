/**
 * Text Pressure Animation Component Utilities
 */

import { CharPosition, MousePosition } from './text-pressure.types';

/**
 * Calculate distance between two points
 *
 * @param a - First point
 * @param b - Second point
 * @returns Euclidean distance between the points
 */
export const calculateDistance = (a: MousePosition, b: CharPosition): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate attribute value based on distance
 *
 * @param distance - Distance from mouse to character
 * @param minVal - Minimum value for the attribute
 * @param maxVal - Maximum value for the attribute
 * @param maxDist - Maximum distance for scaling
 * @returns Calculated attribute value
 */
export const calculateAttributeValue = (
  distance: number,
  minVal: number,
  maxVal: number,
  maxDist: number
): number => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

/**
 * Format a number value for use in font-variation-settings
 *
 * @param value - The numeric value
 * @param isFloatingPoint - Whether to format as floating point
 * @returns Formatted value as string
 */
export const formatVariationValue = (value: number, isFloatingPoint = false): string => {
  return isFloatingPoint ? value.toFixed(2) : Math.floor(value).toString();
};

/**
 * Generate font-variation-settings string
 *
 * @param wght - Weight value
 * @param wdth - Width value
 * @param ital - Italic value
 * @returns CSS font-variation-settings string
 */
export const generateFontVariationSettings = (wght: number, wdth: number, ital: number): string => {
  return `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
};

/**
 * Generate CSS for font-face
 *
 * @param fontFamily - Font family name
 * @param fontUrl - URL to the font file
 * @returns CSS string for @font-face rule
 */
export const generateFontFaceCSS = (fontFamily: string, fontUrl: string): string => {
  return `
    @font-face {
      font-family: '${fontFamily}';
      src: url('${fontUrl}');
      font-style: normal;
    }
  `;
};

/**
 * Generate CSS for stroke effect
 *
 * @param textColor - Text color
 * @param strokeColor - Stroke color
 * @param strokeWidth - Stroke width
 * @returns CSS string for stroke effect
 */
export const generateStrokeCSS = (
  textColor: string,
  strokeColor: string,
  strokeWidth: number
): string => {
  return `
    .stroke span {
      position: relative;
      color: ${textColor};
    }
    .stroke span::after {
      content: attr(data-char);
      position: absolute;
      left: 0;
      top: 0;
      color: transparent;
      z-index: -1;
      -webkit-text-stroke-width: ${strokeWidth}px;
      -webkit-text-stroke-color: ${strokeColor};
    }
  `;
};
