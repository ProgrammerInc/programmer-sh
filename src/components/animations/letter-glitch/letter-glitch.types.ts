/**
 * Props interface for the LetterGlitch animation component.
 */
export interface LetterGlitchProps {
  /**
   * Array of hex color strings for glitch effects.
   * @default ['#2b4539', '#61dca3', '#61b3dc']
   */
  glitchColors?: string[];

  /**
   * Speed of the glitch update in milliseconds. Lower values create faster animations.
   * @default 50
   */
  glitchSpeed?: number;

  /**
   * Whether to apply a dark vignette effect in the center of the animation.
   * @default false
   */
  centerVignette?: boolean;

  /**
   * Whether to apply a dark vignette effect around the edges of the animation.
   * @default true
   */
  outerVignette?: boolean;

  /**
   * Whether to use smooth color transitions between glitch states.
   * @default true
   */
  smooth?: boolean;
}

/**
 * Interface for a letter in the glitch grid.
 */
export interface GlitchLetter {
  /**
   * The character to display.
   */
  char: string;

  /**
   * The current color of the character (hex or rgb string).
   */
  color: string;

  /**
   * The target color for smooth transitions.
   */
  targetColor: string;

  /**
   * Progress of color transition (0-1).
   */
  colorProgress: number;
}

/**
 * Grid dimensions interface.
 */
export interface GlitchGrid {
  /**
   * Number of columns in the grid.
   */
  columns: number;

  /**
   * Number of rows in the grid.
   */
  rows: number;
}

/**
 * RGB color representation.
 */
export interface RGB {
  /**
   * Red component (0-255).
   */
  r: number;

  /**
   * Green component (0-255).
   */
  g: number;

  /**
   * Blue component (0-255).
   */
  b: number;
}
