import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { Note, Folder } from '../types';

interface NotesContextType {
  notes: Note[];
  folders: Folder[];
  activeNote: Note | null;
  loading: boolean;
  createNote: (title: string, folderId?: string) => Promise<Note>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setActiveNote: (note: Note | null) => void;
  createFolder: (name: string, parentId?: string) => Promise<void>;
  searchNotes: (query: string) => Note[];
  getNotesByTag: (tag: string) => Note[];
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadNotes();
      loadFolders();
    } else {
      setNotes([]);
      setFolders([]);
      setLoading(false);
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    
    if (!error && data) {
      setNotes(data.map(n => ({
        id: n.id,
        title: n.title,
        content: n.content || '',
        tags: n.tags || [],
        links: n.links || [],
        backlinks: [],
        folderId: n.notebook_id,
        createdAt: new Date(n.created_at),
        updatedAt: new Date(n.updated_at),
        isFavorite: n.is_favorite
      })));
    }
    setLoading(false);
  };

  const loadFolders = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('notebooks')
      .select('*')
      .eq('user_id', user.id);
    
    if (!error && data) {
      setFolders(data.map(f => ({
        id: f.id,
        name: f.title,
        parentId: f.parent_id
      })));
    }
  };

  const createNote = async (title: string, folderId?: string) => {
    if (!user) throw new Error('No user');
    
    const { data, error } = await supabase
      .from('notes')
      .insert({
        user_id: user.id,
        title,
        content: '',
        notebook_id: folderId || null,
        tags: [],
        links: []
      })
      .select()
      .single();
    
    if (error) throw error;
    
    const note: Note = {
      id: data.id,
      title: data.title,
      content: data.content || '',
      tags: data.tags || [],
      links: data.links || [],
      backlinks: [],
      folderId: data.notebook_id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      isFavorite: data.is_favorite
    };
    
    setNotes(prev => [note, ...prev]);
    return note;
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('notes')
      .update({
        title: updates.title,
        content: updates.content,
        tags: updates.tags,
        links: updates.links,
        is_favorite: updates.isFavorite,
        notebook_id: updates.folderId,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (!error) {
      setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date() } : n));
    }
  };

  const deleteNote = async (id: string) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setNotes(prev => prev.filter(n => n.id !== id));
      if (activeNote?.id === id) setActiveNote(null);
    }
  };

  const createFolder = async (name: string, parentId?: string) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('notebooks')
      .insert({
        user_id: user.id,
        title: name,
        parent_id: parentId || null
      })
      .select()
      .single();
    
    if (!error && data) {
      setFolders(prev => [...prev, { id: data.id, name: data.title, parentId: data.parent_id }]);
    }
  };

  const searchNotes = (query: string) => {
    return notes.filter(n => 
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getNotesByTag = (tag: string) => {
    return notes.filter(n => n.tags.includes(tag));
  };

  return (
    <NotesContext.Provider value={{
      notes, folders, activeNote, loading, createNote, updateNote, deleteNote,
      setActiveNote, createFolder, searchNotes, getNotesByTag
    }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within NotesProvider');
  return context;
};
