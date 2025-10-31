import React, { useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { NotesProvider } from '../contexts/NotesContext';
import { TasksProvider } from '../contexts/TasksContext';
import { AppProvider, useApp } from '../contexts/AppContext';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { CommandPalette } from './CommandPalette';
import { Dashboard } from './Dashboard';
import { MarkdownEditor } from './MarkdownEditor';
import { KanbanBoard } from './KanbanBoard';
import { CalendarView } from './CalendarView';
import { TaskList } from './TaskList';
import { FullGraphView } from './FullGraphView';
import { GanttChart } from './GanttChart';
import { SpreadsheetView } from './SpreadsheetView';
import { AdminDashboard } from './AdminDashboard';


const MainContent: React.FC = () => {
  const { viewMode, setCommandPaletteOpen } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <TopNav />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden flex">
          {viewMode === 'dashboard' && <Dashboard />}
          {viewMode === 'editor' && <MarkdownEditor />}
          {viewMode === 'kanban' && <KanbanBoard />}
          {viewMode === 'gantt' && <GanttChart />}
          {viewMode === 'spreadsheet' && <SpreadsheetView />}
          {viewMode === 'calendar' && <CalendarView />}
          {viewMode === 'list' && <TaskList />}
          {viewMode === 'graph' && <FullGraphView />}
          {viewMode === 'admin' && <AdminDashboard />}
        </main>

        <RightPanel />
      </div>
      <CommandPalette />
    </div>
  );
};

export const AppLayout: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <NotesProvider>
          <TasksProvider>
            <MainContent />
          </TasksProvider>
        </NotesProvider>
      </AppProvider>
    </ThemeProvider>
  );
};
