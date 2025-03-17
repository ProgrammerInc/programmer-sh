'use client';

import { useRef } from 'react';
import { CSS_CLASSES, DEFAULT_SETTINGS } from './text-pressure.constants';
import { useCharacterAnimation, useFontSizing, useMouseTracking } from './text-pressure.hooks';
import styles from './text-pressure.module.css';
import { TextPressureProps } from './text-pressure.types';
import { generateFontFaceCSS, generateStrokeCSS } from './text-pressure.utils';

/**
 * Text Pressure component creates an interactive text animation with variable fonts
 *
 * The component renders text characters that dynamically change their font variation
 * settings based on mouse proximity, creating a pressure-sensitive effect.
 *
 * @param props - Component properties
 * @returns A React component with interactive text pressure animation
 */
export const TextPressureComponent = ({
  text = DEFAULT_SETTINGS.TEXT,
  fontFamily = DEFAULT_SETTINGS.FONT_FAMILY,
  fontUrl = DEFAULT_SETTINGS.FONT_URL,
  width = DEFAULT_SETTINGS.WIDTH_ENABLED,
  weight = DEFAULT_SETTINGS.WEIGHT_ENABLED,
  italic = DEFAULT_SETTINGS.ITALIC_ENABLED,
  alpha = DEFAULT_SETTINGS.ALPHA_ENABLED,
  flex = DEFAULT_SETTINGS.FLEX_ENABLED,
  stroke = DEFAULT_SETTINGS.STROKE_ENABLED,
  scale = DEFAULT_SETTINGS.SCALE_ENABLED,
  textColor = DEFAULT_SETTINGS.TEXT_COLOR,
  strokeColor = DEFAULT_SETTINGS.STROKE_COLOR,
  strokeWidth = DEFAULT_SETTINGS.STROKE_WIDTH,
  className = '',
  minFontSize = DEFAULT_SETTINGS.MIN_FONT_SIZE,
  ...rest
}: TextPressureProps) => {
  // References to DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text into characters
  const chars = text.split('');

  // Track mouse and cursor position
  const { mouseRef, cursorRef } = useMouseTracking();

  // Calculate and manage font sizing
  const { fontSize, scaleY, lineHeight } = useFontSizing(
    containerRef,
    titleRef,
    chars,
    scale,
    minFontSize
  );

  // Animate character variations based on mouse position
  useCharacterAnimation(titleRef, spansRef, mouseRef, cursorRef, {
    width,
    weight,
    italic,
    alpha,
    chars
  });

  // Combine class names for title element
  const titleClassName = [
    styles[CSS_CLASSES.TITLE],
    className,
    flex ? 'flex justify-between' : '',
    stroke ? 'stroke' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={styles[CSS_CLASSES.CONTAINER]} {...rest}>
      <style>
        {generateFontFaceCSS(fontFamily, fontUrl)}
        {stroke && generateStrokeCSS(textColor, strokeColor, strokeWidth)}
      </style>

      <h1
        ref={titleRef}
        className={titleClassName}
        style={{
          fontFamily,
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          fontWeight: 100,
          color: stroke ? undefined : textColor
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => (spansRef.current[i] = el)}
            data-char={char}
            className={styles[CSS_CLASSES.CHAR]}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

/**
 * Text Pressure component
 */
export const TextPressure = TextPressureComponent;

export default TextPressure;
