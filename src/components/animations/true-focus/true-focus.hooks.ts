/**
 * True Focus Animation Component Hooks
 */

import { MutableRefObject, useEffect, useState } from 'react';
import { FocusRect } from './true-focus.types';

/**
 * Hook to manage automatic focus cycling through words
 *
 * @param words - Array of words to cycle through
 * @param manualMode - Whether manual mode is enabled
 * @param animationDuration - Duration of the animation in seconds
 * @param pauseBetweenAnimations - Pause between animations in seconds
 * @returns Current index and state setters
 */
export const useAutomaticFocus = (
  words: string[],
  manualMode: boolean,
  animationDuration: number,
  pauseBetweenAnimations: number
) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  return { currentIndex, setCurrentIndex, lastActiveIndex, setLastActiveIndex };
};

/**
 * Hook to calculate the focus rectangle position and dimensions
 *
 * @param containerRef - Reference to the container element
 * @param wordRefs - References to the word elements
 * @param currentIndex - Currently focused word index
 * @param wordsCount - Total number of words
 * @returns Focus rectangle dimensions and position
 */
export const useFocusRect = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  wordRefs: MutableRefObject<(HTMLSpanElement | null)[]>,
  currentIndex: number,
  wordsCount: number
) => {
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, wordsCount, containerRef, wordRefs]);

  return focusRect;
};

/**
 * Hook to handle mouse interactions for manual mode
 *
 * @param manualMode - Whether manual mode is enabled
 * @returns Mouse event handlers
 */
export const useManualFocusHandlers = (
  manualMode: boolean,
  setCurrentIndex: (index: number) => void,
  setLastActiveIndex: (index: number | null) => void,
  lastActiveIndex: number | null
) => {
  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return { handleMouseEnter, handleMouseLeave };
};
