'use client';

import { motion } from 'framer-motion';
import { forwardRef, useRef } from 'react';
import { CSS_CLASSES, DEFAULT_SETTINGS } from './variable-proximity.constants';
import {
  useAnimationFrame,
  useMousePositionRef,
  useParsedFontSettings,
  useProximityEffect
} from './variable-proximity.hooks';
import styles from './variable-proximity.module.css';
import { VariableProximityProps } from './variable-proximity.types';

/**
 * Variable Proximity component creates an interactive text effect that responds to mouse proximity
 *
 * The component displays text with variable font settings that change based on the mouse distance
 * from each letter. This creates an interactive, fluid typography experience.
 *
 * @param props - Component properties
 * @returns A React component with interactive proximity effect
 */
export const VariableProximityComponent = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (props, ref) => {
    const {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = DEFAULT_SETTINGS.RADIUS,
      falloff = DEFAULT_SETTINGS.FALLOFF,
      className = '',
      onClick,
      style,
      ...restProps
    } = props;

    // References to each letter element
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // Track mouse position relative to container
    const mousePositionRef = useMousePositionRef(containerRef);

    // Parse font variation settings
    const parsedSettings = useParsedFontSettings(
      fromFontVariationSettings,
      toFontVariationSettings
    );

    // Setup proximity effect calculations
    const { interpolatedSettingsRef, updateLetterSettings } = useProximityEffect(
      containerRef,
      letterRefs,
      mousePositionRef,
      parsedSettings,
      radius,
      falloff,
      fromFontVariationSettings
    );

    // Update letter settings on each animation frame
    useAnimationFrame(updateLetterSettings);

    // Split text into words and letters for animation
    const words = label.split(' ');
    let letterIndex = 0;

    // Combine class names
    const containerClassName = [styles[CSS_CLASSES.CONTAINER], className].filter(Boolean).join(' ');

    return (
      <span
        ref={ref}
        onClick={onClick}
        style={{
          fontFamily: DEFAULT_SETTINGS.FONT_FAMILY,
          ...style
        }}
        className={containerClassName}
        {...restProps}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={styles[CSS_CLASSES.WORD]}>
            {word.split('').map(letter => {
              const currentLetterIndex = letterIndex++;
              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={el => {
                    letterRefs.current[currentLetterIndex] = el;
                  }}
                  className={styles[CSS_CLASSES.LETTER]}
                  style={{
                    fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className={styles[CSS_CLASSES.SPACE]}>&nbsp;</span>
            )}
          </span>
        ))}
        <span className={styles[CSS_CLASSES.SR_ONLY]}>{label}</span>
      </span>
    );
  }
);

VariableProximityComponent.displayName = 'VariableProximity';

/**
 * Variable Proximity component
 */
export const VariableProximity = VariableProximityComponent;

export default VariableProximity;
