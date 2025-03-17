/**
 * Utility functions for the Rotating Text animation component
 */
import { StaggerFrom, TextElement } from './rotating-text.types';

/**
 * Utility function to join class names, filtering out falsy values
 *
 * @param classes - Array of class names, some of which may be falsy
 * @returns Joined string of valid class names
 */
export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Splits text into individual Unicode grapheme clusters (visible characters)
 * Uses Intl.Segmenter when available with fallback for older browsers
 *
 * @param text - Text string to split into characters
 * @returns Array of individual characters
 */
export const splitIntoCharacters = (text: string): string[] => {
  // Check if Intl.Segmenter is available at runtime
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      // Use type-safe runtime check and double assertion pattern
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const segmenter = new (Intl as any).Segmenter('en', { granularity: 'grapheme' });
      return Array.from(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        segmenter.segment(text) as any,
        (segment: { segment: string }) => segment.segment
      );
    } catch (e) {
      // Fallback if Segmenter throws an error
      console.warn('Intl.Segmenter error, falling back to Array.from:', e);
      return Array.from(text);
    }
  }
  // Fallback for browsers that don't support Intl.Segmenter
  return Array.from(text);
};

/**
 * Splits text using the specified strategy
 *
 * @param text - Text to split
 * @param splitBy - Strategy for splitting ('characters', 'words', 'lines', or custom delimiter)
 * @returns Array of text elements with characters and spacing information
 */
export const splitText = (text: string, splitBy: string): TextElement[] => {
  if (splitBy === 'characters') {
    const words = text.split(' ');
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1
    }));
  }

  if (splitBy === 'words') {
    return text.split(' ').map((word, i, arr) => ({
      characters: [word],
      needsSpace: i !== arr.length - 1
    }));
  }

  if (splitBy === 'lines') {
    return text.split('\n').map((line, i, arr) => ({
      characters: [line],
      needsSpace: i !== arr.length - 1
    }));
  }

  // Custom delimiter
  return text.split(splitBy).map((part, i, arr) => ({
    characters: [part],
    needsSpace: i !== arr.length - 1
  }));
};

/**
 * Calculates stagger delay based on chosen strategy
 *
 * @param index - Current element index
 * @param totalElements - Total number of elements
 * @param staggerFrom - Origin point for the stagger effect
 * @param staggerDuration - Duration between each staggered element
 * @returns Calculated delay in milliseconds
 */
export const calculateStaggerDelay = (
  index: number,
  totalElements: number,
  staggerFrom: StaggerFrom,
  staggerDuration: number
): number => {
  if (staggerFrom === 'first') {
    return index * staggerDuration;
  }

  if (staggerFrom === 'last') {
    return (totalElements - 1 - index) * staggerDuration;
  }

  if (staggerFrom === 'center') {
    const center = Math.floor(totalElements / 2);
    return Math.abs(center - index) * staggerDuration;
  }

  if (staggerFrom === 'random') {
    const randomIndex = Math.floor(Math.random() * totalElements);
    return Math.abs(randomIndex - index) * staggerDuration;
  }

  // If staggerFrom is a number, use it as the origin index
  return Math.abs((staggerFrom as number) - index) * staggerDuration;
};

/**
 * Calculates the total character count from an array of text elements
 *
 * @param elements - Array of text elements
 * @returns Total character count
 */
export const getTotalCharCount = (elements: TextElement[]): number => {
  return elements.reduce((sum, element) => sum + element.characters.length, 0);
};

/**
 * Calculates the previous character count up to a specific element index
 *
 * @param elements - Array of text elements
 * @param currentIndex - Index to count up to
 * @returns Total character count before the current index
 */
export const getPreviousCharCount = (elements: TextElement[], currentIndex: number): number => {
  return elements
    .slice(0, currentIndex)
    .reduce((sum, element) => sum + element.characters.length, 0);
};
