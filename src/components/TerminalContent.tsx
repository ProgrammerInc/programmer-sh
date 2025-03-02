import React, { useRef, useEffect } from 'react';
import CommandLine from './CommandLine';
import TerminalResponse from './TerminalResponse';
import { HistoryItem } from '@/components/Terminal';

// Updated ASCII art for better readability of "Programmer.SH"
const asciiArt = [
  '  ____                                                          ____  _   _   ',
  ' |  _ \\ _ __ ___   __ _ _ __ __ _ _ __ ___  ___ _ __   ___ _ __/ ___|| | | | ',
  " | |_) | '__/ _ \\ / _` | '__/ _` | '_ ` _ \\| '_ ` _ \\ / _ \\ '__\\___ \\| |_| | ",
  ' |  __/| | | (_) | (_| | | | (_| | | | | | | | | | | |  __/ |_  ___) |  _  | ',
  ' |_|   |_|  \\___/ \\__,_|_|  \\__,_|_| |_| |_|_| |_| |_|\\___|_(_)|____/|_| |_| ',
  '                  |___/                                                     ',
];

interface TerminalContentProps {
  history: HistoryItem[];
  isInitializing: boolean;
  isProcessingAsync: boolean;
  showAsciiArt: boolean;
  commandHistory: string[];
  onCommandSubmit: (command: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TerminalContent: React.FC<TerminalContentProps> = ({
  history,
  isInitializing,
  isProcessingAsync,
  showAsciiArt,
  commandHistory,
  onCommandSubmit,
  inputRef,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={terminalRef}
      className="flex-1 p-4 overflow-y-auto terminal-scrollbar terminal-content-height"
    >
      {/* ASCII Art without animation */}
      {showAsciiArt && (
        <div className="mb-6 text-terminal-prompt font-mono text-xs md:text-sm">
          {asciiArt.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line}
            </div>
          ))}
        </div>
      )}

      {/* Command History */}
      {history.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-1">
            <span className="text-terminal-prompt font-mono mr-2">~$</span>
            <span className="text-terminal-foreground font-mono">{item.command}</span>
          </div>
          <TerminalResponse response={item.result} animate={false} />
        </div>
      ))}

      {/* Processing indicator */}
      {isProcessingAsync && (
        <div className="text-terminal-warning font-mono text-sm mt-2 mb-2">
          Processing command... <span className="animate-pulse">▌</span>
        </div>
      )}

      {/* Current Command Line */}
      {!isInitializing && (
        <CommandLine
          onSubmit={onCommandSubmit}
          autoFocus
          inputRef={inputRef}
          disabled={isProcessingAsync}
          history={commandHistory}
        />
      )}
    </div>
  );
};

export default TerminalContent;
