'use client';

import { HistoryItem } from '@/components/ui/terminal-history/terminal-history.types';

export const renderCommandOutput = (command: string, output: string, rawHTML: boolean = false): HistoryItem => {
  return {
    command,
    output: output,
    error: output.includes('Error') || output.includes('error'),
    html: rawHTML,
    timestamp: new Date()
  };
};

export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  if (!ref.current) return;
  
  const element = ref.current;
  
  try {
    // Use smooth scrolling for better user experience
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    });
    
    // For browsers that might not support the smooth scrolling
    requestAnimationFrame(() => {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    });
  } catch (error) {
    // Fallback for any errors
    element.scrollTop = element.scrollHeight;
  }
};
