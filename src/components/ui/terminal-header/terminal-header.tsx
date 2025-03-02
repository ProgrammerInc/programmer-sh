
import React, { useState, useEffect, useRef } from 'react';
import { User, LogIn, LogOut, Settings, X, Plus, Minus, ChevronDown } from 'lucide-react';
import { SocialLink } from '@/types/socialLinks';
import { supabase } from '@/integrations/supabase/client';
import { useTerminalAuth } from '@/hooks/use-terminal-auth';
import { isIncognitoMode } from '@/utils/incognito';

interface TerminalHeaderProps {
  lastCommand?: string;
  socialLinks?: SocialLink[];
  simplified?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ 
  lastCommand = '', 
  socialLinks = [],
  simplified = false
}) => {
  const { userEmail } = useTerminalAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check for incognito mode
  useEffect(() => {
    setIsAnonymous(isIncognitoMode());
  }, []);

  // Determine display name
  const getUserDisplayName = () => {
    if (userEmail) {
      return userEmail.split('@')[0];
    }

    return isAnonymous ? 'Anonymous' : 'Guest';
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setDropdownOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`flex items-center justify-between ${simplified ? 'bg-transparent py-2 px-3' : 'bg-terminal-header p-2'} border-b border-terminal-border`}>
      {!simplified && (
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
      )}

      <div className={`flex-1 text-center text-terminal-title text-sm font-mono truncate px-4 ${simplified ? 'text-left' : ''}`}>
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

      <div className="relative" ref={dropdownRef}>
        <button
          id="userDropdown"
          type="button"
          onClick={e => {
            e.preventDefault();
            e.currentTarget.ariaExpanded = String(!dropdownOpen);
            setDropdownOpen(!dropdownOpen);
          }}
          className="flex items-center space-x-1 text-terminal-title hover:text-terminal-foreground transition-colors py-1 px-2 rounded"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <User className="w-4 h-4" />
          <span className="text-xs">{getUserDisplayName()}</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-terminal-dropdown border border-terminal-border z-50"
            onClick={e => e.stopPropagation()}
          >
            <div className="py-1 rounded-md bg-terminal-dropdown">
              {userEmail ? (
                <>
                  <a
                    href="#profile"
                    className="flex items-center px-4 py-2 text-sm text-terminal-foreground hover:bg-terminal-dropdown-hover"
                    onClick={e => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      // You can add code to execute the profile command here
                      console.log('Navigate to profile');
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-2 text-sm text-terminal-foreground hover:bg-terminal-dropdown-hover"
                    onClick={e => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      // You can add code to execute the settings command here
                      console.log('Navigate to settings');
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </a>
                  <div className="border-t border-terminal-border my-1"></div>
                  <a
                    href="#logout"
                    className="flex items-center px-4 py-2 text-sm text-terminal-foreground hover:bg-terminal-dropdown-hover"
                    onClick={e => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </a>
                </>
              ) : (
                <a
                  href="#login"
                  className="flex items-center px-4 py-2 text-sm text-terminal-foreground hover:bg-terminal-dropdown-hover"
                  onClick={e => {
                    e.preventDefault();
                    setDropdownOpen(false);
                    // You can add code to execute the login command here
                    console.log('Navigate to login');
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalHeader;
