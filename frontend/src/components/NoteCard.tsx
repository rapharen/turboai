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
    <div className={`p-4 rounded-xl shadow-md h-64 flex flex-col ${note.category.color}`}>
      <div className="flex justify-between items-center text-xs text-gray-700/80 mb-2">
        <span>{note.date}</span>
        <span>{note.category.name}</span>
      </div>
      <h3 className="font-bold text-lg mb-2 truncate">{note.title}</h3>
      <p className="text-sm text-gray-800/90 overflow-hidden text-ellipsis">
        {note.content}
      </p>
    </div>
  );
};

export default NoteCard;
