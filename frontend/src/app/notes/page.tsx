"use client";

import Image from 'next/image';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useState, useMemo} from 'react';
import Button from '@/components/Button';
import NoteCard from '@/components/NoteCard';
import Sidebar from "@/components/SideBar";
import {Category} from "@/types/category";
import {Note} from "@/types/note";

const categories: Category[] = [
    {name: 'Random Thoughts', color: 'bg-[--color-cat-random]'},
    {name: 'School', color: 'bg-[--color-cat-school]'},
    {name: 'Personal', color: 'bg-[--color-cat-personal]'},
];

const mockNotes: Note[] = [
    {id: '1', title: 'Grocery List', content: '• Milk\n• Eggs\n• Bread', category: categories[0], date: 'today'},
    {
        id: '2',
        title: 'Meeting with Team',
        content: 'Discuss project timeline and milestones. Review budget and resource allocation.',
        category: categories[1],
        date: 'yesterday'
    },
    {id: '3', title: 'Note Title', content: 'Note content...', category: categories[1], date: 'July 16'},
    {
        id: '4',
        title: 'Vacation ideas',
        content: '• Visit Bali for beaches and culture\n• Explore the historic sites in Rome',
        category: categories[0],
        date: 'July 15'
    },
    {
        id: '5',
        title: 'Note Title',
        content: "Lately, I've been on a quest to discover new books to read.",
        category: categories[2],
        date: 'June 12'
    },
    {
        id: '6',
        title: 'A Deep and Contemplative Personal Reflection on the Multifaceted and Ever-Evolving Journey of Life',
        content: 'Life has been a whirlwind of events and emotions lately.',
        category: categories[0],
        date: 'June 11'
    },
    {
        id: '7',
        title: 'Project X Updates',
        content: 'Finalized design mockups and received approval from stakeholders.',
        category: categories[1],
        date: 'June 10'
    },
];

const EmptyNotes = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Image
            src="/assets/empty-notes-boba.png"
            alt="A cute boba tea character"
            width={200}
            height={200}
            priority
        />
        <p className="mt-6 text-lg text-[--color-link]">
            I'm just here waiting for your Charming notes...
        </p>
    </div>
);

const NoteGrid = ({notes}: { notes: Note[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {notes.map(note => (
            <Link key={note.id} href={`/notes/${note.id}`}>
                <NoteCard note={note}/>
            </Link>
        ))}
    </div>
);

export default function NotesPage() {
    const [notes] = useState(mockNotes);
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category');

    const filteredNotes = useMemo(() => {
        if (!activeCategory) return notes;
        return notes.filter(note => note.category.name === activeCategory);
    }, [notes, activeCategory]);

    const hasNotes = filteredNotes.length > 0;

    return (
        <div className="flex min-h-screen bg-[--color-background]">
            <Sidebar notes={notes} categories={categories}/>
            <main className="flex-1 flex flex-col">
                <div className="flex justify-end items-center py-6 px-8">
                    <Link href="/notes/new">
                        <Button>+ New Note</Button>
                    </Link>
                </div>
                <div className="flex-1 px-8 py-6">
                    {hasNotes ? (
                        <NoteGrid notes={filteredNotes}/>
                    ) : (
                        <EmptyNotes/>
                    )}
                </div>
            </main>
        </div>
    );
}