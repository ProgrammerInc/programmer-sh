
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScreensaverProps {
  isActive: boolean;
  onActivity: () => void;
}

const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onActivity }) => {
  const [matrixChars, setMatrixChars] = useState<string[][]>([]);
  const columns = 50;
  const rows = 30;

  // Generate random matrix characters
  useEffect(() => {
    if (isActive) {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const matrix: string[][] = [];
      
      for (let i = 0; i < columns; i++) {
        const column: string[] = [];
        for (let j = 0; j < rows; j++) {
          column.push(chars[Math.floor(Math.random() * chars.length)]);
        }
        matrix.push(column);
      }
      
      setMatrixChars(matrix);
      
      // Update matrix characters at intervals
      const interval = setInterval(() => {
        setMatrixChars(prevMatrix => {
          const newMatrix = [...prevMatrix];
          for (let i = 0; i < columns; i++) {
            // Update a random position in each column
            const randIndex = Math.floor(Math.random() * rows);
            newMatrix[i][randIndex] = chars[Math.floor(Math.random() * chars.length)];
          }
          return newMatrix;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
      onClick={onActivity}
      onMouseMove={onActivity}
      onKeyDown={onActivity}
      tabIndex={0}
    >
      <div className="absolute inset-0 overflow-hidden">
        {matrixChars.map((column, colIndex) => (
          <div 
            key={colIndex} 
            className="absolute top-0 inline-block whitespace-pre text-center"
            style={{ 
              left: `${(colIndex / columns) * 100}%`, 
              width: `${100 / columns}%`,
              transform: 'translateZ(0)',
              willChange: 'contents'
            }}
          >
            {column.map((char, charIndex) => (
              <div
                key={charIndex}
                className={cn(
                  "text-terminal-prompt font-mono text-opacity-0 animate-fade-in",
                  charIndex % 3 === 0 && "text-terminal-success",
                  charIndex % 5 === 0 && "text-terminal-warning",
                  charIndex % 7 === 0 && "text-terminal-error"
                )}
                style={{ 
                  animationDelay: `${(charIndex * 0.1) + (Math.random() * 2)}s`,
                  animationDuration: '3s'
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="z-10 mt-8 text-terminal-prompt text-xl font-mono animate-pulse">
        <span>Press any key or click to continue...</span>
      </div>
    </div>
  );
};

export default Screensaver;
