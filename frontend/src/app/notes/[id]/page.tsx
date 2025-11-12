"use client";

import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useRouter} from 'next/navigation';
import CategoryDropdown from '@/components/CategoryDropdown';
import useNotes from '@/hooks/useNotes';
import useCategories from '@/hooks/useCategories';
import {Category} from '@/types/category';
import {useDebounce} from '@/hooks/useDebounce';
import {formatDetailedDate} from '@/utils/date';
import ReactMarkdown from 'react-markdown';

export default function NoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const noteId = Array.isArray(params.id) ? params.id[0] : params.id;
    const isNewNote = noteId === 'new';

    const {getNoteById, createNote, updateNote} = useNotes();
    const {categories, loading: loadingCategories} = useCategories();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [loading, setLoading] = useState(!isNewNote);
    const [isSaving, setIsSaving] = useState(false);

    const debouncedTitle = useDebounce(title, 500);
    const debouncedContent = useDebounce(content, 500);

    useEffect(() => {
        if (!isNewNote && noteId) {
            getNoteById(noteId)
                .then(note => {
                    setTitle(note.title);
                    setContent(note.content);
                    setSelectedCategory(note.category);
                    setLastUpdated(note.last_updated);
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

    const performSave = useCallback(async () => {
        if (isNewNote || !noteId || !selectedCategory) return;
        setIsSaving(true);
        const noteData = {title, content, category_id: selectedCategory.id};
        const updatedNote = await updateNote(noteId, noteData);
        setLastUpdated(updatedNote.last_updated);
        setIsSaving(false);
    }, [noteId, title, content, selectedCategory, isNewNote, updateNote]);

    useEffect(() => {
        if (isNewNote || loading) return;
        const handler = setTimeout(() => {
            performSave();
        }, 1500);

        return () => {
            clearTimeout(handler);
        };
    }, [title, content, performSave, isNewNote, loading]);

    const handleCategoryChange = async (category: Category) => {
        setSelectedCategory(category);
        if (!isNewNote && noteId) {
            setIsSaving(true);
            const updatedNote = await updateNote(noteId, {category_id: category.id});
            setLastUpdated(updatedNote.last_updated);
            setIsSaving(false);
        }
    };

    const handleClose = async () => {
        await performSave();
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
                            onSelectCategory={handleCategoryChange}
                        />
                    )}
                    <button
                        onClick={handleClose}
                        className="text-[--color-foreground]/60 hover:text-[--color-foreground] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div
                    className="w-full min-h-[82vh] rounded-2xl shadow-lg p-8 flex flex-col border border-black/10"
                    style={{backgroundColor: selectedCategory?.color || '#FFFFFF'}}
                >
                    <div className="flex justify-end mb-6">
                        {lastUpdated && (
                            <span className="text-[11px] text-[--color-foreground]/60">
                                Last Edited: {formatDetailedDate(lastUpdated)}
                            </span>
                        )}
                    </div>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="bg-transparent text-3xl font-semibold text-[--color-foreground] placeholder:text-[--color-foreground]/50 focus:outline-none mb-6"
                    />
                    <div className="flex-1 grid grid-cols-2 gap-8">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start writing in Markdown..."
                            className="bg-transparent text-lg text-[--color-foreground] placeholder:text-[--color-foreground]/70 focus:outline-none resize-none"
                        />
                        <div className="prose prose-lg max-w-none text-[--color-foreground]">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        {isSaving && <span className="text-sm text-[--color-foreground]/70">Saving...</span>}
                    </div>
                </div>
            </div>
        </main>
    );
}