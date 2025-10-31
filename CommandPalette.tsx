import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNotes } from '../contexts/NotesContext';
import { useTasks } from '../contexts/TasksContext';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, setViewMode } = useApp();
  const { notes, createNote, setActiveNote, searchNotes } = useNotes();
  const { createTask } = useTasks();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!commandPaletteOpen) {
      setQuery('');
      setResults([]);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    if (query.trim()) {
      const noteResults = searchNotes(query).map(n => ({ type: 'note', data: n }));
      setResults(noteResults);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!commandPaletteOpen) return null;

  const handleCommand = async (cmd: string) => {
    if (cmd.startsWith('new note')) {
      const title = cmd.replace('new note', '').trim() || 'Untitled';
      const note = await createNote(title);
      setActiveNote(note);
      setViewMode('editor');
    } else if (cmd.startsWith('new task')) {
      const title = cmd.replace('new task', '').trim();
      if (title) {
        await createTask({ title, description: '', status: 'todo', priority: 'medium', tags: [], subtasks: [] });
        setViewMode('list');
      }
    }
    setCommandPaletteOpen(false);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-32 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleCommand(query)}
          placeholder="Type a command or search..."
          className="w-full px-6 py-4 text-lg border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
          autoFocus
        />
        
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length > 0 ? (
            results.map((r, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveNote(r.data);
                  setViewMode('editor');
                  setCommandPaletteOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
              >
                <div className="font-medium">{r.data.title}</div>
                <div className="text-sm text-gray-500">{r.data.content.slice(0, 100)}</div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">
              Try: "new note [title]" or "new task [title]"
            </div>
          )}
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={() => setCommandPaletteOpen(false)} />
    </div>
  );
};
