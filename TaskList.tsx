import React, { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';
import { Task } from '../types';

export const TaskList: React.FC = () => {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<'all' | Task['status']>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    dueDate: ''
  });

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleCreateTask = () => {
    if (newTask.title.trim()) {
      createTask({
        ...newTask,
        status: 'todo',
        tags: [],
        subtasks: [],
        dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined
      });
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Task List</h1>
        
        <div className="flex gap-4 mb-4">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
            <option value="blocked">Blocked</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>

          <button
            onClick={() => setShowForm(!showForm)}
            className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            + New Task
          </button>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <input
              type="text"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task title..."
              className="w-full px-4 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900"
            />
            <textarea
              value={newTask.description}
              onChange={e => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Description..."
              className="w-full px-4 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900"
              rows={3}
            />
            <div className="flex gap-4 mb-3">
              <select
                value={newTask.priority}
                onChange={e => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateTask}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Create Task
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {sortedTasks.map(task => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{task.description}</p>
                )}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Delete
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <select
                value={task.status}
                onChange={e => updateTask(task.id, { status: e.target.value as Task['status'] })}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-900"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
                <option value="blocked">Blocked</option>
              </select>
              
              <span className={`px-3 py-1 rounded ${
                task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.priority}
              </span>
              
              {task.dueDate && (
                <span className="text-gray-600 dark:text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
