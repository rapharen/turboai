"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Button from '@/components/Button';
import NoteCard, { Note } from '@/components/NoteCard';

const categories = {
  random: { name: 'Random Thoughts', color: 'bg-[--color-cat-random]' },
  school: { name: 'School', color: 'bg-[--color-cat-school]' },
  personal: { name: 'Personal', color: 'bg-[--color-cat-personal]' },
};

// Mock data - we'll replace this with API data later
const mockNotes: Note[] = [
  { id: '1', title: 'Grocery List', content: '• Milk\n• Eggs\n• Bread', category: categories.random, date: 'today' },
  { id: '2', title: 'Meeting with Team', content: 'Discuss project timeline and milestones. Review budget and resource allocation.', category: categories.school, date: 'yesterday' },
  { id: '3', title: 'Note Title', content: 'Note content...', category: categories.school, date: 'July 16' },
  { id: '4', title: 'Vacation ideas', content: '• Visit Bali for beaches and culture\n• Explore the historic sites in Rome', category: categories.random, date: 'July 15' },
  { id: '5', title: 'Note Title', content: 'Lately, I’ve been on a quest to discover new books to read.', category: categories.personal, date: 'June 12' },
  { id: '6', title: 'A Deep and Contemplative...', content: 'Life has been a whirlwind of events and emotions lately.', category: categories.random, date: 'June 11' },
  { id: '7', title: 'Project X Updates', content: 'Finalized design mockups and received approval from stakeholders.', category: categories.school, date: 'June 10' },
];

const Sidebar = ({ notes }: { notes: Note[] }) => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const categoryCounts = useMemo(() => {
    return notes.reduce((acc, note) => {
      acc[note.category.name] = (acc[note.category.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [notes]);

  return (
    <aside className="w-[280px] p-8 flex-shrink-0 border-r border-gray-200">
      <h2 className="text-xl font-medium text-center mb-8">All Categories</h2>
      <ul>
        <li className="mb-2">
          <Link 
            href="/notes" 
            className={`flex items-center justify-between py-2 px-4 rounded-lg hover:bg-gray-100 ${!activeCategory ? 'font-medium bg-gray-100' : 'text-gray-700'}`}
          >
            <span>View All</span>
            <span className="text-sm text-gray-500">{notes.length}</span>
          </Link>
        </li>
        {Object.values(categories).map(cat => (
          <li key={cat.name} className="mb-2">
            <Link
              href={`/notes?category=${cat.name}`}
              className={`flex items-center justify-between py-2 px-4 rounded-lg hover:bg-gray-100 ${activeCategory === cat.name ? 'font-medium bg-gray-100' : 'text-gray-700'}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
                {cat.name}
              </div>
              <span className="text-sm text-gray-500">{categoryCounts[cat.name] || 0}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const EmptyNotes = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Image
      src="/assets/empty-notes-boba.png" // Make sure you've placed this asset here
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

const NoteGrid = ({ notes }: { notes: Note[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {notes.map(note => (
      <Link key={note.id} href={`/notes/${note.id}`} className="cursor-pointer">
        <NoteCard note={note} />
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
    <div className="flex min-h-screen">
      <Sidebar notes={notes} />
      <main className="flex-1 p-8 relative">
        <div className="absolute top-8 right-8">
          <Link href="/notes/new">
            <Button>+ New Note</Button>
          </Link>
        </div>
        {hasNotes ? (
          <NoteGrid notes={filteredNotes} />
        ) : (
          <EmptyNotes />
        )}
      </main>
    </div>
  );
}
