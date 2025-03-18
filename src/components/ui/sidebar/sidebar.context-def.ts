'use client';

import * as React from 'react';

/**
 * Type definition for the sidebar context
 */
export type SidebarContextType = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  toggleSidebar: () => void;
};

/**
 * Create the sidebar context
 */
export const SidebarContext = React.createContext<SidebarContextType | null>(null);

export default SidebarContext;
