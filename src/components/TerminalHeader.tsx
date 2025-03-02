
import React from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface TerminalHeaderProps {
  lastCommand: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isFullscreen?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ 
  lastCommand,
  onClose,
  onMinimize,
  onMaximize,
  isFullscreen = false
}) => {
  return (
    <div className="flex items-center p-2 bg-black/20 border-b border-white/10">
      <div className="flex space-x-2 mr-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="w-3 h-3 rounded-full bg-terminal-error relative group cursor-pointer"
                onClick={onClose}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="text-black w-2 h-2" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Close</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="w-3 h-3 rounded-full bg-terminal-warning relative group cursor-pointer"
                onClick={onMinimize}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Minus className="text-black w-2 h-2" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Minimize</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="w-3 h-3 rounded-full bg-terminal-success relative group cursor-pointer"
                onClick={onMaximize}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {isFullscreen ? (
                    <Minimize2 className="text-black w-2 h-2" />
                  ) : (
                    <Maximize2 className="text-black w-2 h-2" />
                  )}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">{isFullscreen ? 'Restore' : 'Maximize'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
