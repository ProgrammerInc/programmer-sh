
import React, { useRef, useEffect, useState } from 'react';
import CommandLine from '../command-line';
import TerminalResponse from '../terminal-response';
import { HistoryItem } from '@/components/ui/terminal';
import { useToast } from '@/hooks/use-toast';
import AsciiArt from '../ascii-art/ascii-art';
import TerminalHistory from '../terminal-history';
import { QRCodeSVG } from 'qrcode.react';

interface TerminalContentProps {
  history: HistoryItem[];
  isInitializing: boolean;
  isProcessingAsync: boolean;
  showAsciiArt: boolean;
  commandHistory: string[];
  onCommandSubmit: (command: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TerminalContent: React.FC<TerminalContentProps> = ({
  history,
  isInitializing,
  isProcessingAsync,
  showAsciiArt,
  commandHistory,
  onCommandSubmit,
  inputRef,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isSelecting, setIsSelecting] = useState(false);
  const [commandInput, setCommandInput] = useState('');

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Handle text selection and auto-copy to clipboard
  useEffect(() => {
    const handleMouseDown = () => {
      setIsSelecting(true);
    };

    const handleMouseUp = () => {
      if (isSelecting) {
        setIsSelecting(false);

        const selection = window.getSelection();
        if (selection && !selection.isCollapsed && selection.toString().trim() !== '') {
          // Only copy if there's actual text selected
          try {
            navigator.clipboard
              .writeText(selection.toString())
              .then(() => {
                console.log('Text copied to clipboard');
                toast({
                  title: 'Copied to clipboard',
                  description: 'The selected text has been copied to your clipboard.',
                  duration: 2000,
                });
              })
              .catch(err => {
                console.error('Failed to copy text: ', err);
                toast({
                  title: 'Copy failed',
                  description: 'Could not copy to clipboard. Please try again.',
                  variant: 'destructive',
                  duration: 2000,
                });
              });
          } catch (error) {
            console.error('Clipboard API not available: ', error);
            toast({
              title: 'Copy failed',
              description: 'Clipboard functionality is not available in your browser.',
              variant: 'destructive',
              duration: 2000,
            });
          }
        }
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, toast]);

  // Handle command link clicks
  const handleCommandClick = (commandText: string) => {
    // Check if command needs additional parameters
    const hasPlaceholders = commandText.includes('[') && commandText.includes(']');

    if (hasPlaceholders) {
      // Extract base command
      const baseCommand = commandText.split(' ')[0];
      setCommandInput(baseCommand + ' ');

      // Focus on input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      // Command doesn't need parameters, run it directly
      onCommandSubmit(commandText);
    }
  };

  // Add custom components for special content
  useEffect(() => {
    // Replace QRCode placeholder with actual QR code component
    const qrContainers = document.querySelectorAll('#qrcode-container');
    qrContainers.forEach(container => {
      const qrElement = container.querySelector('QRCode');
      if (qrElement) {
        const value = qrElement.getAttribute('value') || '';
        const title = qrElement.getAttribute('title') || 'Scan this QR code';
        
        // Create container div
        const qrCodeDiv = document.createElement('div');
        qrCodeDiv.className = 'flex flex-col items-center my-4';
        container.innerHTML = '';
        container.appendChild(qrCodeDiv);
        
        // Create QR code container with white background
        const qrBackground = document.createElement('div');
        qrBackground.className = 'bg-white p-2 rounded';
        qrCodeDiv.appendChild(qrBackground);
        
        // Create title paragraph
        const titleParagraph = document.createElement('p');
        titleParagraph.className = 'text-xs text-terminal-foreground mt-2';
        titleParagraph.textContent = title;
        qrCodeDiv.appendChild(titleParagraph);
        
        // If value exists, create the QR code using the library
        if (value) {
          const decodedValue = decodeURIComponent(value);
          
          // Use qrcode.react to generate the QR code in a separate div
          const qrContainer = document.createElement('div');
          qrBackground.appendChild(qrContainer);
          
          // Import and use qrcode.react
          import('qrcode.react').then(QRCodeModule => {
            // Create a React element and convert it to string
            const qrCodeElement = QRCodeModule.QRCodeSVG({
              value: decodedValue,
              size: 128,
              level: "M",
              includeMargin: true
            });
            
            // Render the QR code to string
            const ReactDOMServer = window.ReactDOMServer || { renderToString: () => '' };
            try {
              // Try to use ReactDOMServer if available
              qrContainer.innerHTML = ReactDOMServer.renderToString(qrCodeElement);
            } catch (e) {
              // Fallback method - create a basic SVG
              qrContainer.innerHTML = `<svg width="128" height="128" viewBox="0 0 128 128">
                <rect width="128" height="128" fill="white" />
                <text x="64" y="64" text-anchor="middle" dominant-baseline="middle" fill="black">QR Code</text>
                <text x="64" y="80" text-anchor="middle" dominant-baseline="middle" fill="black" font-size="8">${decodedValue}</text>
              </svg>`;
              console.error('Error rendering QR code:', e);
            }
          }).catch(err => {
            console.error('Failed to load QR code library:', err);
            qrContainer.textContent = 'QR Code failed to load';
          });
        }
      }
    });
  }, [history]);

  return (
    <div
      ref={terminalRef}
      className="flex-1 p-4 overflow-y-auto terminal-scrollbar terminal-content-height"
    >
      {showAsciiArt && <AsciiArt />}

      {/* Command History */}
      <TerminalHistory 
        history={history} 
        onCommandClick={handleCommandClick}
      />

      {/* Processing indicator */}
      {isProcessingAsync && (
        <div className="text-terminal-warning font-mono text-sm mt-2 mb-2">
          Processing command... <span className="animate-pulse">▌</span>
        </div>
      )}

      {/* Current Command Line */}
      {!isInitializing && (
        <CommandLine
          onSubmit={onCommandSubmit}
          autoFocus
          inputRef={inputRef}
          disabled={isProcessingAsync}
          history={commandHistory}
          initialValue={commandInput}
          onInputChange={setCommandInput}
        />
      )}
    </div>
  );
};

export default TerminalContent;
