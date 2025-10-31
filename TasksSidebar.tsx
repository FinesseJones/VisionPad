import React, { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';

export const TasksSidebar: React.FC = () => {
  const { tasks, createTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      createTask({
        title: newTaskTitle,
        description: '',
        status: 'todo',
        priority: 'medium',
        tags: [],
        subtasks: []
      });
      setNewTaskTitle('');
    }
  };

  const todayTasks = tasks.filter(t => {
    if (!t.dueDate) return false;
    const today = new Date().toDateString();
    return new Date(t.dueDate).toDateString() === today;
  });

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-4">Quick Tasks</h3>
      
      <div className="mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleCreateTask()}
          placeholder="Add a quick task..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
        />
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Today</h4>
        {todayTasks.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks due today</p>
        ) : (
          <div className="space-y-2">
            {todayTasks.map(task => (
              <div key={task.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                {task.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">All Tasks</h4>
        <div className="space-y-2">
          {tasks.slice(-5).reverse().map(task => (
            <div key={task.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  task.priority === 'urgent' ? 'bg-red-500' :
                  task.priority === 'high' ? 'bg-orange-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                {task.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
