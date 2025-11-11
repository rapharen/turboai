"use client";

import React, {useState, useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import CategoryDropdown from '@/components/CategoryDropdown';
import {Note} from "@/types/note";
import {getCategoryColorVar} from "@/utils/utils";

const categories = {
    random: {name: 'Random Thoughts', color: 'bg-[--color-cat-random]'},
    school: {name: 'School', color: 'bg-[--color-cat-school]'},
    personal: {name: 'Personal', color: 'bg-[--color-cat-personal]'},
};

const mockNotes: Note[] = [
    {id: '1', title: 'Grocery List', content: '• Milk\n• Eggs\n• Bread', category: categories.random, date: 'today'},
    {
        id: '2',
        title: 'Meeting with Team',
        content: 'Discuss project timeline and milestones.',
        category: categories.school,
        date: 'yesterday'
    },
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

    const colorVar = getCategoryColorVar(selectedCategory.color);

    return (
        <main className="flex min-h-screen items-center justify-center p-8 bg-[--color-background]">
            <div
                className="w-full max-w-6xl h-[88vh] rounded-2xl shadow-lg p-8 flex flex-col relative border border-black/10"
                style={{backgroundColor: `var(${colorVar})`}}
            >
                <button
                    onClick={() => router.push('/notes')}
                    className="absolute top-6 right-6 text-[--color-foreground]/60 hover:text-[--color-foreground] transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <CategoryDropdown
                            categories={Object.values(categories)}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                        <span className="text-[11px] text-[--color-foreground]/60">
              Last Edited: July 21, 2024 at 8:39pm
            </span>
                    </div>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="bg-transparent text-[28px] font-bold text-[--color-foreground] placeholder:text-[--color-foreground]/40 focus:outline-none mb-5"
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Pour your heart out..."
                        className="flex-1 bg-transparent text-[15px] text-[--color-foreground]/90 placeholder:text-[--color-foreground]/40 focus:outline-none resize-none leading-relaxed"
                    />

                    <div className="flex justify-end mt-4">
                        <button
                            className="w-12 h-12 bg-[--color-foreground] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[--color-foreground]/90 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"/>
                                <path
                                    d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}