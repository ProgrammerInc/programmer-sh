
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
  // Regex to match URLs, emails, and phone numbers
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9][\w.-]+\.(com|org|net|edu|io|sh|to|dev|me|app)(?:\/[^\s]*)?)/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\+\d{1,3}[-\s]?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4})/g;
  
  // Split the text into parts by URLs, emails, and phone numbers
  const parts: React.ReactNode[] = [];
  let remainingText = text;
  
  // Process URLs
  let lastIndex = 0;
  let urlMatch;
  
  // Using a copy of the text for URL processing
  const textCopy = text;
  
  while ((urlMatch = urlRegex.exec(textCopy)) !== null) {
    // Add text before the URL
    if (urlMatch.index > lastIndex) {
      const beforeText = textCopy.substring(lastIndex, urlMatch.index);
      parts.push(processEmailsAndPhones(beforeText));
    }
    
    // Add the URL as a link
    const url = urlMatch[0];
    const href = url.startsWith('http') ? url : `https://${url}`;
    parts.push(
      <a 
        key={`link-${urlMatch.index}`} 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        {url}
      </a>
    );
    
    lastIndex = urlMatch.index + url.length;
  }
  
  // Add any remaining text after the last URL
  if (lastIndex < textCopy.length) {
    parts.push(processEmailsAndPhones(textCopy.substring(lastIndex)));
  }
  
  return parts;
  
  // Helper function to process emails and phones in text segments
  function processEmailsAndPhones(text: string): React.ReactNode[] {
    const segments: React.ReactNode[] = [];
    let lastPos = 0;
    
    // Process emails
    let emailMatch;
    while ((emailMatch = emailRegex.exec(text)) !== null) {
      if (emailMatch.index > lastPos) {
        segments.push(text.substring(lastPos, emailMatch.index));
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
    let phoneText = text.substring(lastPos);
    let phoneMatch;
    let phoneLastPos = 0;
    
    const phoneSegments: React.ReactNode[] = [];
    
    while ((phoneMatch = phoneRegex.exec(phoneText)) !== null) {
      if (phoneMatch.index > phoneLastPos) {
        phoneSegments.push(phoneText.substring(phoneLastPos, phoneMatch.index));
      }
      
      const phone = phoneMatch[0];
      // Clean up the phone number for tel: link
      const cleanPhone = phone.replace(/[-\s()]/g, '');
      
      phoneSegments.push(
        <a 
          key={`phone-${phoneMatch.index}`} 
          href={`tel:${cleanPhone}`}
          className="text-blue-400 hover:underline"
        >
          {phone}
        </a>
      );
      
      phoneLastPos = phoneMatch.index + phone.length;
    }
    
    if (phoneLastPos < phoneText.length) {
      phoneSegments.push(phoneText.substring(phoneLastPos));
    }
    
    if (phoneSegments.length > 0) {
      segments.push(...phoneSegments);
    } else if (lastPos < text.length) {
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
