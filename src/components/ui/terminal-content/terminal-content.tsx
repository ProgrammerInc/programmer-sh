
import React, { useRef, useEffect, useState } from 'react';
import CommandLine from '../command-line';
import TerminalResponse from '../terminal-response';
import { HistoryItem } from '@/components/ui/terminal';
import { useToast } from '@/hooks/use-toast';
import AsciiArt from '../ascii-art/ascii-art';
import TerminalHistory from '../terminal-history';
import QRCodeComponent from '../qr-code';

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
        
        // Create React element in the DOM
        const qrCodeDiv = document.createElement('div');
        container.innerHTML = '';
        container.appendChild(qrCodeDiv);
        
        // Render QR code component
        if (value) {
          const decodedValue = decodeURIComponent(value);
          // We need to manually create the QR code since we can't use ReactDOM.render here
          const qrCode = document.createElement('div');
          qrCode.className = 'flex flex-col items-center my-4';
          qrCode.innerHTML = `
            <div class="bg-white p-2 rounded">
              <div id="qr-svg-container-${Math.random().toString(36).substring(2, 9)}"></div>
            </div>
            <p class="text-xs text-terminal-foreground mt-2">${title}</p>
          `;
          container.appendChild(qrCode);
          
          // Use qrcode.react script directly
          import('qrcode.react').then(QRCode => {
            const svgContainer = qrCode.querySelector('[id^="qr-svg-container-"]');
            if (svgContainer) {
              const qrSvg = QRCode.QRCodeSVG({
                value: decodedValue,
                size: 128,
                level: "M",
                includeMargin: true
              });
              
              // Convert React element to string and insert
              const tempDiv = document.createElement('div');
              tempDiv.appendChild(qrSvg);
              svgContainer.innerHTML = tempDiv.innerHTML;
            }
          }).catch(err => {
            console.error('Failed to load QR code library:', err);
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
