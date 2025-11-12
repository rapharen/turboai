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
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const noteIdRef = useRef(noteIdFromUrl);
    const titleRef = useRef(title);
    const contentRef = useRef(content);
    const categoryRef = useRef(selectedCategory);

    useEffect(() => {
        titleRef.current = title;
    }, [title]);
    useEffect(() => {
        contentRef.current = content;
    }, [content]);
    useEffect(() => {
        categoryRef.current = selectedCategory;
    }, [selectedCategory]);

    useEffect(() => {
        if (noteIdFromUrl && noteIdFromUrl !== 'new') {
            getNoteById(noteIdFromUrl)
                .then(note => {
                    setTitle(note.title);
                    setContent(note.content);
                    setSelectedCategory(note.category);
                    setLastUpdated(note.last_updated);
                })
                .finally(() => {
                    setIsInitialLoad(false);
                });
        } else {
            setIsInitialLoad(false);
        }
    }, [noteIdFromUrl, getNoteById]);

    useEffect(() => {
        if (noteIdFromUrl === 'new' && categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]);
        }
    }, [noteIdFromUrl, categories, selectedCategory]);

    const performSave = useCallback(async (isClosing = false) => {
        if (isSaving) return;

        const currentCategory = categoryRef.current;
        if (!currentCategory) return;

        const currentTitle = titleRef.current;
        const currentContent = contentRef.current;

        if (noteIdRef.current === 'new' && !currentTitle && !currentContent && !isClosing) {
            return;
        }

        setIsSaving(true);
        const noteData = {title: currentTitle, content: currentContent, category_id: currentCategory.id};

        try {
            if (noteIdRef.current === 'new') {
                const newNote = await createNote(noteData);
                noteIdRef.current = newNote.id;
                setLastUpdated(newNote.last_updated);
                router.replace(`/notes/${newNote.id}`, {scroll: false});
            } else if (noteIdRef.current) {
                const updatedNote = await updateNote(noteIdRef.current, noteData);
                setLastUpdated(updatedNote.last_updated);
            }
        } finally {
            setIsSaving(false);
        }
    }, [createNote, updateNote, router, isSaving]);

    useEffect(() => {
        if (isInitialLoad) return;
        const handler = setTimeout(() => {
            performSave();
        }, 1500);

        return () => {
            clearTimeout(handler);
        };
    }, [title, content, performSave, isInitialLoad]);

    const handleCategoryChange = async (category: Category) => {
        setSelectedCategory(category);
        if (noteIdRef.current && noteIdRef.current !== 'new') {
            setIsSaving(true);
            try {
                const updatedNote = await updateNote(noteIdRef.current, {category_id: category.id});
                setLastUpdated(updatedNote.last_updated);
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleClose = async () => {
        await performSave(true);
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
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing..."
                        className="bg-transparent text-lg text-[--color-foreground] placeholder:text-[--color-foreground]/70 focus:outline-none flex-1 resize-none"
                    />
                    <div className="flex justify-end mt-6">
                        {isSaving && <span className="text-sm text-[--color-foreground]/70">Saving...</span>}
                    </div>
                </div>
            </div>
        </main>
    );
}