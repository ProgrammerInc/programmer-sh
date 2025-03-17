/**
 * Utility functions for the Scroll Reveal animation component
 */
import React, { ReactNode } from 'react';

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
 * Splits text content into words while preserving spaces
 * Returns an array of word spans and whitespace strings
 *
 * @param children - React children to split into words
 * @param wordClassName - CSS class name to apply to each word
 * @returns Array of word spans and whitespace strings
 */
export const splitTextIntoWords = (
  children: ReactNode,
  wordClassName: string
): (JSX.Element | string)[] => {
  const text = typeof children === 'string' ? children : '';

  return text.split(/(\s+)/).map((word, index) => {
    // Return spaces as-is to maintain layout
    if (word.match(/^\s+$/)) return word;

    // Create a span for actual words
    return React.createElement('span', { className: wordClassName, key: index }, word);
  });
};
