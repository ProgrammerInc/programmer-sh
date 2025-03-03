import { HistoryItem } from '@/components/ui/terminal';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { programmerIcon } from '../../../lib/qrcode-logos';
import AsciiArt from '../ascii-art/ascii-art';
import CommandLine from '../command-line';
import TerminalHistory from '../terminal-history';

export interface TerminalContentProps {
  history: HistoryItem[];
  isInitializing: boolean;
  isProcessingAsync: boolean;
  showAsciiArt: boolean;
  commandHistory: string[];
  onCommandSubmit: (command: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TerminalContent: React.FC<TerminalContentProps> = ({
  history,
  isInitializing,
  isProcessingAsync,
  showAsciiArt,
  commandHistory,
  onCommandSubmit,
  inputRef
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
                  duration: 2000
                });
              })
              .catch(err => {
                console.error('Failed to copy text: ', err);
                toast({
                  title: 'Copy failed',
                  description: 'Could not copy to clipboard. Please try again.',
                  variant: 'destructive',
                  duration: 2000
                });
              });
          } catch (error) {
            console.error('Clipboard API not available: ', error);
            toast({
              title: 'Copy failed',
              description: 'Clipboard functionality is not available in your browser.',
              variant: 'destructive',
              duration: 2000
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
    const qrContainers = document.querySelectorAll('.qrcode-container');
    qrContainers.forEach(container => {
      const qrElement = container.querySelector('QRCode');
      if (qrElement) {
        const value = qrElement.getAttribute('value') || '';
        const title =
          qrElement.getAttribute('title') || 'Scan QR Code to Save My Contact Information';

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

          // Import and use qrcode.react - but don't rely on ReactDOMServer
          import('react-qrcode-logo')
            .then(QRCode => {
              try {
                // Create a simplified SVG QR code directly
                // This avoids using ReactDOMServer which isn't available on window
                const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgElement.setAttribute('width', '300');
                svgElement.setAttribute('height', '300');
                svgElement.setAttribute('viewBox', '0 0 300 300');

                // Instead of trying to convert React element to string,
                // we'll create a placeholder and then render QR code using the actual component
                qrContainer.innerHTML = '';
                const qrDiv = document.createElement('div');
                qrContainer.appendChild(qrDiv);

                // Create a new react root and render the QR code component
                const root = document.createElement('div');
                qrContainer.appendChild(root);

                // Use static import of ReactDOM to render QR code
                try {
                  const bgColor = '#1a1f2c';
                  const fgColor = '#f1f1f1';
                  const eyeColor = fgColor;
                  const eyeRadius = 7;
                  const ecLevel = 'M';
                  const qrStyle = 'dots';
                  const quietZone = 0;
                  const size = 300;

                  const reactRoot = createRoot(root);

                  reactRoot.render(
                    React.createElement(QRCode.QRCode, {
                      value: decodedValue,
                      bgColor,
                      fgColor,
                      ecLevel,
                      eyeColor,
                      eyeRadius,
                      logoImage: programmerIcon.src,
                      logoWidth: programmerIcon.width,
                      logoHeight: programmerIcon.height,
                      logoPadding: programmerIcon.logoPadding,
                      logoPaddingStyle: programmerIcon.logoPaddingStyle,
                      qrStyle,
                      removeQrCodeBehindLogo: programmerIcon.removeQrCodeBehindLogo,
                      size,
                      style: {
                        backgroundColor: 'transparent',
                        color: 'transparent'
                      }
                    })
                  );
                } catch (renderErr) {
                  console.error('Error rendering QR code with React:', renderErr);
                  // Fallback to simple SVG
                  root.innerHTML = `<svg width="300" height="300" viewBox="0 0 300 300">
                <rect width="300" height="300" fill="#1a1f2c" />
                <text x="150" y="150" text-anchor="middle" dominant-baseline="middle" fill="#f1f1f1">Scan QR Code to Save My Contact Information</text>
                <text x="150" y="166" text-anchor="middle" dominant-baseline="middle" fill="#f1f1f1" font-size="16">${decodedValue}</text>
              </svg>`;
                }
              } catch (e) {
                console.error('Error creating QR code:', e);
                // Fallback method - create a basic SVG
                qrContainer.innerHTML = `<svg width="300" height="300" viewBox="0 0 300 300">
                <rect width="300" height="300" fill="#1a1f2c" />
                <text x="150" y="150" text-anchor="middle" dominant-baseline="middle" fill="#f1f1f1">Scan QR Code to Save My Contact Information</text>
                <text x="150" y="166" text-anchor="middle" dominant-baseline="middle" fill="#f1f1f1" font-size="16">${decodedValue}</text>
              </svg>`;
              }
            })
            .catch(err => {
              console.error('Failed to load QR code library:', err);
              qrContainer.textContent = 'QR Code failed to load.';
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
      <TerminalHistory history={history} onCommandClick={handleCommandClick} />

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
