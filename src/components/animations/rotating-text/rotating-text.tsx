/**
 * Rotating Text animation component
 */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, memo, useImperativeHandle, useRef } from 'react';

import {
  CSS_CLASSES,
  DEFAULT_ANIMATE,
  DEFAULT_ANIMATE_PRESENCE_INITIAL,
  DEFAULT_ANIMATE_PRESENCE_MODE,
  DEFAULT_AUTO,
  DEFAULT_EXIT,
  DEFAULT_INITIAL,
  DEFAULT_LOOP,
  DEFAULT_ROTATION_INTERVAL,
  DEFAULT_SPLIT_BY,
  DEFAULT_STAGGER_DURATION,
  DEFAULT_STAGGER_FROM,
  DEFAULT_TRANSITION
} from './rotating-text.constants';
import { useAutoRotation, useTextElements, useTextRotation } from './rotating-text.hooks';
import styles from './rotating-text.module.css';
import { RotatingTextProps, RotatingTextRef } from './rotating-text.types';
import {
  calculateStaggerDelay,
  cn,
  getPreviousCharCount,
  getTotalCharCount
} from './rotating-text.utils';

/**
 * RotatingText component that animates through a series of text strings
 * with configurable transitions, staggering, and splitting options
 *
 * @component
 * @example
 * ```tsx
 * <RotatingText
 *   texts={['Hello', 'World', 'React']}
 *   splitBy="characters"
 *   staggerDuration={0.1}
 * />
 * ```
 */
export const RotatingText = memo(
  forwardRef<RotatingTextRef, RotatingTextProps>(
    (
      {
        texts,
        transition = DEFAULT_TRANSITION,
        initial = DEFAULT_INITIAL,
        animate = DEFAULT_ANIMATE,
        exit = DEFAULT_EXIT,
        animatePresenceMode = DEFAULT_ANIMATE_PRESENCE_MODE,
        animatePresenceInitial = DEFAULT_ANIMATE_PRESENCE_INITIAL,
        rotationInterval = DEFAULT_ROTATION_INTERVAL,
        staggerDuration = DEFAULT_STAGGER_DURATION,
        staggerFrom = DEFAULT_STAGGER_FROM,
        loop = DEFAULT_LOOP,
        auto = DEFAULT_AUTO,
        splitBy = DEFAULT_SPLIT_BY,
        onNext,
        mainClassName,
        splitLevelClassName,
        elementLevelClassName,
        ...rest
      },
      ref
    ) => {
      // Use a separate ref for the DOM element
      const spanRef = useRef<HTMLSpanElement>(null);

      // Use custom hooks for state management
      const { currentTextIndex, next, previous, jumpTo, reset } = useTextRotation(
        texts,
        loop,
        onNext
      );

      // Process text into elements for animation
      const elements = useTextElements(texts[currentTextIndex], splitBy);

      // Setup auto rotation if enabled
      useAutoRotation(auto, rotationInterval, next);

      // Expose methods via ref
      useImperativeHandle(
        ref,
        () => ({
          next,
          previous,
          jumpTo,
          reset
        }),
        [next, previous, jumpTo, reset]
      );

      return (
        <motion.span
          className={cn(styles[CSS_CLASSES.MAIN], mainClassName)}
          layout
          transition={transition}
          {...rest}
          ref={spanRef}
        >
          <span className={styles[CSS_CLASSES.SR_ONLY]}>{texts[currentTextIndex]}</span>
          <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
            <motion.div
              key={currentTextIndex}
              className={cn(
                splitBy === 'lines'
                  ? styles[CSS_CLASSES.FLEX_COLUMN]
                  : styles[CSS_CLASSES.FLEX_WRAP]
              )}
              layout
              aria-hidden="true"
            >
              {elements.map((wordObj, wordIndex, array) => {
                const previousCharsCount = getPreviousCharCount(array, wordIndex);
                const totalCharCount = getTotalCharCount(array);

                return (
                  <span
                    key={wordIndex}
                    className={cn(styles[CSS_CLASSES.SPLIT_LEVEL], splitLevelClassName)}
                  >
                    {wordObj.characters.map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                          ...transition,
                          delay: calculateStaggerDelay(
                            previousCharsCount + charIndex,
                            totalCharCount,
                            staggerFrom,
                            staggerDuration
                          )
                        }}
                        className={cn(styles[CSS_CLASSES.ELEMENT_LEVEL], elementLevelClassName)}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wordObj.needsSpace && (
                      <span className={styles[CSS_CLASSES.WHITESPACE]}> </span>
                    )}
                  </span>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.span>
      );
    }
  )
);

RotatingText.displayName = 'RotatingText';
export default RotatingText;
