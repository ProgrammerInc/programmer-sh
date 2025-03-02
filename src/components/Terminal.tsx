
import React, { useState, useEffect, useRef } from 'react';
import CommandLine from './CommandLine';
import TerminalResponse from './TerminalResponse';
import { processCommand, CommandResult } from '../utils/terminalCommands';
import { cn } from '@/lib/utils';

interface TerminalProps {
  className?: string;
  initialCommands?: string[];
}

interface HistoryItem {
  command: string;
  result: CommandResult;
  timestamp: Date;
}

const Terminal: React.FC<TerminalProps> = ({ className, initialCommands = ['welcome'] }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initialCommandsProcessed, setInitialCommandsProcessed] = useState(false);
  const [isProcessingAsync, setIsProcessingAsync] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Updated ASCII art for better readability of "Programmer.SH"
  const asciiArt = [
    '  ____                                                          ____  _   _   ',
    ' |  _ \\ _ __ ___   __ _ _ __ __ _ _ __ ___  ___ _ __   ___ _ __/ ___|| | | | ',
    " | |_) | '__/ _ \\ / _` | '__/ _` | '_ ` _ \\| '_ ` _ \\ / _ \\ '__\\___ \\| |_| | ",
    ' |  __/| | | (_) | (_| | | | (_| | | | | | | | | | | |  __/ |_  ___) |  _  | ',
    ' |_|   |_|  \\___/ \\__, |_|  \\__,_|_| |_| |_|_| |_| |_|\\___|_(_)|____/|_| |_| ',
    '                  |___/                                                     ',
  ];

  // Show ASCII art immediately without any delay
  const [showAsciiArt, setShowAsciiArt] = useState(true);
  const [asciiArtDone, setAsciiArtDone] = useState(true);

  // Process initial commands immediately
  useEffect(() => {
    if (isInitializing && !initialCommandsProcessed) {
      // Initialize command processing immediately
      setInitialCommandsProcessed(true);
      
      // Process each initial command with a small delay between them
      let i = 0;
      const processNextCommand = () => {
        if (i < initialCommands.length) {
          const command = initialCommands[i++];
          processCommandWithHistory(command);
          
          // Process next command with a small delay
          setTimeout(processNextCommand, 200);
        } else {
          setIsInitializing(false);
        }
      };
      
      // Start processing commands immediately
      processNextCommand();
    }
  }, [initialCommands, isInitializing, initialCommandsProcessed]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommandWithHistory = async (commandString: string) => {
    const result = processCommand(commandString);

    if (result.content === 'CLEAR_TERMINAL') {
      setHistory([]);
      return;
    }

    // Add the command and initial result to history
    const historyItem = {
      command: commandString,
      result,
      timestamp: new Date(),
    };

    setHistory(prev => [...prev, historyItem]);

    // Process async commands
    if (result.isAsync && result.asyncResolver) {
      setIsProcessingAsync(true);
      try {
        const asyncResult = await result.asyncResolver();
        
        // Update the history item with the async result
        setHistory(prev => 
          prev.map(item => 
            item === historyItem ? { ...item, result: asyncResult } : item
          )
        );
      } catch (error) {
        console.error("Error processing async command:", error);
        
        // Update history with error
        setHistory(prev => 
          prev.map(item => 
            item === historyItem ? 
            { 
              ...item, 
              result: {
                content: `Error: ${error instanceof Error ? error.message : String(error)}`,
                isError: true
              } 
            } : item
          )
        );
      } finally {
        setIsProcessingAsync(false);
      }
    }
  };

  // Handle click anywhere in the terminal
  const handleTerminalClick = () => {
    if (!isInitializing && commandInputRef.current) {
      commandInputRef.current.focus();
    }
  };

  return (
    <div
      className={cn('terminal-glass rounded-md overflow-hidden flex flex-col h-full', className)}
    >
      {/* Terminal Header */}
      <div className="flex items-center p-2 bg-black/20 border-b border-white/10">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-terminal-error" />
          <div className="w-3 h-3 rounded-full bg-terminal-warning" />
          <div className="w-3 h-3 rounded-full bg-terminal-success" />
        </div>
        <div className="text-terminal-foreground/70 text-sm font-mono flex-1 text-center">
          <span>&lt;programmer&gt;.</span>
          <span className="animate-cursor-blink">_</span>
          <span className="ml-1">~ portfolio</span>
        </div>
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto terminal-scrollbar terminal-content-height"
        onClick={handleTerminalClick}
      >
        {/* ASCII Art without animation */}
        <div className="mb-6 text-terminal-prompt font-mono text-xs md:text-sm">
          {showAsciiArt &&
            asciiArt.map((line, i) => (
              <div key={i} className="whitespace-pre">
                {line}
              </div>
            ))}
        </div>

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

        {/* Current Command Line */}
        {!isInitializing && (
          <CommandLine 
            onSubmit={processCommandWithHistory} 
            autoFocus 
            inputRef={commandInputRef}
            disabled={isProcessingAsync} 
          />
        )}
      </div>
    </div>
  );
};

export default Terminal;
