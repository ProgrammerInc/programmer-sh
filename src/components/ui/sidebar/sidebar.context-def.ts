import * as React from 'react';

/**
 * Type definition for the sidebar context
 */
export type SidebarContextType = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

/**
 * Create the sidebar context
 */
export const SidebarContext = React.createContext<SidebarContextType | null>(null);
