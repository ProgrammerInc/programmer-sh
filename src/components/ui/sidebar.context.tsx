import * as React from 'react';

/**
 * Type definition for the sidebar context
 */
export type SidebarContext = {
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
export const SidebarContext = React.createContext<SidebarContext | null>(null);

/**
 * SidebarProvider context component
 */
export const SidebarContextProvider: React.FC<
  React.PropsWithChildren<{ value: SidebarContext }>
> = ({ children, value }) => {
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};
