'use client';

import { motion } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';
import {
  DEFAULT_ANIMATE_ON,
  DEFAULT_CHARACTERS,
  DEFAULT_CLASS_NAME,
  DEFAULT_ENCRYPTED_CLASS_NAME,
  DEFAULT_INTERSECTION_THRESHOLD,
  DEFAULT_MAX_ITERATIONS,
  DEFAULT_PARENT_CLASS_NAME,
  DEFAULT_REVEAL_DIRECTION,
  DEFAULT_ROOT_MARGIN,
  DEFAULT_SEQUENTIAL,
  DEFAULT_SPEED,
  DEFAULT_USE_ORIGINAL_CHARS_ONLY
} from './decrypted-text.constants';
import {
  useDecryptionAnimation,
  useHoverHandlers,
  useNextRevealIndex,
  useTextScrambler
} from './decrypted-text.hooks';
import { DecryptedTextProps } from './decrypted-text.types';

/**
 * DecryptedText creates a text decryption animation effect
 * Text appears to be scrambled and gradually reveals itself
 * Can be triggered on hover or when element enters viewport
 *
 * @param props Component properties
 * @returns Animated text component with decryption effect
 */
export const DecryptedText = memo(function DecryptedText({
  text,
  speed = DEFAULT_SPEED,
  maxIterations = DEFAULT_MAX_ITERATIONS,
  sequential = DEFAULT_SEQUENTIAL,
  revealDirection = DEFAULT_REVEAL_DIRECTION,
  useOriginalCharsOnly = DEFAULT_USE_ORIGINAL_CHARS_ONLY,
  characters = DEFAULT_CHARACTERS,
  className = DEFAULT_CLASS_NAME,
  parentClassName = DEFAULT_PARENT_CLASS_NAME,
  encryptedClassName = DEFAULT_ENCRYPTED_CLASS_NAME,
  animateOn = DEFAULT_ANIMATE_ON,
  ...props
}: DecryptedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  // Hooks for animation logic
  const getNextIndex = useNextRevealIndex(text.length, revealDirection);
  const shuffleText = useTextScrambler(text, useOriginalCharsOnly, characters);

  const {
    displayText,
    isHovering,
    setIsHovering,
    isScrambling,
    revealedIndices,
    hasAnimated,
    setHasAnimated
  } = useDecryptionAnimation({
    text,
    speed,
    maxIterations,
    sequential,
    getNextIndex,
    shuffleText,
    animateOn
  });

  // Event handlers for hover interaction
  const hoverProps = useHoverHandlers(animateOn, setIsHovering);

  // Intersection observer for view-triggered animation
  useEffect(() => {
    if (animateOn !== 'view') return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: DEFAULT_ROOT_MARGIN,
      threshold: DEFAULT_INTERSECTION_THRESHOLD
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated, setIsHovering, setHasAnimated]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps()}
      {...props}
    >
      <span className="sr-only">{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;

          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
});

export default DecryptedText;
