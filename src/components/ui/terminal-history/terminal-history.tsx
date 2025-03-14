'use client';

import { getCommands } from '@/commands';
import { Command } from '@/commands/command.types';
import React, { useMemo } from 'react';
import TerminalResponse from '../terminal-response';

export interface HistoryItem {
  command: string;
  timestamp: Date;
  // No longer storing result - will re-execute commands as needed
}

export interface TerminalHistoryProps {
  history: HistoryItem[];
  onCommandClick?: (command: string) => void;
}

export const TerminalHistory: React.FC<TerminalHistoryProps> = ({ history, onCommandClick }) => {
  // Get all available commands
  const commands = useMemo(() => {
    try {
      return getCommands();
    } catch (error) {
      console.error('Error getting commands:', error);
      return {};
    }
  }, []);

  // Helper function to execute a command and get its result
  const executeCommand = (commandStr: string) => {
    try {
      // Handle empty commands
      if (!commandStr || commandStr.trim() === '') {
        return { content: '', isError: false };
      }

      const commandParts = commandStr.split(' ');
      const commandName = commandParts[0];
      const args = commandParts.slice(1).join(' ');

      // Special handling for clear command - don't actually clear when viewing history
      if (commandName.toLowerCase() === 'clear') {
        return {
          content: '<i>Terminal was cleared</i>',
          isError: false
        };
      }

      if (commandName in commands) {
        const command: Command = commands[commandName];
        return command.execute(args);
      }

      // Return error for unknown commands
      return {
        content: `Command not found: ${commandName}`,
        isError: true
      };
    } catch (error) {
      console.error('Error executing command:', error);
      return {
        content: `Error executing command: ${error instanceof Error ? error.message : String(error)}`,
        isError: true
      };
    }
  };

  return (
    <>
      {history.map((item, index) => {
        // Execute the command to get its result - handle potential errors gracefully
        const result = executeCommand(item.command);

        return (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-1">
              <span className="text-terminal-prompt font-mono mr-2">~$</span>
              <span className="text-terminal-foreground font-mono">{item.command}</span>
            </div>
            <TerminalResponse response={result} animate={false} onCommandClick={onCommandClick} />
          </div>
        );
      })}
    </>
  );
};

export default TerminalHistory;
