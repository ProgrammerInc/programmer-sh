
import React, { useEffect, useRef } from 'react';
import { TerminalHistory } from '../terminal-history';
import { CommandLine } from '../command-line';
import { HistoryItem } from '../terminal/Terminal';

// Use string[] for commandHistory type since CommandHistoryType isn't exported
interface TerminalContentProps {
  history: HistoryItem[];
  isInitializing: boolean;
  isProcessingAsync: boolean;
  showAsciiArt: boolean;
  commandHistory: string[];
  onCommandSubmit: (command: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  fullscreen?: boolean;
}

export const TerminalContent: React.FC<TerminalContentProps> = ({
  history,
  isInitializing,
  isProcessingAsync,
  showAsciiArt,
  commandHistory,
  onCommandSubmit,
  inputRef,
  fullscreen = false
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [history, isProcessingAsync]);

  return (
    <div className={`flex-1 p-4 overflow-y-auto terminal-content-height terminal-scrollbar ${fullscreen ? 'h-[calc(100vh-46px)]' : ''}`} ref={contentRef}>
      <TerminalHistory 
        history={history} 
        showAsciiArt={showAsciiArt} 
        isProcessingAsync={isProcessingAsync} 
      />
      
      {!isInitializing && (
        <CommandLine
          onSubmit={onCommandSubmit}
          disabled={isProcessingAsync}
          history={commandHistory}
          inputRef={inputRef}
        />
      )}
    </div>
  );
};
