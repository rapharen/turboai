"use client";

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/Button';
import NoteCard, { Note } from '@/components/NoteCard';
import NoteEditorModal from '@/components/NoteEditorModal';

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
  const categoryCounts = notes.reduce((acc, note) => {
    acc[note.category.name] = (acc[note.category.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="w-64 p-8">
      <h2 className="text-lg font-semibold mb-4">All Categories</h2>
      <ul>
        {Object.values(categories).map(cat => (
          <li key={cat.name} className="mb-2">
            <a href="#" className="flex items-center justify-between text-[--color-foreground] hover:font-semibold">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                {cat.name}
              </div>
              <span className="text-sm text-gray-500">{categoryCounts[cat.name] || 0}</span>
            </a>
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

const NoteGrid = ({ notes, onNoteClick }: { notes: Note[]; onNoteClick: (note: Note) => void; }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {notes.map(note => (
      <div key={note.id} onClick={() => onNoteClick(note)} className="cursor-pointer">
        <NoteCard note={note} />
      </div>
    ))}
  </div>
);

export default function NotesPage() {
  const [notes, setNotes] = useState(mockNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const handleOpenModal = (note: Note | null) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNoteToEdit(null);
  };

  const hasNotes = notes.length > 0;

  return (
    <div className="flex min-h-screen">
      <Sidebar notes={notes} />
      <main className="flex-1 p-8 relative">
        <div className="absolute top-8 right-8">
          <Button onClick={() => handleOpenModal(null)}>+ New Note</Button>
        </div>
        {hasNotes ? (
          <NoteGrid notes={notes} onNoteClick={handleOpenModal} />
        ) : (
          <EmptyNotes />
        )}
      </main>

      <NoteEditorModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        noteToEdit={noteToEdit || undefined}
        categories={Object.values(categories)}
      />
    </div>
  );
}
