export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  links: string[];
  backlinks: string[];
  folderId: string | null;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  color?: string;
  icon?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  tags: string[];
  noteId?: string;
  projectId?: string;
  subtasks: SubTask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  tasks: string[];
  createdAt: Date;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'note' | 'tag';
  connections: number;
}

export interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

export type ViewMode = 'editor' | 'kanban' | 'calendar' | 'graph' | 'dashboard' | 'list' | 'gantt' | 'spreadsheet' | 'admin';
export type Theme = 'light' | 'dark';

