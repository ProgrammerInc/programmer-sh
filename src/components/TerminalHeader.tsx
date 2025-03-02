
import React from 'react';
import { Github, X } from 'lucide-react';

interface TerminalHeaderProps {
  lastCommand?: string;
  userEmail?: string | null;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ lastCommand = '', userEmail }) => {
  return (
    <div className="flex items-center justify-between bg-terminal-header p-2 border-b border-terminal-border">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-terminal-close window-control" />
        <div className="w-3 h-3 rounded-full bg-terminal-minimize window-control" />
        <div className="w-3 h-3 rounded-full bg-terminal-maximize window-control" />
      </div>
      
      <div className="flex-1 text-center text-terminal-title text-sm font-mono truncate px-4">
        {userEmail ? `${userEmail} @ programmer.sh` : 'programmer.sh'}
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
      </div>
    </div>
  );
};

export default TerminalHeader;
