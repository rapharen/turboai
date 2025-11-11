"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CategoryDropdown from '@/components/CategoryDropdown';
import { Note } from '@/components/NoteCard';

// Mock data - this would come from your API
const categories = {
  random: { name: 'Random Thoughts', color: 'bg-[--color-cat-random]' },
  school: { name: 'School', color: 'bg-[--color-cat-school]' },
  personal: { name: 'Personal', color: 'bg-[--color-cat-personal]' },
};
const mockNotes: Note[] = [
  { id: '1', title: 'Grocery List', content: '• Milk\n• Eggs\n• Bread', category: categories.random, date: 'today' },
  { id: '2', title: 'Meeting with Team', content: 'Discuss project timeline and milestones.', category: categories.school, date: 'yesterday' },
];

export default function NoteEditorPage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(Object.values(categories)[0]);

  useEffect(() => {
    if (noteId && noteId !== 'new') {
      const noteToEdit = mockNotes.find(n => n.id === noteId);
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
        setSelectedCategory(noteToEdit.category);
      }
    }
  }, [noteId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12">
      <div className={`${selectedCategory.color} w-full max-w-5xl h-[85vh] rounded-2xl shadow-lg p-6 flex flex-col relative ring-1 ring-black/10`}>
        {/* Close Button */}
        <button onClick={() => router.push('/notes')} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <CategoryDropdown 
              categories={Object.values(categories)}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <span className="text-xs text-[--color-foreground]/80">Last Edited: July 21, 2024 at 8:39pm</span>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="bg-transparent text-2xl font-bold text-[--color-foreground] placeholder:text-[--color-foreground]/50 focus:outline-none mb-4"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Pour your heart out..."
            className="flex-1 bg-transparent text-[--color-foreground]/90 placeholder:text-[--color-foreground]/60 focus:outline-none resize-none text-base"
          />

          {/* Voice Transcription Button */}
          <div className="flex justify-end mt-4">
            <button className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
