import React from 'react';
import { useNotes } from '../contexts/NotesContext';

export const FullGraphView: React.FC = () => {
  const { notes } = useNotes();

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));
  const totalConnections = notes.reduce((sum, n) => sum + n.links.length, 0);

  const tagCounts = allTags.map(tag => ({
    tag,
    count: notes.filter(n => n.tags.includes(tag)).length
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Knowledge Graph</h1>

      <div className="mb-8">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/6904b7bacb0a54bd1ce7dad4_1761916926285_e50b38a7.webp"
          alt="Knowledge Graph Visualization"
          className="w-full h-96 object-cover rounded-xl shadow-2xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <div className="text-4xl font-bold mb-2">{notes.length}</div>
          <div className="text-blue-100">Total Nodes</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <div className="text-4xl font-bold mb-2">{totalConnections}</div>
          <div className="text-purple-100">Total Links</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <div className="text-4xl font-bold mb-2">{allTags.length}</div>
          <div className="text-green-100">Unique Tags</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Tag Distribution</h2>
          <div className="space-y-3">
            {tagCounts.slice(0, 10).map(({ tag, count }) => (
              <div key={tag} className="flex items-center justify-between">
                <span className="font-medium">#{tag}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(count / notes.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Most Connected Notes</h2>
          <div className="space-y-3">
            {notes
              .sort((a, b) => (b.links.length + b.backlinks.length) - (a.links.length + a.backlinks.length))
              .slice(0, 10)
              .map(note => (
                <div key={note.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="font-medium truncate">{note.title}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {note.links.length + note.backlinks.length} connections
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
