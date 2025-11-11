import React, { useState, useEffect } from 'react';
import CategoryDropdown, { Category } from './CategoryDropdown';
import { Note } from './NoteCard';

interface NoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteToEdit?: Note | null;
  categories: Category[];
}

const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ isOpen, onClose, noteToEdit, categories }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setSelectedCategory(noteToEdit.category);
    } else {
      // Reset for new note
      setTitle('');
      setContent('');
      setSelectedCategory(categories[0]);
    }
  }, [noteToEdit, isOpen, categories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
      <div className="bg-[--background] rounded-2xl shadow-xl w-full max-w-5xl h-[85vh] flex flex-col p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Editor Area */}
        <div className={`${selectedCategory.color} flex-1 rounded-xl p-6 flex flex-col ring-1 ring-black/10`}
        >
          <div className="flex justify-between items-center mb-4">
            <CategoryDropdown 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <span className="text-xs text-gray-700/80">Last Edited: July 21, 2024 at 8:39pm</span>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="bg-transparent text-2xl font-bold placeholder:text-gray-700/50 focus:outline-none mb-4"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Pour your heart out..."
            className="flex-1 bg-transparent placeholder:text-gray-700/60 focus:outline-none resize-none"
          />

          {/* Voice Transcription Button */}
          <div className="flex justify-end mt-4">
            <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center shadow">
              {/* Placeholder for Mic Icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditorModal;
