import React from 'react';

interface TerminalFooterProps {
  commandInput: string;
  setCommandInput: (value: string) => void;
  handleCommandSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({
  commandInput,
  setCommandInput,
  handleCommandSubmit
}) => {
  return (
    <form onSubmit={handleCommandSubmit} className="px-4 py-2 border-t border-terminal-border">
      <div className="flex items-center">
        <span className="text-terminal-prompt mr-2">guest@programmer:~$</span>
        <input
          id="terminal-input"
          type="text"
          value={commandInput}
          onChange={e => setCommandInput(e.target.value)}
          className="flex-grow bg-transparent border-none outline-none text-terminal-command"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="Terminal command input"
          placeholder="Type a command..."
        />
      </div>
    </form>
  );
};

export default TerminalFooter;
