import React, { useState, useEffect } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { parseWikiLinks, parseTags, renderMarkdownPreview } from '../utils/markdown';

export const MarkdownEditor: React.FC = () => {
  const { activeNote, updateNote, createNote, setActiveNote } = useNotes();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (activeNote) {
      setContent(activeNote.content);
      setTitle(activeNote.title);
    } else {
      const note = createNote('Untitled Note');
      setActiveNote(note);
    }
  }, [activeNote?.id]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (activeNote) {
      const links = parseWikiLinks(newContent);
      const tags = parseTags(newContent);
      updateNote(activeNote.id, { content: newContent, links, tags });
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (activeNote) {
      updateNote(activeNote.id, { title: newTitle });
    }
  };

  if (!activeNote) return null;

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <input
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none focus:outline-none flex-1"
          placeholder="Note title..."
        />
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {showPreview ? (
          <div 
            className="p-8 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(content) }}
          />
        ) : (
          <textarea
            value={content}
            onChange={e => handleContentChange(e.target.value)}
            className="w-full h-full p-8 bg-transparent resize-none focus:outline-none font-mono"
            placeholder="Start writing... Use [[links]] for connections and #tags for organization"
          />
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{content.split(/\s+/).filter(w => w).length} words</span>
          <span>{content.length} characters</span>
          <span>{activeNote.links.length} links</span>
          <span>{activeNote.tags.length} tags</span>
        </div>
      </div>
    </div>
  );
};
