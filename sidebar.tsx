import React, { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { useApp } from '../contexts/AppContext';

export const Sidebar: React.FC = () => {
  const { notes, folders, createNote, createFolder, setActiveNote } = useNotes();
  const { sidebarOpen } = useApp();
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);

  if (!sidebarOpen) return null;

  const handleCreateNote = async () => {
    const note = await createNote('Untitled Note');
    setActiveNote(note);
  };

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      await createFolder(newFolderName);
      setNewFolderName('');
      setShowNewFolder(false);
    }
  };


  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleCreateNote}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + New Note
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Folders</h3>
            <button onClick={() => setShowNewFolder(true)} className="text-blue-500 text-sm">+</button>
          </div>
          {showNewFolder && (
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleCreateFolder()}
                className="flex-1 px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                placeholder="Folder name"
                autoFocus
              />
            </div>
          )}
          {folders.map(folder => (
            <div key={folder.id} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
              📁 {folder.name}
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Recent Notes</h3>
          {notes.slice(-10).reverse().map(note => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer text-sm"
            >
              📄 {note.title}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
