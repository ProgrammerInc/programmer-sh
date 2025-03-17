/**
 * Utility functions for the Scroll Float animation component
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
 * Splits text content into individual characters with proper spacing
 * Converts spaces to non-breaking spaces to maintain layout
 *
 * @param children - React children to convert to character spans
 * @param charClassName - CSS class name to apply to each character
 * @returns Array of styled character spans
 */
export const splitTextIntoChars = (children: ReactNode, charClassName: string): JSX.Element[] => {
  const text = typeof children === 'string' ? children : '';

  return text.split('').map((char, index) => {
    return React.createElement(
      'span',
      { className: charClassName, key: index },
      char === ' ' ? '\u00A0' : char
    );
  });
};
