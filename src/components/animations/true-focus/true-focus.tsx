'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ANIMATION_SETTINGS, CSS_CLASSES, DEFAULT_SETTINGS } from './true-focus.constants';
import { useAutomaticFocus, useFocusRect, useManualFocusHandlers } from './true-focus.hooks';
import styles from './true-focus.module.css';
import { TrueFocusProps } from './true-focus.types';

/**
 * True Focus component creates an interactive animation that focuses on words in a sentence
 *
 * The component displays a sentence and animates focus between words by blurring all words
 * except the currently focused one. A highlight frame moves to surround the focused word.
 *
 * @param props - Component properties
 * @returns A React component with interactive focus animation
 */
export const TrueFocusComponent = ({
  sentence = DEFAULT_SETTINGS.SENTENCE,
  manualMode = DEFAULT_SETTINGS.MANUAL_MODE,
  blurAmount = DEFAULT_SETTINGS.BLUR_AMOUNT,
  borderColor = DEFAULT_SETTINGS.BORDER_COLOR,
  glowColor = DEFAULT_SETTINGS.GLOW_COLOR,
  animationDuration = DEFAULT_SETTINGS.ANIMATION_DURATION,
  pauseBetweenAnimations = DEFAULT_SETTINGS.PAUSE_BETWEEN_ANIMATIONS,
  className,
  ...rest
}: TrueFocusProps) => {
  // Split the sentence into words
  const words = sentence.split(' ');

  // References to DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Manage automatic focus cycling
  const { currentIndex, setCurrentIndex, lastActiveIndex, setLastActiveIndex } = useAutomaticFocus(
    words,
    manualMode,
    animationDuration,
    pauseBetweenAnimations
  );

  // Calculate focus rectangle position and dimensions
  const focusRect = useFocusRect(containerRef, wordRefs, currentIndex, words.length);

  // Handle mouse interactions for manual mode
  const { handleMouseEnter, handleMouseLeave } = useManualFocusHandlers(
    manualMode,
    setCurrentIndex,
    setLastActiveIndex,
    lastActiveIndex
  );

  // Combine class names
  const containerClassName = [styles[CSS_CLASSES.CONTAINER], className].filter(Boolean).join(' ');

  return (
    <div className={containerClassName} ref={containerRef} {...rest}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => (wordRefs.current[index] = el)}
            className={styles[CSS_CLASSES.WORD]}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className={styles[CSS_CLASSES.HIGHLIGHT]}
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration,
          ...ANIMATION_SETTINGS.TRANSITION
        }}
        style={
          {
            '--border-color': borderColor,
            '--glow-color': glowColor
          } as React.CSSProperties
        }
      >
        <span
          className={`${styles[CSS_CLASSES.CORNER]} ${styles[CSS_CLASSES.CORNER_TOP_LEFT]}`}
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--glow-color))'
          }}
        />
        <span
          className={`${styles[CSS_CLASSES.CORNER]} ${styles[CSS_CLASSES.CORNER_TOP_RIGHT]}`}
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--glow-color))'
          }}
        />
        <span
          className={`${styles[CSS_CLASSES.CORNER]} ${styles[CSS_CLASSES.CORNER_BOTTOM_LEFT]}`}
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--glow-color))'
          }}
        />
        <span
          className={`${styles[CSS_CLASSES.CORNER]} ${styles[CSS_CLASSES.CORNER_BOTTOM_RIGHT]}`}
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--glow-color))'
          }}
        />
      </motion.div>
    </div>
  );
};

/**
 * True Focus component
 */
export const TrueFocus = TrueFocusComponent;

export default TrueFocus;
