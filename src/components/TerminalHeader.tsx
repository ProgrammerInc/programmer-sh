
import React from 'react';
import { Github, Linkedin, Twitter, X, Minus, Square } from 'lucide-react';

interface TerminalHeaderProps {
  lastCommand?: string;
  userEmail?: string | null;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ lastCommand = '', userEmail }) => {
  return (
    <div className="flex items-center justify-between bg-terminal-header p-2 border-b border-terminal-border">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-terminal-close window-control group flex items-center justify-center">
          <X className="w-2 h-2 text-terminal-background opacity-0 group-hover:opacity-100" strokeWidth={3} />
        </div>
        <div className="w-3 h-3 rounded-full bg-terminal-minimize window-control group flex items-center justify-center">
          <Minus className="w-2 h-2 text-terminal-background opacity-0 group-hover:opacity-100" strokeWidth={3} />
        </div>
        <div className="w-3 h-3 rounded-full bg-terminal-maximize window-control group flex items-center justify-center">
          <Square className="w-2 h-2 text-terminal-background opacity-0 group-hover:opacity-100" strokeWidth={3} />
        </div>
      </div>
      
      <div className="flex-1 text-center text-terminal-title text-sm font-mono truncate px-4">
        <span>&lt;programmer&gt;.<span className="animate-cursor-blink">_</span></span>
        {lastCommand && <span className="text-terminal-muted ml-2">~ {lastCommand}</span>}
      </div>
      
      <div className="flex space-x-2">
        <a
          href="https://github.com/ProgrammerInc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-title hover:text-terminal-foreground transition-colors"
          aria-label="GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://linkedin.com/in/ProgrammerInc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-title hover:text-terminal-foreground transition-colors"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="https://x.com/ProgrammerInc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-title hover:text-terminal-foreground transition-colors"
          aria-label="X/Twitter Profile"
        >
          <Twitter className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default TerminalHeader;
