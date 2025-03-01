import React, { useState, useEffect, useRef } from 'react';
import CommandLine from './CommandLine';
import TerminalResponse from './TerminalResponse';
import { processCommand, CommandResult } from '../utils/terminalCommands';
import { cn } from '@/lib/utils';
import { useMultiLineTypingEffect } from '@/utils/typingEffect';

interface TerminalProps {
  className?: string;
  initialCommands?: string[];
}

interface HistoryItem {
  command: string;
  result: CommandResult;
  timestamp: Date;
}

const Terminal: React.FC<TerminalProps> = ({
  className,
  initialCommands = ['welcome']
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const asciiArt = [
    " _____                                                         _____ _    _ ",
    "|  __ \\                                                       / ____| |  | |",
    "| |__) | __ ___   __ _ _ __ __ _ _ __ ___  _ __ ___   ___ _ _| (___ | |__| |",
    "|  ___/ '__/ _ \\ / _` | '__/ _` | '_ ` _ \\| '_ ` _ \\ / _ \\ '__\\___ \\|  __  |",
    "| |   | | | (_) | (_| | | | (_| | | | | | | | | | | |  __/ |  ____) | |  | |",
    "|_|   |_|  \\___/ \\__, |_|  \\__,_|_| |_| |_|_| |_| |_|\\___|_| |_____/|_|  |_|",
    "                  __/ |                                                      ",
    "                 |___/                                                       ",
  ];
  
  const { displayLines, currentLineText, isDone } = useMultiLineTypingEffect(asciiArt, {
    speed: 5,
    delay: 300,
    lineDelay: 50,
  });
  
  // Process initial commands
  useEffect(() => {
    if (isInitializing && isDone) {
      let timeout: NodeJS.Timeout;
      
      const processInitialCommands = async () => {
        // Wait a bit after ASCII art is done
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Process each initial command with a delay
        for (const cmd of initialCommands) {
          await new Promise(resolve => {
            timeout = setTimeout(() => {
              processCommandWithHistory(cmd);
              resolve(null);
            }, 300);
          });
        }
        
        setIsInitializing(false);
      };
      
      processInitialCommands();
      
      return () => clearTimeout(timeout);
    }
  }, [initialCommands, isInitializing, isDone]);
  
  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, currentLineText, displayLines]);

  const processCommandWithHistory = (commandString: string) => {
    const result = processCommand(commandString);
    
    if (result.content === 'CLEAR_TERMINAL') {
      setHistory([]);
      return;
    }
    
    setHistory(prev => [
      ...prev,
      {
        command: commandString,
        result,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className={cn('terminal-glass rounded-md overflow-hidden flex flex-col h-full', className)}>
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
          <span>~ portfolio</span>
        </div>
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </div>
      
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto terminal-scrollbar"
        style={{ maxHeight: 'calc(100% - 46px)' }}
      >
        {/* ASCII Art Animation */}
        <div className="mb-6 text-terminal-prompt font-mono text-xs md:text-sm">
          {displayLines.map((line, i) => (
            <div key={i} className="whitespace-pre">{line}</div>
          ))}
          {currentLineText && <div className="whitespace-pre">{currentLineText}</div>}
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
          />
        )}
      </div>
    </div>
  );
};

export default Terminal;
