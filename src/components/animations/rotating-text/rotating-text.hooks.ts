/**
 * Custom hooks for the Rotating Text animation component
 */
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  DEFAULT_LOOP,
  DEFAULT_ROTATION_INTERVAL,
  DEFAULT_SPLIT_BY
} from './rotating-text.constants';
import { SplitBy, TextElement } from './rotating-text.types';
import { splitText } from './rotating-text.utils';

/**
 * Hook for managing the current text index in rotation
 *
 * @param texts - Array of text strings to rotate through
 * @param loop - Whether to loop back to start when reaching the end
 * @param onNext - Optional callback when text changes
 * @returns Functions and state for controlling text rotation
 */
export const useTextRotation = (
  texts: string[],
  loop: boolean = DEFAULT_LOOP,
  onNext?: (index: number) => void
) => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  // Handle index change with optional callback
  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  // Advance to the next text
  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  // Go to the previous text
  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  // Jump to a specific text index
  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  // Reset to the first text
  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  return {
    currentTextIndex,
    next,
    previous,
    jumpTo,
    reset
  };
};

/**
 * Hook for auto-rotating text at specified intervals
 *
 * @param auto - Whether auto-rotation is enabled
 * @param rotationInterval - Interval between rotations in milliseconds
 * @param nextFn - Function to call on each interval
 */
export const useAutoRotation = (
  auto: boolean,
  rotationInterval: number = DEFAULT_ROTATION_INTERVAL,
  nextFn: () => void
) => {
  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(nextFn, rotationInterval);
    return () => clearInterval(intervalId);
  }, [nextFn, rotationInterval, auto]);
};

/**
 * Hook for processing text into elements based on splitting strategy
 *
 * @param text - Current text to process
 * @param splitBy - Strategy for splitting text
 * @returns Array of processed text elements
 */
export const useTextElements = (
  text: string,
  splitBy: SplitBy = DEFAULT_SPLIT_BY
): TextElement[] => {
  return useMemo(() => splitText(text, splitBy), [text, splitBy]);
};
