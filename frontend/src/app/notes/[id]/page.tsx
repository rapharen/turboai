"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CategoryDropdown from '@/components/CategoryDropdown';
import useNotes from '@/hooks/useNotes';
import useCategories from '@/hooks/useCategories';
import { Category } from '@/types/category';

export default function NoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const noteId = Array.isArray(params.id) ? params.id[0] : params.id;
    const isNewNote = noteId === 'new';

    const { getNoteById, createNote, updateNote } = useNotes();
    const { categories, loading: loadingCategories } = useCategories();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(!isNewNote);

    useEffect(() => {
        if (!isNewNote && noteId) {
            getNoteById(noteId)
                .then(note => {
                    setTitle(note.title);
                    setContent(note.content);
                    setSelectedCategory(note.category);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [noteId, isNewNote, getNoteById]);

    useEffect(() => {
        if (isNewNote && categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]);
        }
    }, [isNewNote, categories, selectedCategory]);

    const handleSave = async () => {
        if (!selectedCategory) return;

        const noteData = {
            title,
            content,
            category_id: selectedCategory.id,
        };

        if (isNewNote) {
            await createNote(noteData);
        } else if (noteId) {
            await updateNote(noteId, noteData);
        }
        router.push('/');
    };

    if (loading || loadingCategories) return <div>Loading...</div>;

    return (
        <main className="flex min-h-screen items-center justify-center p-8 bg-[--color-background]">
            <div className="w-full max-w-6xl relative">
                <div className="flex justify-between items-center mb-3 px-2">
                    {selectedCategory && (
                        <CategoryDropdown
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                    )}
                    <button
                        onClick={() => router.push('/')}
                        className="text-[--color-foreground]/60 hover:text-[--color-foreground] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div
                    className="w-full min-h-[82vh] rounded-2xl shadow-lg p-8 flex flex-col border border-black/10"
                    style={{ backgroundColor: selectedCategory?.color || '#FFFFFF' }}
                >
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="bg-transparent text-3xl font-semibold text-[--color-foreground] placeholder:text-[--color-foreground]/50 focus:outline-none mb-6"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing..."
                        className="bg-transparent text-lg text-[--color-foreground] placeholder:text-[--color-foreground]/70 focus:outline-none flex-1 resize-none"
                    />
                    <div className="flex justify-end mt-6">
                        <button onClick={handleSave} className="bg-[--color-foreground] text-white py-2 px-6 rounded-full font-medium">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}