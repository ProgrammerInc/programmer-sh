
import React from 'react';
import { WindowState } from '@/utils/windowControls';

interface TerminalHeaderProps {
  lastCommand: string;
  windowState: WindowState;
  onWindowControlClick: (action: WindowState) => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ 
  lastCommand, 
  windowState,
  onWindowControlClick 
}) => {
  // Handle window control button clicks
  const handleControlClick = (action: WindowState, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent terminal focus
    onWindowControlClick(action);
  };

  return (
    <div className="flex items-center p-2 bg-black/20 border-b border-white/10">
      <div className="flex space-x-2 mr-4">
        <div 
          className="w-3 h-3 rounded-full bg-terminal-error cursor-pointer hover:brightness-125 transition-all"
          onClick={(e) => handleControlClick('closed', e)}
          title="Close"
        />
        <div 
          className="w-3 h-3 rounded-full bg-terminal-warning cursor-pointer hover:brightness-125 transition-all"
          onClick={(e) => handleControlClick('minimized', e)}
          title="Minimize"
        />
        <div 
          className="w-3 h-3 rounded-full bg-terminal-success cursor-pointer hover:brightness-125 transition-all"
          onClick={(e) => handleControlClick('maximized', e)}
          title="Maximize"
        />
      </div>
      <div className="text-terminal-foreground/70 text-sm font-mono flex-1 text-center">
        <span className="programmer-sh-title">&lt;programmer&gt;.</span>
        <span className="animate-cursor-blink">_</span>
        <span className="ml-2 mr-2">~</span>
        <span className="programmer-sh-page">{lastCommand}</span>
      </div>
      <div className="w-10"></div> {/* Spacer for symmetry */}
    </div>
  );
};

export default TerminalHeader;
