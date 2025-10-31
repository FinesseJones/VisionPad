import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useNotes } from '../contexts/NotesContext';
import { GraphView } from './GraphView';
import { TasksSidebar } from './TasksSidebar';
import AIAssistant from './AIAssistant';

export const RightPanel: React.FC = () => {
  const { rightPanelOpen, rightPanelView, setRightPanelView } = useApp();
  const { activeNote, updateNote } = useNotes();

  if (!rightPanelOpen) return null;

  const handleApplyAI = (result: string) => {
    if (activeNote) {
      updateNote(activeNote.id, { content: result });
    }
  };

  return (
    <aside className="w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setRightPanelView('graph')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            rightPanelView === 'graph' ? 'border-b-2 border-blue-500 text-blue-500' : ''
          }`}
        >
          Graph
        </button>
        <button
          onClick={() => setRightPanelView('tasks')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            rightPanelView === 'tasks' ? 'border-b-2 border-blue-500 text-blue-500' : ''
          }`}
        >
          Tasks
        </button>
        <button
          onClick={() => setRightPanelView('ai')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            rightPanelView === 'ai' ? 'border-b-2 border-blue-500 text-blue-500' : ''
          }`}
        >
          AI
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rightPanelView === 'graph' && <GraphView />}
        {rightPanelView === 'tasks' && <TasksSidebar />}
        {rightPanelView === 'ai' && (
          <div className="p-4">
            <AIAssistant 
              content={activeNote?.content || ''} 
              onApply={handleApplyAI}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

