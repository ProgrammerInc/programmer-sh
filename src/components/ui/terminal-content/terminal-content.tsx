import React, { useRef, useEffect, useState } from 'react';
import CommandLine from '../command-line';
import TerminalResponse from '../terminal-response';
import { HistoryItem } from '@/components/ui/terminal';
import { useToast } from '@/hooks/use-toast';
import AsciiArt from '../ascii-art/ascii-art';

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
  const { toast } = useToast();
  const [isSelecting, setIsSelecting] = useState(false);
  const [commandInput, setCommandInput] = useState('');

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Handle text selection and auto-copy to clipboard
  useEffect(() => {
    const handleMouseDown = () => {
      setIsSelecting(true);
    };

    const handleMouseUp = () => {
      if (isSelecting) {
        setIsSelecting(false);

        const selection = window.getSelection();
        if (selection && !selection.isCollapsed && selection.toString().trim() !== '') {
          // Only copy if there's actual text selected
          try {
            navigator.clipboard
              .writeText(selection.toString())
              .then(() => {
                console.log('Text copied to clipboard');
                toast({
                  title: 'Copied to clipboard',
                  description: 'The selected text has been copied to your clipboard.',
                  duration: 2000,
                });
              })
              .catch(err => {
                console.error('Failed to copy text: ', err);
                toast({
                  title: 'Copy failed',
                  description: 'Could not copy to clipboard. Please try again.',
                  variant: 'destructive',
                  duration: 2000,
                });
              });
          } catch (error) {
            console.error('Clipboard API not available: ', error);
            toast({
              title: 'Copy failed',
              description: 'Clipboard functionality is not available in your browser.',
              variant: 'destructive',
              duration: 2000,
            });
          }
        }
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, toast]);

  // Handle command link clicks
  const handleCommandClick = (commandText: string) => {
    // Check if command needs additional parameters
    const hasPlaceholders = commandText.includes('[') && commandText.includes(']');

    if (hasPlaceholders) {
      // Extract base command
      const baseCommand = commandText.split(' ')[0];
      setCommandInput(baseCommand + ' ');

      // Focus on input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      // Command doesn't need parameters, run it directly
      onCommandSubmit(commandText);
    }
  };

  return (
    <div
      ref={terminalRef}
      className="flex-1 p-4 overflow-y-auto terminal-scrollbar terminal-content-height"
    >
      {showAsciiArt && <AsciiArt />}

      {/* Command History */}
      {history.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-1">
            <span className="text-terminal-prompt font-mono mr-2">~$</span>
            <span className="text-terminal-foreground font-mono">{item.command}</span>
          </div>
          <TerminalResponse
            response={item.result}
            animate={false}
            onCommandClick={handleCommandClick}
          />
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
          initialValue={commandInput}
          onInputChange={setCommandInput}
        />
      )}
    </div>
  );
};

export default TerminalContent;
