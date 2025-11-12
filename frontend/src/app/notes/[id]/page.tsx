"use client";

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useParams, useRouter} from 'next/navigation';
import CategoryDropdown from '@/components/CategoryDropdown';
import useNotes from '@/hooks/useNotes';
import useCategories from '@/hooks/useCategories';
import {Category} from '@/types/category';
import {formatDetailedDate} from '@/utils/date';

export default function NoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const noteIdFromUrl = Array.isArray(params.id) ? params.id[0] : params.id;

    const {getNoteById, createNote, updateNote} = useNotes();
    const {categories, loading: loadingCategories} = useCategories();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [loading, setLoading] = useState(noteIdFromUrl !== 'new');
    const [isSaving, setIsSaving] = useState(false);

    const currentNoteIdRef = useRef(noteIdFromUrl);

    const isInitialLoadRef = useRef(true);

    useEffect(() => {
        if (noteIdFromUrl && noteIdFromUrl !== 'new') {
            setLoading(true);
            getNoteById(noteIdFromUrl)
                .then(note => {
                    setTitle(note.title);
                    setContent(note.content);
                    setSelectedCategory(note.category);
                    setLastUpdated(note.last_updated);
                    currentNoteIdRef.current = note.id;
                })
                .catch(err => {
                    console.error('Error loading note:', err);
                    router.push('/');
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        isInitialLoadRef.current = false;
                    }, 500);
                });
        } else {
            isInitialLoadRef.current = false;
        }
    }, [noteIdFromUrl]);

    useEffect(() => {
        if (noteIdFromUrl === 'new' && categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]);
        }
    }, [noteIdFromUrl, categories, selectedCategory]);

    const saveNote = useCallback(async () => {
        if (isSaving || isInitialLoadRef.current) return;

        if (!selectedCategory) return;

        if (currentNoteIdRef.current === 'new' && !title.trim() && !content.trim()) {
            return;
        }

        setIsSaving(true);
        const noteData = {
            title: title.trim(),
            content: content.trim(),
            category_id: selectedCategory.id
        };

        try {
            if (currentNoteIdRef.current === 'new') {
                const newNote = await createNote(noteData);
                currentNoteIdRef.current = newNote.id;
                setLastUpdated(newNote.last_updated);
                window.history.replaceState(null, '', `/notes/${newNote.id}`);
            } else if (currentNoteIdRef.current) {
                const updatedNote = await updateNote(currentNoteIdRef.current, noteData);
                setLastUpdated(updatedNote.last_updated);
            }
        } catch (err) {
            console.error('Error saving note:', err);
        } finally {
            setIsSaving(false);
        }
    }, [title, content, selectedCategory, createNote, updateNote, isSaving]);

    useEffect(() => {
        if (isInitialLoadRef.current) return;

        if (!title.trim() && !content.trim()) return;

        const timer = setTimeout(() => {
            saveNote();
        }, 15000);

        return () => clearTimeout(timer);
    }, [title, content]);

    const handleCategoryChange = useCallback(async (category: Category) => {
        setSelectedCategory(category);

        if (currentNoteIdRef.current && currentNoteIdRef.current !== 'new') {
            setIsSaving(true);
            try {
                const updatedNote = await updateNote(currentNoteIdRef.current, {
                    category_id: category.id
                });
                setLastUpdated(updatedNote.last_updated);
            } catch (err) {
                console.error('Error updating category:', err);
            } finally {
                setIsSaving(false);
            }
        }
    }, []);

    const handleClose = useCallback(async () => {
        await saveNote();
        router.push('/');
    }, [saveNote, router]);

    if (loading || loadingCategories) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[--color-background]">
                <div className="text-[--color-foreground]">Loading...</div>
            </div>
        );
    }

    if (!selectedCategory) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[--color-background]">
                <div className="text-[--color-foreground]">Loading categories...</div>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-8 bg-[--color-background]">
            <div className="w-full max-w-6xl relative">
                <div className="flex justify-between items-center mb-3 px-2">
                    <CategoryDropdown
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryChange}
                    />
                    <button
                        onClick={handleClose}
                        disabled={isSaving}
                        className="text-[--color-foreground]/60 hover:text-[--color-foreground] transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div
                    className="w-full min-h-[82vh] rounded-2xl shadow-lg p-8 flex flex-col border border-black/10"
                    style={{backgroundColor: selectedCategory.color}}
                >
                    <div className="flex justify-between items-center mb-6">
                        {isSaving && (
                            <span className="text-[11px] text-[--color-foreground]/60">
                                Saving...
                            </span>
                        )}
                        <div className="flex-1"></div>
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
                        className="bg-transparent text-[28px] font-bold text-[--color-foreground] placeholder:text-[--color-foreground]/40 focus:outline-none mb-4"
                        disabled={isSaving}
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Pour your heart out..."
                        className="flex-1 bg-transparent text-[15px] text-[--color-foreground]/90 placeholder:text-[--color-foreground]/40 focus:outline-none resize-none leading-relaxed mb-4"
                        disabled={isSaving}
                    />
                </div>
            </div>
        </main>
    );
}