import { createContext, useContext } from 'react';

interface SidebarContextType {
  isCompact: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({
  isCompact: false,
});

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
