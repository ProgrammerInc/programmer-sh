import { CommandResult } from '@/lib/terminalCommands';
import React from 'react';
import TerminalResponse from '../terminal-response';

export interface HistoryItem {
  command: string;
  result: CommandResult;
  timestamp: Date;
}

export interface TerminalHistoryProps {
  history: HistoryItem[];
  onCommandClick?: (command: string) => void;
}

export const TerminalHistory: React.FC<TerminalHistoryProps> = ({ history, onCommandClick }) => {
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
            onCommandClick={onCommandClick}
          />
        </div>
      ))}
    </>
  );
};

export default TerminalHistory;
