import React from 'react';
import { useNotes } from '../contexts/NotesContext';
import { useTasks } from '../contexts/TasksContext';
import { useApp } from '../contexts/AppContext';

export const Dashboard: React.FC = () => {
  const { notes } = useNotes();
  const { tasks } = useTasks();
  const { setViewMode } = useApp();

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const pendingTasks = tasks.filter(t => t.status !== 'done').length;
  const recentNotes = notes.slice(-6).reverse();

  return (
    <div className="p-8 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to VisionPad</h1>
        <p className="text-gray-600 dark:text-gray-400">Your personal knowledge vault and command center</p>
      </div>

      <div className="mb-8">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/6904b7bacb0a54bd1ce7dad4_1761916925482_8a9fe9a1.webp"
          alt="Dashboard Hero"
          className="w-full h-64 object-cover rounded-xl shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <div className="text-4xl font-bold mb-2">{notes.length}</div>
          <div className="text-blue-100">Total Notes</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <div className="text-4xl font-bold mb-2">{pendingTasks}</div>
          <div className="text-purple-100">Active Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <div className="text-4xl font-bold mb-2">{completedTasks}</div>
          <div className="text-green-100">Completed</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Notes</h2>
          <div className="space-y-3">
            {recentNotes.map(note => (
              <div
                key={note.id}
                onClick={() => setViewMode('editor')}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              >
                <h3 className="font-semibold mb-1">{note.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {note.content || 'No content yet'}
                </p>
                <div className="flex gap-2 mt-2">
                  {note.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setViewMode('editor')}
              className="p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition"
            >
              <div className="text-3xl mb-2">📝</div>
              <div className="font-semibold">New Note</div>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className="p-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-lg transition"
            >
              <div className="text-3xl mb-2">✓</div>
              <div className="font-semibold">New Task</div>
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className="p-6 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition"
            >
              <div className="text-3xl mb-2">🕸️</div>
              <div className="font-semibold">View Graph</div>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className="p-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-lg transition"
            >
              <div className="text-3xl mb-2">📅</div>
              <div className="font-semibold">Calendar</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
