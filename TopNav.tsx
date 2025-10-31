import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { ViewMode } from '../types';
import { Button } from './ui/button';
import { LogOut, User } from 'lucide-react';

export const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const { viewMode, setViewMode, setCommandPaletteOpen, sidebarOpen, setSidebarOpen } = useApp();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const views: { mode: ViewMode; label: string; icon: string }[] = [
    { mode: 'dashboard', label: 'Dashboard', icon: '📊' },
    { mode: 'editor', label: 'Notes', icon: '📝' },
    { mode: 'kanban', label: 'Kanban', icon: '📋' },
    { mode: 'gantt', label: 'Gantt', icon: '📈' },
    { mode: 'spreadsheet', label: 'Sheet', icon: '📊' },
    { mode: 'calendar', label: 'Calendar', icon: '📅' },
    { mode: 'graph', label: 'Graph', icon: '🕸️' },
    { mode: 'list', label: 'Tasks', icon: '✓' },
    { mode: 'admin', label: 'Admin', icon: '👑' }
  ];


  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          VisionPad
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {views.map(v => (
          <button
            key={v.mode}
            onClick={() => setViewMode(v.mode)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              viewMode === v.mode
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="px-3 py-1.5 rounded-lg text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          ⌘K
        </button>
        <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-300 dark:border-gray-600">
          <span className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

