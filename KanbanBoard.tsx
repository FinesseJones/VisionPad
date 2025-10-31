import React, { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';
import { Task } from '../types';

export const KanbanBoard: React.FC = () => {
  const { tasks, createTask, updateTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<Task['status']>('todo');

  const columns: { status: Task['status']; label: string; color: string }[] = [
    { status: 'todo', label: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
    { status: 'in-progress', label: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900' },
    { status: 'done', label: 'Done', color: 'bg-green-100 dark:bg-green-900' },
    { status: 'blocked', label: 'Blocked', color: 'bg-red-100 dark:bg-red-900' }
  ];

  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      createTask({
        title: newTaskTitle,
        description: '',
        status: selectedColumn,
        priority: 'medium',
        tags: [],
        subtasks: []
      });
      setNewTaskTitle('');
    }
  };

  return (
    <div className="flex-1 p-8 overflow-x-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/6904b7bacb0a54bd1ce7dad4_1761916927072_41fcfe0e.webp"
          alt="Kanban Board"
          className="w-full h-48 object-cover rounded-xl shadow-lg mb-6"
        />
        <div className="flex gap-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleCreateTask()}
            placeholder="New task title..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
          />
          <select
            value={selectedColumn}
            onChange={e => setSelectedColumn(e.target.value as Task['status'])}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
          >
            {columns.map(col => (
              <option key={col.status} value={col.status}>{col.label}</option>
            ))}
          </select>
          <button
            onClick={handleCreateTask}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {columns.map(col => (
          <div key={col.status} className="flex flex-col">
            <div className={`${col.color} p-4 rounded-t-lg`}>
              <h3 className="font-semibold">{col.label}</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {tasks.filter(t => t.status === col.status).length} tasks
              </span>
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 rounded-b-lg space-y-3">
              {tasks.filter(t => t.status === col.status).map(task => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition cursor-move"
                >
                  <h4 className="font-medium mb-2">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="text-xs text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
