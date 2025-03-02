import { useState, useEffect, useCallback } from 'react';

export interface TypeOptions {
  speed?: number; // typing speed in milliseconds per character
  delay?: number; // delay before typing starts
  cursor?: boolean; // show cursor after typing
}

export function useTypingEffect(
  text: string,
  options: TypeOptions = {}
): { displayText: string; isTyping: boolean; isDone: boolean } {
  const { speed = 40, delay = 0, cursor = true } = options;
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Reset states when text changes
    setDisplayText('');
    setIndex(0);
    setIsTyping(false);
    setIsDone(false);

    // Initial delay before typing starts
    const timeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, speed);
    } else if (isTyping && index >= text.length) {
      setIsTyping(false);
      setIsDone(true);
    }

    return () => clearTimeout(timeout);
  }, [isTyping, index, text, speed]);

  return {
    displayText: cursor && isDone ? `${displayText}` : displayText,
    isTyping,
    isDone,
  };
}

export function useMultiLineTypingEffect(
  lines: string[],
  options: TypeOptions & { lineDelay?: number } = {}
) {
  const { lineDelay = 500, ...typeOptions } = options;
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const currentLine = lines[currentLineIndex] || '';

  const {
    displayText,
    isTyping,
    isDone: isLineDone,
  } = useTypingEffect(currentLine, {
    ...typeOptions,
    delay: currentLineIndex === 0 ? typeOptions.delay : lineDelay,
  });

  useEffect(() => {
    if (isLineDone) {
      // Add the completed line to displayLines
      setDisplayLines(prev => [...prev, displayText]);

      // Move to the next line if there is one
      if (currentLineIndex < lines.length - 1) {
        const nextLineTimeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, lineDelay);

        return () => clearTimeout(nextLineTimeout);
      } else {
        setIsDone(true);
      }
    }
  }, [isLineDone, displayText, currentLineIndex, lines.length, lineDelay]);

  return {
    displayLines,
    currentLineText: !isLineDone ? displayText : '',
    isTyping,
    isDone,
  };
}
