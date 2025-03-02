
import React from 'react';
import TerminalResponse from '../terminal-response';
import { HistoryItem } from '../terminal/Terminal';

interface TerminalHistoryProps {
  history: HistoryItem[];
  showAsciiArt?: boolean;
  isProcessingAsync?: boolean;
}

const TerminalHistory: React.FC<TerminalHistoryProps> = ({ 
  history, 
  showAsciiArt = true,
  isProcessingAsync = false
}) => {
  return (
    <>
      {history.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-1">
            <span className="text-terminal-prompt font-mono mr-2">~$</span>
            <span className="text-terminal-foreground font-mono">{item.command}</span>
          </div>
          <TerminalResponse 
            response={item.result} 
            animate={false} 
          />
        </div>
      ))}
    </>
  );
};

export default TerminalHistory;
