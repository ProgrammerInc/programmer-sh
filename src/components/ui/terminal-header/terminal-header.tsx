
import React from 'react';
import { Github, Linkedin, Twitter, Mail, Globe, X, Plus, Minus } from 'lucide-react';
import { SocialLink } from '@/types/socialLinks';

interface TerminalHeaderProps {
  lastCommand?: string;
  socialLinks?: SocialLink[];
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ lastCommand = '', socialLinks = [] }) => {
  // Function to render the appropriate icon based on link type
  const renderSocialIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'website':
        return <Globe className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between bg-terminal-header p-2 border-b border-terminal-border">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-terminal-close window-control group flex items-center justify-center">
          <X
            className="w-2 h-2 text-terminal-background opacity-0 group-hover:opacity-100"
            strokeWidth={3}
          />
        </div>
        <div className="w-3 h-3 rounded-full bg-terminal-minimize window-control group flex items-center justify-center">
          <Minus
            className="w-2 h-2 text-terminal-background opacity-0 group-hover:opacity-100"
            strokeWidth={3}
          />
        </div>
        <div className="w-3 h-3 rounded-full bg-terminal-maximize window-control group flex items-center justify-center">
          <Plus
            className="w-2 h-2 text-terminal-background opacity-0 group-hover:opacity-100"
            strokeWidth={3}
          />
        </div>
      </div>

      <div className="flex-1 text-center text-terminal-title text-sm font-mono truncate px-4">
        <span>
          <span className="font-mono">&lt;programmer&gt;</span>.
          <span className="animate-cursor-blink font-mono">_</span>
        </span>
        {lastCommand && (
          <span>
            <span className="text-terminal-muted font-mono">&nbsp;-&nbsp;</span>
            <span className="text-terminal-prompt font-mono">~/{lastCommand}</span>
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        {socialLinks.length > 0 ? (
          // Render dynamic social links
          socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-title hover:text-terminal-foreground transition-colors cursor-pointer"
              aria-label={`${link.type} Profile`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent terminal focus
              }}
            >
              {renderSocialIcon(link.type)}
            </a>
          ))
        ) : (
          // Fallback to static links if no dynamic links are provided
          <>
            <a
              href="https://github.com/ProgrammerInc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-title hover:text-terminal-foreground transition-colors cursor-pointer"
              aria-label="GitHub Profile"
              onClick={(e) => {
                e.stopPropagation(); // Prevent terminal focus
              }}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/ProgrammerInc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-title hover:text-terminal-foreground transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
              onClick={(e) => {
                e.stopPropagation(); // Prevent terminal focus
              }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/ProgrammerInc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-title hover:text-terminal-foreground transition-colors cursor-pointer"
              aria-label="X.com/Twitter Profile"
              onClick={(e) => {
                e.stopPropagation(); // Prevent terminal focus
              }}
            >
              <Twitter className="w-4 h-4" />
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default TerminalHeader;
