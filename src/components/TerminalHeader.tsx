
import React from 'react';

interface TerminalHeaderProps {
  lastCommand: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ lastCommand }) => {
  return (
    <div className="flex items-center p-2 bg-black/20 border-b border-white/10">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-terminal-error" />
        <div className="w-3 h-3 rounded-full bg-terminal-warning" />
        <div className="w-3 h-3 rounded-full bg-terminal-success" />
      </div>
      <div className="text-terminal-foreground/70 text-sm font-mono flex-1 text-center">
        <span className="programmer-sh-title">&lt;programmer&gt;.</span>
        <span className="animate-cursor-blink">_</span>
        <span className="ml-2 mr-2">~</span>
        <span className="programmer-sh-page">{lastCommand}</span>
      </div>
      <div className="w-10"></div>
    </div>
  );
};

export default TerminalHeader;
