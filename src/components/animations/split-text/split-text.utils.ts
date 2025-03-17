/**
 * Utility functions for the Split Text animation component
 */

import { TEXT_STYLE } from './split-text.constants';
import { ContainerStyles, ProcessedText, SpanStyles, TextAlignOption } from './split-text.types';

/**
 * Processes text into words and letters arrays
 *
 * @param text - The input text to process
 * @returns An object containing the processed words and flattened letters
 */
export const processText = (text: string): ProcessedText => {
  const wordsArray = text.split(' ').map(word => word.split(''));
  return {
    words: wordsArray,
    letters: wordsArray.flat()
  };
};

/**
 * Creates container styles based on the text alignment
 *
 * @param textAlign - The desired text alignment
 * @returns The container style object
 */
export const createContainerStyles = (textAlign: TextAlignOption): ContainerStyles => {
  return {
    textAlign,
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  };
};

/**
 * Creates word span styles
 *
 * @returns The word span style object
 */
export const createWordSpanStyles = (): SpanStyles => {
  return {
    display: 'inline-block',
    whiteSpace: 'nowrap'
  };
};

/**
 * Creates space span styles
 *
 * @returns The space span style object
 */
export const createSpaceSpanStyles = (): SpanStyles => {
  return {
    display: 'inline-block',
    width: TEXT_STYLE.SPACE_WIDTH
  };
};

/**
 * Calculates the letter index in the flattened array
 *
 * @param words - The array of word arrays
 * @param wordIndex - The current word index
 * @param letterIndex - The current letter index within the word
 * @returns The global letter index
 */
export const calculateLetterIndex = (
  words: string[][],
  wordIndex: number,
  letterIndex: number
): number => {
  return words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;
};
