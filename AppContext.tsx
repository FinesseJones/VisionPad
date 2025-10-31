import React, { createContext, useContext, useState } from 'react';
import { ViewMode } from '../types';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
  rightPanelView: 'graph' | 'tasks' | 'ai';
  setRightPanelView: (view: 'graph' | 'tasks' | 'ai') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [rightPanelView, setRightPanelView] = useState<'graph' | 'tasks' | 'ai'>('graph');

  return (
    <AppContext.Provider value={{
      viewMode, setViewMode, sidebarOpen, setSidebarOpen,
      commandPaletteOpen, setCommandPaletteOpen,
      rightPanelOpen, setRightPanelOpen,
      rightPanelView, setRightPanelView
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
