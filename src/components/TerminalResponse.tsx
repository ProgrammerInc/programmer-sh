
import React from 'react';
import { CommandResult } from '../utils/commands/types';
import { useTypingEffect } from '../utils/typingEffect';
import { cn } from '@/lib/utils';

interface TerminalResponseProps {
  response: CommandResult;
  animate?: boolean;
  className?: string;
  onCommandClick?: (command: string) => void;
}

// Function to convert plain text URLs to clickable links
const convertLinksToAnchors = (text: string, onCommandClick?: (command: string) => void): React.ReactNode[] => {
  // Regex patterns for URLs, emails, and phone numbers
  const urlRegex =
    /(https?:\/\/[^\s]+)|((www\.)?[a-zA-Z0-9][\w.-]+\.(com|org|net|edu|io|sh|to|dev|me|app)\/?\S*)|((www\.)?x\.com\/\S*)/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\+\d{1,3}[-\s]?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,9})/g;
  const programmerRegex = /(<programmer>\._)/g;
  
  // Command link pattern for elements with class "command-link" and data-command attribute
  const commandLinkRegex = /<span class="command-link" data-command="([^"]+)">([^<]+)<\/span>/g;

  // Process the text and return array of React nodes
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  const matches: Array<{ index: number; length: number; content: React.ReactNode; type: string }> =
    [];

  // Find all URL matches
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    let href = url;
    if (!href.startsWith('http') && !href.startsWith('www.')) {
      href = `https://${href}`;
    } else if (href.startsWith('www.')) {
      href = `https://${href}`;
    }

    matches.push({
      index: match.index,
      length: url.length,
      content: (
        <a
          key={`url-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          {url}
        </a>
      ),
      type: 'url',
    });
  }

  // Find all email matches
  while ((match = emailRegex.exec(text)) !== null) {
    const email = match[0];
    matches.push({
      index: match.index,
      length: email.length,
      content: (
        <a
          key={`email-${match.index}`}
          href={`mailto:${email}?subject=Inquiry from Portfolio`}
          className="text-blue-400 hover:underline"
        >
          {email}
        </a>
      ),
      type: 'email',
    });
  }

  // Find all phone matches
  while ((match = phoneRegex.exec(text)) !== null) {
    const phone = match[0];
    const cleanPhone = phone.replace(/[-\s()]/g, '');
    matches.push({
      index: match.index,
      length: phone.length,
      content: (
        <a
          key={`phone-${match.index}`}
          href={`tel:${cleanPhone}`}
          className="text-blue-400 hover:underline"
        >
          {phone}
        </a>
      ),
      type: 'phone',
    });
  }

  // Find all <programmer>._ matches
  while ((match = programmerRegex.exec(text)) !== null) {
    const programmer = match[0];
    matches.push({
      index: match.index,
      length: programmer.length,
      content: (
        <span key={`programmer-${match.index}`} className="whitespace-nowrap">
          &lt;programmer&gt;.<span className="animate-cursor-blink">_</span>
        </span>
      ),
      type: 'programmer',
    });
  }

  // Find and process command links
  let htmlContent = text;
  if (onCommandClick && commandLinkRegex.test(text)) {
    const processedLinks: React.ReactNode[] = [];
    let lastMatchEnd = 0;
    
    while ((match = commandLinkRegex.exec(text)) !== null) {
      const [fullMatch, commandValue, displayText] = match;
      
      // Add text before this match
      if (match.index > lastMatchEnd) {
        processedLinks.push(text.substring(lastMatchEnd, match.index));
      }
      
      // Replace with actual clickable span
      processedLinks.push(
        <span 
          key={`cmd-${match.index}`}
          className="text-blue-400 hover:underline cursor-pointer" 
          onClick={() => onCommandClick(commandValue)}
        >
          {displayText}
        </span>
      );
      
      lastMatchEnd = match.index + fullMatch.length;
    }
    
    // Add any remaining text
    if (lastMatchEnd < text.length) {
      processedLinks.push(text.substring(lastMatchEnd));
    }
    
    if (processedLinks.length > 0) {
      return processedLinks;
    }
  }

  // Sort matches by their starting index
  matches.sort((a, b) => a.index - b.index);

  // Filter out overlapping matches, prioritizing emails over URLs
  const filteredMatches = [];
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    let overlapping = false;

    // Check if this match overlaps with any previously accepted match
    for (const accepted of filteredMatches) {
      // If there's overlap and we're a URL that overlaps with an email, skip
      if (
        (current.index >= accepted.index && current.index < accepted.index + accepted.length) ||
        (current.index + current.length > accepted.index && current.index < accepted.index)
      ) {
        // If we're a URL that overlaps with an email, skip
        if (current.type === 'url' && accepted.type === 'email') {
          overlapping = true;
          break;
        }
      }
    }

    if (!overlapping) {
      filteredMatches.push(current);
    }
  }

  // Build the result array with the filtered matches
  for (const match of filteredMatches) {
    // Add text before this match if there's any
    if (match.index > lastIndex) {
      result.push(text.substring(lastIndex, match.index));
    }

    // Add the match content (anchor tag)
    result.push(match.content);

    // Update lastIndex to after this match
    lastIndex = match.index + match.length;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return result;
};

// Helper function to create a dangerously set HTML component with proper typings
const createMarkup = (htmlContent: string) => {
  return { __html: htmlContent };
};

const TerminalResponse: React.FC<TerminalResponseProps> = ({
  response,
  animate = false,
  className,
  onCommandClick,
}) => {
  const { displayText, isDone } = useTypingEffect(
    typeof response.content === 'string' ? response.content : '',
    { speed: 1, delay: 0, cursor: false }
  );

  // Check if content is HTML that needs to be rendered
  const isHtmlContent = 
    typeof response.content === 'string' && 
    (response.content.includes('<div') || 
     response.content.includes('<p') || 
     response.content.includes('<span') || 
     response.content.includes('<a '));

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

  // For HTML content that should be rendered as actual HTML with command link support
  if (isHtmlContent && !animate) {
    // If we have command links and an onCommandClick handler
    if (onCommandClick && response.content.includes('command-link')) {
      return (
        <div
          className={cn(
            'whitespace-pre-wrap font-mono text-sm mb-4',
            response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
            className
          )}
        >
          {convertLinksToAnchors(response.content, onCommandClick)}
        </div>
      );
    }
    
    // Use dangerouslySetInnerHTML for HTML content
    return (
      <div
        className={cn(
          'whitespace-pre-wrap font-mono text-sm mb-4',
          response.isError ? 'text-terminal-error' : 'text-terminal-foreground',
          className
        )}
        dangerouslySetInnerHTML={createMarkup(response.content)}
      />
    );
  }

  // For animated content, we can't easily make links clickable during animation
  // so we only apply link conversion when animation is done or animation is disabled
  const content =
    animate && !isDone
      ? displayText
      : convertLinksToAnchors(animate ? displayText : (response.content as string), onCommandClick);

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
