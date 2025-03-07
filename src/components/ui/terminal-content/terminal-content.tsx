import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface TerminalContentProps {
  commandOutput: string;
  setScrollToBottom: () => void;
}

export const TerminalContent = forwardRef<HTMLDivElement, TerminalContentProps>((
  { commandOutput, setScrollToBottom },
  ref
) => {
  // Local ref for event handlers
  const innerRef = useRef<HTMLDivElement>(null);
  
  // Connect the forwarded ref to our inner ref
  useImperativeHandle(ref, () => innerRef.current!);
  
  // Call setScrollToBottom when output changes
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

    const currentTerminalContent = innerRef.current;

    if (currentTerminalContent) {
      currentTerminalContent.addEventListener('click', handleCommandLinkClick);
    }

    return () => {
      if (currentTerminalContent) {
        currentTerminalContent.removeEventListener('click', handleCommandLinkClick);
      }
    };
  }, []);

  return (
    <div
      ref={innerRef}
      className="flex-grow overflow-y-scroll terminal-content-height terminal-scrollbar px-4 py-2 font-mono text-sm bg-terminal-background"
      dangerouslySetInnerHTML={{ __html: commandOutput }}
    />
  );
});

export default TerminalContent;
