import * as React from 'react';
import { SidebarContext, SidebarContextType } from './sidebar.context-def';

/**
 * SidebarProvider context component
 */
export const SidebarContextProvider: React.FC<
  React.PropsWithChildren<{ value: SidebarContextType }>
> = ({ children, value }) => {
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

/**
 * Export the context for convenience
 */
export { SidebarContext, type SidebarContextType };

export default SidebarContextProvider;
