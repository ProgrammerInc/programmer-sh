/**
 * Aspect Ratio Utilities
 *
 * Helper functions for the Aspect Ratio component.
 */

/**
 * Common aspect ratios used in media and design
 */
export const AspectRatios = {
  /** 16:9 - Standard widescreen video format */
  WIDESCREEN: 16 / 9,

  /** 4:3 - Traditional TV and computer monitor ratio */
  STANDARD: 4 / 3,

  /** 1:1 - Square format, commonly used in social media */
  SQUARE: 1,

  /** 3:2 - Common digital camera sensor ratio */
  PHOTO: 3 / 2,

  /** 21:9 - Ultra-wide cinema format */
  CINEMA: 21 / 9,

  /** 2:3 - Portrait orientation for photos */
  PORTRAIT: 2 / 3,

  /** 9:16 - Vertical video format (mobile) */
  VERTICAL: 9 / 16
};

/**
 * Calculate padding percentage for a given aspect ratio
 *
 * @param ratio - The aspect ratio as width/height
 * @returns Padding bottom percentage as a string with % suffix
 */
export const calculateRatioPadding = (ratio: number): string => {
  return `${(1 / ratio) * 100}%`;
};
