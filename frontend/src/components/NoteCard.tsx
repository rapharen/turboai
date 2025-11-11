import React from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: {
    name: string;
    color: string; // e.g., 'bg-[--color-cat-random]'
  };
  date: string;
}

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div
      className={`
        ${note.category.color}
        rounded-2xl
        h-64
        p-5
        shadow-sm
        ring-1 ring-black/10
        flex flex-col
      `}
    >
      <div className="flex justify-between items-center text-xs text-[--color-foreground]/80 mb-2">
        <span className="px-2 py-0.5 rounded-full bg-white/40 ring-1 ring-black/10">{note.date}</span>
        <span className="text-[--color-foreground]/80">{note.category.name}</span>
      </div>
      <h3 className="font-bold text-lg mb-2 leading-snug text-[--color-foreground]">
        {note.title}
      </h3>
      <p className="text-sm text-[--color-foreground]/90 line-clamp-4">
        {note.content}
      </p>
    </div>
  );
};

export default NoteCard;
