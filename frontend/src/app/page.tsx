"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import NoteCard from '@/components/NoteCard';
import Sidebar from "@/components/SideBar";
import useCategories from '@/hooks/useCategories';
import useNotes from '@/hooks/useNotes';
import { Note } from "@/types/note";
import PrivateRoute from '@/components/PrivateRoute';

const EmptyNotes = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Image
            src="/assets/empty-notes-boba.png"
            alt="A cute boba tea character"
            width={200}
            height={200}
            priority
        />
        <p className="mt-6 text-lg text-[var(--color-text)]">
            I'm just here waiting for your Charming notes...
        </p>
    </div>
);

const NoteGrid = ({ notes }: { notes: Note[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {notes.map(note => (
            <Link key={note.id} href={`/notes/${note.id}`}>
                <NoteCard note={note} />
            </Link>
        ))}
    </div>
);

function NotesPageContent() {
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') || undefined;

    const { categories, loading: loadingCategories, error: errorCategories } = useCategories();
    const { notes, loading: loadingNotes, error: errorNotes } = useNotes(activeCategory);

    const hasNotes = notes.length > 0;

    if (loadingCategories || loadingNotes) {
        return <div>Loading...</div>;
    }

    if (errorCategories || errorNotes) {
        return <div>Error loading data. Please try again.</div>;
    }

    return (
        <div className="flex min-h-screen bg-[--color-background]">
            <Sidebar notes={notes} categories={categories} />
            <main className="flex-1 flex flex-col">
                <div className="flex justify-end items-center py-6 px-8">
                    <Link href="/notes/new">
                        <Button>+ New Note</Button>
                    </Link>
                </div>
                <div className="flex-1 px-8 py-6">
                    {hasNotes ? (
                        <NoteGrid notes={notes} />
                    ) : (
                        <EmptyNotes />
                    )}
                </div>
            </main>
        </div>
    );
}

export default function HomePage() {
    return (
        <PrivateRoute>
            <NotesPageContent />
        </PrivateRoute>
    );
}
