/**
 * Custom hooks for the DecryptedText component
 */

import { useCallback, useEffect, useState } from 'react';
import { RevealDirection } from './decrypted-text.types';

/**
 * Hook to determine the next character index to reveal based on direction
 *
 * @param textLength Length of the original text
 * @param revealDirection Direction of reveal animation
 * @returns Callback function that returns the next index to reveal
 */
export const useNextRevealIndex = (textLength: number, revealDirection: RevealDirection) => {
  return useCallback(
    (revealedSet: Set<number>): number => {
      switch (revealDirection) {
        case 'start':
          return revealedSet.size;
        case 'end':
          return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          // Fallback to find any unrevealed index
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    },
    [textLength, revealDirection]
  );
};

/**
 * Hook to generate scrambled text with some characters revealed
 *
 * @param originalText The original text
 * @param useOriginalCharsOnly Whether to use only characters from the original text
 * @param characters String of characters to use for scrambling
 * @returns Callback function that generates scrambled text
 */
export const useTextScrambler = (
  originalText: string,
  useOriginalCharsOnly: boolean,
  characters: string
) => {
  return useCallback(
    (currentRevealed: Set<number>): string => {
      const availableChars = useOriginalCharsOnly
        ? Array.from(new Set(originalText.split(''))).filter(char => char !== ' ')
        : characters.split('');

      if (useOriginalCharsOnly) {
        const positions = originalText.split('').map((char, i) => ({
          char,
          isSpace: char === ' ',
          index: i,
          isRevealed: currentRevealed.has(i)
        }));

        const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);

        // Shuffle non-space, unrevealed characters
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
        }

        let charIndex = 0;
        return positions
          .map(p => {
            if (p.isSpace) return ' ';
            if (p.isRevealed) return originalText[p.index];
            return nonSpaceChars[charIndex++];
          })
          .join('');
      } else {
        return originalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (currentRevealed.has(i)) return originalText[i];
            return availableChars[Math.floor(Math.random() * availableChars.length)];
          })
          .join('');
      }
    },
    [originalText, useOriginalCharsOnly, characters]
  );
};

/**
 * Hook to create hover event handlers
 *
 * @param animateTrigger Animation trigger type ('hover' or 'view')
 * @param setIsHovering Function to update hover state
 * @returns Object containing hover event handlers
 */
export const useHoverHandlers = (
  animateTrigger: 'hover' | 'view',
  setIsHovering: (isHovering: boolean) => void
) => {
  return useCallback(
    () =>
      animateTrigger === 'hover'
        ? {
            onMouseEnter: () => setIsHovering(true),
            onMouseLeave: () => setIsHovering(false)
          }
        : {},
    [animateTrigger, setIsHovering]
  );
};

/**
 * Hook to manage the decryption animation
 *
 * @param params Configuration parameters
 * @returns State and controls for the animation
 */
export const useDecryptionAnimation = ({
  text,
  speed,
  maxIterations,
  sequential,
  getNextIndex,
  shuffleText,
  animateOn
}: {
  text: string;
  speed: number;
  maxIterations: number;
  sequential: boolean;
  getNextIndex: (revealed: Set<number>) => number;
  shuffleText: (revealed: Set<number>) => string;
  animateOn: 'hover' | 'view';
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  // Main animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    let currentIteration = 0;

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices(prevRevealed => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(newRevealed));
              return newRevealed;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              return prevRevealed;
            }
          } else {
            setDisplayText(shuffleText(prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
            return prevRevealed;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, text, speed, maxIterations, sequential, getNextIndex, shuffleText]);

  return {
    displayText,
    isHovering,
    setIsHovering,
    isScrambling,
    revealedIndices,
    hasAnimated,
    setHasAnimated
  };
};
