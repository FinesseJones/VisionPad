import { Note, Task } from '../types';

export const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to VisionPad',
    content: `# Welcome to VisionPad

Your personal knowledge vault and command center is ready!

## Getting Started

- Create notes with **markdown** support
- Use [[wiki links]] to connect ideas
- Add #tags for organization
- Try the command palette with ⌘K

## Features

- **Bi-directional linking**: Connect your thoughts
- **Graph view**: Visualize your knowledge
- **Task management**: Stay organized
- **Multiple views**: Kanban, Calendar, List
- **Dark mode**: Easy on the eyes

Start exploring and building your second brain!`,
    tags: ['welcome', 'guide'],
    links: [],
    backlinks: [],
    folderId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    isFavorite: true
  },
  {
    id: '2',
    title: 'Project Ideas',
    content: `# Project Ideas

## Personal Projects
- Build a knowledge management system
- Create a habit tracker
- Design a portfolio website

## Work Projects
- Q4 planning and goals
- Team collaboration tools
- Process documentation

#projects #planning`,
    tags: ['projects', 'planning'],
    links: [],
    backlinks: [],
    folderId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    isFavorite: false
  }
];

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Explore VisionPad features',
    description: 'Try out all the different views and features',
    status: 'in-progress',
    priority: 'high',
    tags: ['onboarding'],
    subtasks: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Create your first note',
    description: 'Write something meaningful in the editor',
    status: 'done',
    priority: 'medium',
    tags: ['onboarding'],
    subtasks: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
