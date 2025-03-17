'use client';

import { animated } from '@react-spring/web';
import { FC, memo } from 'react';

import { DEFAULT_ANIMATION, INTERSECTION, TEXT_STYLE } from './split-text.constants';
import { useLetterAnimations, useProcessedText, useVisibilityObserver } from './split-text.hooks';
import styles from './split-text.module.css';
import { SplitTextProps } from './split-text.types';
import {
  calculateLetterIndex,
  createContainerStyles,
  createSpaceSpanStyles,
  createWordSpanStyles
} from './split-text.utils';

/**
 * SplitText component animates text by splitting it into individual characters
 * and applying animations to each letter when scrolled into view
 *
 * @param props Component properties including text content and animation options
 * @returns A memoized React component with animated split text effect
 */
const SplitTextComponent: FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = DEFAULT_ANIMATION.DELAY,
  animationFrom = DEFAULT_ANIMATION.FROM,
  animationTo = DEFAULT_ANIMATION.TO,
  easing = (t: number) => t,
  threshold = INTERSECTION.THRESHOLD,
  rootMargin = INTERSECTION.ROOT_MARGIN,
  textAlign = TEXT_STYLE.ALIGN,
  onLetterAnimationComplete
}) => {
  // Process text into words and letters
  const { words, letters } = useProcessedText(text);

  // Setup visibility observer
  const { ref, inView } = useVisibilityObserver(threshold, rootMargin);

  // Setup letter animations
  const springs = useLetterAnimations(
    letters,
    inView,
    animationFrom,
    animationTo,
    delay,
    easing,
    onLetterAnimationComplete
  );

  // Create memoized styles
  const containerStyle = createContainerStyles(textAlign);
  const wordSpanStyle = createWordSpanStyles();
  const spaceSpanStyle = createSpaceSpanStyles();

  return (
    <p ref={ref} className={`${styles['split-text-parent']} ${className}`} style={containerStyle}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={wordSpanStyle} className={styles['split-text-word']}>
          {word.map((letter, letterIndex) => {
            const index = calculateLetterIndex(words, wordIndex, letterIndex);

            return (
              <animated.span
                key={index}
                style={springs[index]}
                className={styles['split-text-letter']}
              >
                {letter}
              </animated.span>
            );
          })}
          <span style={spaceSpanStyle} className={styles['split-text-space']}>
            &nbsp;
          </span>
        </span>
      ))}
    </p>
  );
};

/**
 * Memoized SplitText component for optimal performance
 */
export const SplitText = memo(SplitTextComponent);

/**
 * Set display name for debugging purposes
 */
SplitText.displayName = 'SplitText';

export default SplitText;
