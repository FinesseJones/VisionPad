import React from 'react';
import { useNotes } from '../contexts/NotesContext';

export const GraphView: React.FC = () => {
  const { notes } = useNotes();

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));
  const totalLinks = notes.reduce((sum, n) => sum + n.links.length, 0);

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-4">Knowledge Graph</h3>
      
      <div className="mb-6">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/6904b7bacb0a54bd1ce7dad4_1761916926285_e50b38a7.webp"
          alt="Knowledge Graph"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-500">{notes.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Notes</div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-2xl font-bold text-purple-500">{totalLinks}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Connections</div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-500">{allTags.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tags</div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 10).map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
