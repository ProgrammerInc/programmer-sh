/**
 * Options for the ASCII filter that converts rendered graphics to ASCII text
 */
export interface AsciiFilterOptions {
  /** Font size in pixels (default: 12) */
  fontSize?: number;
  /** Font family to use (default: 'Courier New', monospace) */
  fontFamily?: string;
  /** Character set to use for ASCII representation (default: various symbols) */
  charset?: string;
  /** Whether to invert the brightness mapping (default: true) */
  invert?: boolean;
}

/**
 * Options for canvas text rendering
 */
export interface CanvasTxtOptions {
  /** Font size in pixels (default: 200) */
  fontSize?: number;
  /** Font family to use (default: 'Arial') */
  fontFamily?: string;
  /** Text color (default: '#fdf9f3') */
  color?: string;
  /** Text alignment (default: 'center') */
  align?: 'left' | 'center' | 'right';
  /** Vertical alignment (default: 'middle') */
  vAlign?: 'top' | 'middle' | 'bottom';
  /** Font weight (default: 'normal') */
  fontWeight?: string;
  /** Font style (default: 'normal') */
  fontStyle?: string;
  /** Font variant (default: 'normal') */
  fontVariant?: string;
  /** Line height in pixels (default: fontSize * 1.2) */
  lineHeight?: number;
  /** Whether to justify text (default: false) */
  justify?: boolean;
  /** Text decoration (default: 'none') */
  textDecoration?: string;
}

/**
 * Options for the CanvasAscii renderer that creates ASCII art from text
 */
export interface CanvasAsciiOptions {
  /** The text to render as ASCII art */
  text: string;
  /** Font size for the ASCII characters (default: 8) */
  asciiFontSize: number;
  /** Font size for the source text (default: 200) */
  textFontSize: number;
  /** Color of the source text (default: '#fdf9f3') */
  textColor: string;
  /** Base height of the plane in the 3D scene (default: 8) */
  planeBaseHeight: number;
  /** Whether to enable wave animation effect (default: true) */
  enableWaves: boolean;
  /** Path to the font file (default: '/fonts/helvetiker_regular.typeface.json') */
  fontPath?: string;
}

/**
 * Props for the ASCII Text component
 */
export interface ASCIITextProps {
  /** The text to render as ASCII art (default: 'David!') */
  text?: string;
  /** Font size for the ASCII characters (default: 8) */
  asciiFontSize?: number;
  /** Font size for the source text (default: 200) */
  textFontSize?: number;
  /** Color of the source text (default: '#fdf9f3') */
  textColor?: string;
  /** Base height of the plane in the 3D scene (default: 8) */
  planeBaseHeight?: number;
  /** Whether to enable wave animation effect (default: true) */
  enableWaves?: boolean;
  /** Custom class name for the container */
  className?: string;
  /** Custom styles for the container */
  style?: React.CSSProperties;
  /** Aria label for accessibility */
  ariaLabel?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
}

/**
 * ASCII Text animation configuration
 */
export interface ASCIITextAnimationConfig {
  /** Wave animation amplitude */
  waveAmplitude?: number;
  /** Animation speed factor */
  speedFactor?: number;
  /** Color transition speed */
  colorTransitionSpeed?: number;
}
