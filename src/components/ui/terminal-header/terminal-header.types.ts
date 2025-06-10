/* eslint-disable no-secrets/no-secrets */
'use client';

import { SocialLink } from '@/types/social-links.types';
import { RefObject } from 'react';

/**
 * Terminal header component props interface.
 *
 * @interface TerminalHeaderProps
 * @property {RefObject<HTMLDivElement>} [headerRef] - Reference to the header div element
 * @property {string} [lastCommand] - Last command executed in the terminal
 * @property {SocialLink[]} [socialLinks] - Social media links to display in the header
 * @property {string} [className] - Additional CSS class name
 */
export interface TerminalHeaderProps {
  headerRef?: RefObject<HTMLDivElement> | null;
  lastCommand?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

/**
 * User menu item interface.
 *
 * @interface UserMenuItem
 * @property {string} id - Unique identifier for the menu item
 * @property {string} label - Display text for the menu item
 * @property {string} icon - Icon name for the menu item
 * @property {() => void} onClick - Click handler for the menu item
 * @property {boolean} [divider] - Whether to show a divider after this item
 */
export interface UserMenuItem {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  divider?: boolean;
}

/**
 * Terminal header ref interface.
 *
 * @interface TerminalHeaderRef
 * @property {() => void} focusUserMenu - Function to focus the user menu
 * @property {() => void} closeUserMenu - Function to close the user menu
 */
export interface TerminalHeaderRef {
  focusUserMenu: () => void;
  closeUserMenu: () => void;
}
