import { useEffect, useState } from 'react';

/**
 * Options for configuring the typing effect
 */
export interface TypeOptions {
  /** Typing speed in milliseconds per character */
  speed?: number;
  /** Delay before typing starts in milliseconds */
  delay?: number;
  /** Whether to show cursor after typing */
  cursor?: boolean;
}

/**
 * Return type for the typing effect hook
 */
export interface TypingEffectResult {
  /** Text to be displayed with the typing effect */
  displayText: string;
  /** Whether the text is currently being typed */
  isTyping: boolean;
  /** Whether the typing effect has finished */
  isDone: boolean;
}

/**
 * Hook that creates a typing effect for a single string of text
 * 
 * @param text - The text to be typed
 * @param options - Configuration options for the typing effect
 * @returns Object containing the display text, typing status, and completion status
 */
export function useTypingEffect(
  text: string,
  options: TypeOptions = {}
): TypingEffectResult {
  const { speed = 100, delay = 0, cursor = true } = options;
  const [displayText, setDisplayText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // Reset states when text changes
    setDisplayText('');
    setIndex(0);
    setIsTyping(false);
    setIsDone(false);

    // Guard against undefined or null text
    if (text === undefined || text === null) {
      console.warn('useTypingEffect received undefined or null text');
      setIsDone(true);
      return;
    }

    // Initial delay before typing starts
    const timeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [text, delay]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    // Guard against undefined or null text
    if (!text) {
      return;
    }

    if (isTyping && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, speed);
    } else if (isTyping && index >= text.length) {
      setIsTyping(false);
      setIsDone(true);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isTyping, index, text, speed]);

  return {
    displayText: cursor && isDone ? `${displayText}` : displayText,
    isTyping,
    isDone
  };
}

/**
 * Options for multi-line typing effect
 */
export interface MultiLineTypeOptions extends TypeOptions {
  /** Delay between lines in milliseconds */
  lineDelay?: number;
}

/**
 * Return type for the multi-line typing effect hook
 */
export interface MultiLineTypingEffectResult {
  /** Array of completed typed lines */
  displayLines: string[];
  /** Text of the current line being typed */
  currentLineText: string;
  /** Whether any line is currently being typed */
  isTyping: boolean;
  /** Whether all lines have been typed */
  isDone: boolean;
}

/**
 * Hook that creates a typing effect for multiple lines of text
 * 
 * @param lines - Array of text lines to be typed sequentially
 * @param options - Configuration options for the typing effect
 * @returns Object containing the display lines, current line text, typing status, and completion status
 */
export function useMultiLineTypingEffect(
  lines: string[],
  options: MultiLineTypeOptions = {}
): MultiLineTypingEffectResult {
  const { lineDelay = 250, ...typeOptions } = options;
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);

  // Guard against empty lines array
  const linesArray = Array.isArray(lines) ? lines : [];
  const currentLine = linesArray[currentLineIndex] || '';

  const {
    displayText,
    isTyping,
    isDone: isLineDone
  } = useTypingEffect(currentLine, {
    ...typeOptions,
    delay: currentLineIndex === 0 ? typeOptions.delay || 0 : lineDelay
  });

  useEffect(() => {
    if (isLineDone) {
      // Add the completed line to displayLines
      setDisplayLines(prev => [...prev, displayText]);

      // Move to the next line if there is one
      if (currentLineIndex < linesArray.length - 1) {
        const nextLineTimeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, lineDelay);

        return () => {
          if (nextLineTimeout) {
            clearTimeout(nextLineTimeout);
          }
        };
      } else {
        setIsDone(true);
      }
    }
  }, [isLineDone, displayText, currentLineIndex, linesArray.length, lineDelay]);

  return {
    displayLines,
    currentLineText: !isLineDone ? displayText : '',
    isTyping,
    isDone
  };
}

export default useMultiLineTypingEffect;
