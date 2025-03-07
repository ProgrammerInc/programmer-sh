
import React, { useRef, useEffect } from 'react';

interface TerminalContentProps {
  commandOutput: string;
  setScrollToBottom: () => void;
}

export const TerminalContent: React.FC<TerminalContentProps> = ({ 
  commandOutput, 
  setScrollToBottom 
}) => {
  const terminalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollToBottom();
  }, [commandOutput, setScrollToBottom]);

  useEffect(() => {
    const handleCommandLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.classList.contains('command-link')) {
        e.preventDefault();
        const command = target.getAttribute('data-command');
        
        if (command) {
          const event = new CustomEvent('executeCommandFromLink', { 
            detail: { command } 
          });
          document.dispatchEvent(event);
        }
      }
    };

    terminalContentRef.current?.addEventListener('click', handleCommandLinkClick);

    return () => {
      terminalContentRef.current?.removeEventListener('click', handleCommandLinkClick);
    };
  }, []);

  return (
    <div
      ref={terminalContentRef}
      className="flex-grow overflow-y-scroll terminal-content-height terminal-scrollbar px-4 py-2 font-mono text-sm bg-terminal-background"
      dangerouslySetInnerHTML={{ __html: commandOutput }}
    />
  );
};

export default TerminalContent;
