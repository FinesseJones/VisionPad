import React, { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';
import { Task } from '../types';

export const GanttChart: React.FC = () => {
  const { tasks, updateTask } = useTasks();
  const [viewMonths, setViewMonths] = useState(3);

  const getMonthColumns = () => {
    const cols = [];
    const today = new Date();
    for (let i = 0; i < viewMonths; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      cols.push({
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        days: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
      });
    }
    return cols;
  };

  const getTaskPosition = (task: Task) => {
    if (!task.dueDate) return null;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const daysDiff = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = viewMonths * 30;
    return Math.max(0, Math.min(100, (daysDiff / totalDays) * 100));
  };

  const monthColumns = getMonthColumns();
  const sortedTasks = [...tasks].sort((a, b) => 
    (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) - 
    (b.dueDate ? new Date(b.dueDate).getTime() : Infinity)
  );

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Gantt Chart</h1>
        <div className="flex gap-4 mb-4">
          <select
            value={viewMonths}
            onChange={e => setViewMonths(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg dark:bg-gray-800"
          >
            <option value={3}>3 Months</option>
            <option value={6}>6 Months</option>
            <option value={12}>12 Months</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-[200px_1fr] border-b dark:border-gray-700">
            <div className="p-4 font-semibold bg-gray-100 dark:bg-gray-700">Task</div>
            <div className="grid" style={{ gridTemplateColumns: `repeat(${viewMonths}, 1fr)` }}>
              {monthColumns.map((col, i) => (
                <div key={i} className="p-4 text-center font-semibold bg-gray-100 dark:bg-gray-700 border-l dark:border-gray-600">
                  {col.month} {col.year}
                </div>
              ))}
            </div>
          </div>

          {sortedTasks.map(task => {
            const position = getTaskPosition(task);
            return (
              <div key={task.id} className="grid grid-cols-[200px_1fr] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="p-4 truncate">{task.title}</div>
                <div className="relative p-4" style={{ gridTemplateColumns: `repeat(${viewMonths}, 1fr)` }}>
                  {position !== null && (
                    <div
                      className={`absolute h-8 rounded ${
                        task.status === 'done' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-blue-500' :
                        task.status === 'blocked' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`}
                      style={{ left: `${position}%`, width: '10%', top: '50%', transform: 'translateY(-50%)' }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
