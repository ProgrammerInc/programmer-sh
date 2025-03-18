'use client';

import { useAuthModal } from '@/hooks/use-auth-modal.hook';
import { useTerminalAuth } from '@/hooks/use-terminal-auth.hook';
import { supabase } from '@/integrations/supabase/supabase.client';
import { isIncognitoMode } from '@/lib/is-incognito-mode';
import { ChevronDown, LogIn, LogOut, Minus, Plus, Settings, User, X } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './terminal-header.module.css';
import { TerminalHeaderProps, TerminalHeaderRef } from './terminal-header.types';

/**
 * Terminal Header component that displays window controls, terminal title, and user menu.
 * 
 * Features:
 * - Window control buttons (close, minimize, maximize)
 * - Title display with animated cursor and last command indicator
 * - User authentication dropdown menu
 * - Login/signup or profile/logout options
 * - Social media links (optional)
 * 
 * @example
 * ```tsx
 * <TerminalHeader 
 *   lastCommand="ls -la" 
 *   socialLinks={[
 *     { name: 'GitHub', url: 'https://github.com/username' },
 *     { name: 'Twitter', url: 'https://twitter.com/username' }
 *   ]} 
 * />
 * ```
 */
export const TerminalHeader = forwardRef<TerminalHeaderRef, TerminalHeaderProps>(
  ({ 
    lastCommand = '', 
    socialLinks = [],
    className = ''
  }, ref) => {
    const { userEmail } = useTerminalAuth();
    const { openModal, headerRef } = useAuthModal();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      focusUserMenu: () => dropdownButtonRef.current?.focus(),
      closeUserMenu: () => setDropdownOpen(false)
    }));

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

    // Update aria-expanded attribute directly when dropdownOpen changes
    useEffect(() => {
      if (dropdownButtonRef.current) {
        dropdownButtonRef.current.setAttribute('aria-expanded', dropdownOpen ? 'true' : 'false');
      }
    }, [dropdownOpen]);

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

    // Handle user actions
    const handleLogout = async () => {
      try {
        await supabase.auth.signOut();
        setDropdownOpen(false);
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    const handleLoginClick = () => {
      setDropdownOpen(false);
      openModal('login');
    };

    const handleSignupClick = () => {
      setDropdownOpen(false);
      openModal('signup');
    };

    const handleProfileClick = () => {
      setDropdownOpen(false);
      // Dispatch a custom event to execute the profile command
      const event = new CustomEvent('executeCommand', { detail: { command: 'whoami' } });
      document.dispatchEvent(event);
    };

    const handleSettingsClick = () => {
      setDropdownOpen(false);
      // Dispatch a custom event to execute the settings command
      const event = new CustomEvent('executeCommand', { detail: { command: 'theme' } });
      document.dispatchEvent(event);
    };

    // Handle keyboard navigation in dropdown
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    return (
      <div
        ref={headerRef}
        className={`${styles.header} ${className}`}
        role="banner"
        aria-label="Terminal header"
      >
        {/* Window controls */}
        <div className={styles['window-controls']} role="group" aria-label="Window controls">
          <div 
            className={`${styles['window-control']} ${styles.close}`}
            role="button"
            aria-label="Close window"
            tabIndex={0}
          >
            <X
              className={styles['control-icon']}
              strokeWidth={3}
            />
          </div>
          <div 
            className={`${styles['window-control']} ${styles.minimize}`}
            role="button"
            aria-label="Minimize window"
            tabIndex={0}
          >
            <Minus
              className={styles['control-icon']}
              strokeWidth={3}
            />
          </div>
          <div 
            className={`${styles['window-control']} ${styles.maximize}`}
            role="button"
            aria-label="Maximize window"
            tabIndex={0}
          >
            <Plus
              className={styles['control-icon']}
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Title area */}
        <div className={styles['title-container']} aria-label="Terminal title">
          <span>
            <span className={styles['title-text']}>&lt;programmer&gt;</span>.
            <span className={styles.cursor}>_</span>
          </span>
          {lastCommand && (
            <span>
              <span className={styles.divider}>&nbsp;-&nbsp;</span>
              <span className={styles['command-path']}>~/{lastCommand}</span>
            </span>
          )}
        </div>

        {/* User dropdown */}
        <div className={styles['user-dropdown']} ref={dropdownRef} onKeyDown={handleKeyDown}>
          <button
            ref={dropdownButtonRef}
            id="userDropdown"
            type="button"
            onClick={e => {
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }}
            className={styles['dropdown-button']}
            aria-haspopup="true"
            aria-label="User menu dropdown"
          >
            <User className="w-4 h-4" />
            <span className={styles.username}>{getUserDisplayName()}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {dropdownOpen && (
            <div
              className={styles['dropdown-content']}
              onClick={e => e.stopPropagation()}
              role="menu"
              aria-labelledby="userDropdown"
            >
              <div className={styles['dropdown-menu']}>
                {userEmail ? (
                  <>
                    <button
                      className={styles['dropdown-item']}
                      onClick={handleProfileClick}
                      role="menuitem"
                    >
                      <User className={styles['dropdown-icon']} />
                      Profile
                    </button>
                    <button
                      className={styles['dropdown-item']}
                      onClick={handleSettingsClick}
                      role="menuitem"
                    >
                      <Settings className={styles['dropdown-icon']} />
                      Settings
                    </button>
                    <div className={styles['dropdown-divider']} role="separator"></div>
                    <button
                      className={styles['dropdown-item']}
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <LogOut className={styles['dropdown-icon']} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles['dropdown-item']}
                      onClick={handleLoginClick}
                      role="menuitem"
                    >
                      <LogIn className={styles['dropdown-icon']} />
                      Login
                    </button>
                    <button
                      className={styles['dropdown-item']}
                      onClick={handleSignupClick}
                      role="menuitem"
                    >
                      <User className={styles['dropdown-icon']} />
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default TerminalHeader;
