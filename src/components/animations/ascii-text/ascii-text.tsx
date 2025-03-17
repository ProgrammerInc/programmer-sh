'use client';

import { memo, useMemo } from 'react';
import { DEFAULT_ASCII_TEXT_CONFIG } from './ascii-text.constants';
import { useAsciiTextAnimation } from './ascii-text.hooks';
import styles from './ascii-text.module.css';
import { ASCIITextProps } from './ascii-text.types';

/**
 * React component that renders ASCII art from text with 3D effects
 *
 * This component creates a Three.js scene with a text mesh that is rendered as ASCII characters.
 * The text can be animated with wave effects and responds to mouse movements.
 *
 * @example
 * ```tsx
 * // Basic usage with default values
 * <ASCIIText />
 *
 * // Custom text with wave animation enabled
 * <ASCIIText
 *   text="Hello World"
 *   asciiFontSize={10}
 *   enableWaves={true}
 * />
 *
 * // Customized appearance
 * <ASCIIText
 *   text="Custom Text"
 *   asciiFontSize={12}
 *   textFontSize={250}
 *   textColor="#ff0000"
 *   planeBaseHeight={10}
 *   enableWaves={false}
 * />
 * ```
 */
export const ASCIIText = memo(function ASCIIText({
  text = DEFAULT_ASCII_TEXT_CONFIG.text,
  asciiFontSize = DEFAULT_ASCII_TEXT_CONFIG.asciiFontSize,
  textFontSize = DEFAULT_ASCII_TEXT_CONFIG.textFontSize,
  textColor = DEFAULT_ASCII_TEXT_CONFIG.textColor,
  planeBaseHeight = DEFAULT_ASCII_TEXT_CONFIG.planeBaseHeight,
  enableWaves = DEFAULT_ASCII_TEXT_CONFIG.enableWaves,
  className,
  style,
  ariaLabel,
  tabIndex
}: ASCIITextProps) {
  // Use our custom hook to manage the ASCII text animation
  const { containerRef, containerStyle } = useAsciiTextAnimation({
    text,
    asciiFontSize,
    textFontSize,
    textColor,
    planeBaseHeight,
    enableWaves
  });

  // Combine the provided style with the base container style
  const combinedStyle = useMemo(
    () => ({
      ...containerStyle,
      ...style
    }),
    [containerStyle, style]
  );

  return (
    <div
      ref={containerRef}
      className={`${styles['ascii-text']} ${className || ''}`}
      style={combinedStyle}
      aria-label={ariaLabel || `ASCII text animation of the text: ${text}`}
      role="img"
      tabIndex={tabIndex || 0}
    />
  );
});

// Add display name for better debugging
ASCIIText.displayName = 'ASCIIText';

export default ASCIIText;
