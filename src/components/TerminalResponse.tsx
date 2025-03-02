
import React from 'react';
import { CommandResult } from '../utils/terminalCommands';
import { useTypingEffect } from '../utils/typingEffect';
import { cn } from '@/lib/utils';

interface TerminalResponseProps {
  response: CommandResult;
  animate?: boolean;
  className?: string;
}

// Function to convert plain text URLs to clickable links
const convertLinksToAnchors = (text: string): React.ReactNode => {
  // Regex to match URLs (including x.com/twitter.com), emails, and phone numbers
  const urlRegex = /(https?:\/\/[^\s]+)|([a-zA-Z0-9][\w.-]+\.(com|org|net|edu|io|sh|to|dev|me|app)(?:\/[^\s]*)?)/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\+\d{1,3}[-\s]?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4})/g;
  
  // Split the text into parts
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Create a copy of the text for processing
  const textCopy = text;
  
  // First, process URLs
  const processedSegments: React.ReactNode[] = [];
  
  // Process the text segment by segment, looking for URLs, emails, and phone numbers
  let currentText = textCopy;
  let currentIndex = 0;
  
  // Process URLs first
  while (currentIndex < currentText.length) {
    const restOfText = currentText.substring(currentIndex);
    const urlMatch = urlRegex.exec(restOfText);
    
    if (!urlMatch) {
      // No more URLs, add the rest and break
      if (currentIndex < currentText.length) {
        processedSegments.push(processOtherTypes(currentText.substring(currentIndex)));
      }
      break;
    }
    
    // Add text before the URL
    if (urlMatch.index > 0) {
      processedSegments.push(processOtherTypes(restOfText.substring(0, urlMatch.index)));
    }
    
    // Add the URL as a link
    const url = urlMatch[0];
    let href = url;
    
    // Handle different URL formats
    if (!href.startsWith('http')) {
      href = `https://${href}`;
    }
    
    processedSegments.push(
      <a 
        key={`link-${currentIndex + urlMatch.index}`} 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        {url}
      </a>
    );
    
    currentIndex += urlMatch.index + url.length;
  }
  
  return processedSegments;
  
  // Helper function to process emails and phones in text segments
  function processOtherTypes(text: string): React.ReactNode[] {
    const segments: React.ReactNode[] = [];
    let lastPos = 0;
    
    // Process emails
    let emailMatch;
    while ((emailMatch = emailRegex.exec(text)) !== null) {
      if (emailMatch.index > lastPos) {
        segments.push(processPhones(text.substring(lastPos, emailMatch.index)));
      }
      
      const email = emailMatch[0];
      segments.push(
        <a 
          key={`email-${emailMatch.index}`} 
          href={`mailto:${email}?subject=Inquiry from Portfolio`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          {email}
        </a>
      );
      
      lastPos = emailMatch.index + email.length;
    }
    
    // Process remaining text for phone numbers
    if (lastPos < text.length) {
      segments.push(processPhones(text.substring(lastPos)));
    }
    
    return segments.flat();
  }
  
  // Helper function to process phone numbers
  function processPhones(text: string): React.ReactNode[] {
    const segments: React.ReactNode[] = [];
    let lastPos = 0;
    
    let phoneMatch;
    while ((phoneMatch = phoneRegex.exec(text)) !== null) {
      if (phoneMatch.index > lastPos) {
        segments.push(text.substring(lastPos, phoneMatch.index));
      }
      
      const phone = phoneMatch[0];
      // Clean up the phone number for tel: link
      const cleanPhone = phone.replace(/[-\s()]/g, '');
      
      segments.push(
        <a 
          key={`phone-${phoneMatch.index}`} 
          href={`tel:${cleanPhone}`}
          className="text-blue-400 hover:underline"
        >
          {phone}
        </a>
      );
      
      lastPos = phoneMatch.index + phone.length;
    }
    
    if (lastPos < text.length) {
      segments.push(text.substring(lastPos));
    }
    
    return segments;
  }
};

const TerminalResponse: React.FC<TerminalResponseProps> = ({
  response,
  animate = false,
  className
}) => {
  const { displayText, isDone } = useTypingEffect(
    typeof response.content === 'string' ? response.content : '',
    { speed: 1, delay: 0, cursor: false }
  );

  // If content is not a string, render directly
  if (typeof response.content !== 'string') {
    return (
      <div 
        className={cn(
          'whitespace-pre-wrap font-mono text-sm mb-4',
          response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
          className
        )}
      >
        {response.content}
      </div>
    );
  }

  // For animated content, we can't easily make links clickable during animation
  // so we only apply link conversion when animation is done or animation is disabled
  const content = (animate && !isDone) 
    ? displayText 
    : convertLinksToAnchors(animate ? displayText : response.content as string);

  return (
    <div 
      className={cn(
        'whitespace-pre-wrap font-mono text-sm mb-4',
        response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
        animate && !isDone ? 'animate-pulse' : '',
        className
      )}
    >
      {content}
    </div>
  );
};

export default TerminalResponse;
