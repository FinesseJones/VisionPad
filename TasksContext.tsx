import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { Task, Project } from '../types';

interface TasksContextType {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  createProject: (name: string, description: string, color: string) => Promise<void>;
  getTasksByStatus: (status: Task['status']) => Task[];
  getTasksByProject: (projectId: string) => Task[];
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
      setProjects([]);
      setLoading(false);
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setTasks(data.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description || '',
        status: t.status as Task['status'],
        priority: t.priority as Task['priority'],
        dueDate: t.due_date ? new Date(t.due_date) : undefined,
        tags: t.tags || [],
        noteId: t.note_id,
        projectId: undefined,
        subtasks: [],
        createdAt: new Date(t.created_at),
        updatedAt: new Date(t.updated_at)
      })));
    }

    setLoading(false);
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        due_date: taskData.dueDate?.toISOString(),
        tags: taskData.tags || [],
        note_id: taskData.noteId
      })
      .select()
      .single();
    
    if (!error && data) {
      const task: Task = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        status: data.status as Task['status'],
        priority: data.priority as Task['priority'],
        dueDate: data.due_date ? new Date(data.due_date) : undefined,
        tags: data.tags || [],
        noteId: data.note_id,
        projectId: undefined,
        subtasks: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };

      setTasks(prev => [task, ...prev]);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('tasks')
      .update({
        title: updates.title,
        description: updates.description,
        status: updates.status,
        priority: updates.priority,
        due_date: updates.dueDate?.toISOString(),
        tags: updates.tags,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (!error) {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t));
    }

  };

  const deleteTask = async (id: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const createProject = async (name: string, description: string, color: string) => {
    const project: Project = {
      id: Date.now().toString(),
      name,
      description,
      color,
      tasks: [],
      createdAt: new Date()
    };
    setProjects(prev => [...prev, project]);
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(t => t.status === status);
  };

  const getTasksByProject = (projectId: string) => {
    return tasks.filter(t => t.projectId === projectId);
  };

  return (
    <TasksContext.Provider value={{
      tasks, projects, loading, createTask, updateTask, deleteTask,
      createProject, getTasksByStatus, getTasksByProject
    }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks must be used within TasksProvider');
  return context;
};
