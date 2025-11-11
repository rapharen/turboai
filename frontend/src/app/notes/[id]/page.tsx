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
            <div className="w-full max-w-6xl relative">
                <div className="flex justify-between items-center mb-3 px-2">
                    <CategoryDropdown
                        categories={Object.values(categories)}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                    <button
                        onClick={() => router.push('/notes')}
                        className="text-[--color-foreground]/60 hover:text-[--color-foreground] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div
                    className="w-full min-h-[82vh] rounded-2xl shadow-lg p-8 flex flex-col border border-black/10"
                    style={{backgroundColor: `var(${colorVar})`}}
                >
                    <div className="flex justify-end mb-6">
                        <span className="text-[11px] text-[--color-foreground]/60">
                            Last Edited: July 21, 2024 at 8:39pm
                        </span>
                    </div>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="bg-transparent text-[28px] font-bold text-[--color-foreground] placeholder:text-[--color-foreground]/40 focus:outline-none mb-4"
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Pour your heart out..."
                        className="flex-1 bg-transparent text-[15px] text-[--color-foreground]/90 placeholder:text-[--color-foreground]/40 focus:outline-none resize-none leading-relaxed mb-4"
                    />
                </div>
            </div>
        </main>
    );
}