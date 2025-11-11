import React from 'react';
import {Note} from "@/types/note";

interface NoteCardProps {
    note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({note}) => {
    const getCategoryColorVar = (color: string) => {
        const match = color.match(/bg-\[(--color-cat-\w+)]/);
        return match ? match[1] : '--color-cat-random';
    };

    const colorVar = getCategoryColorVar(note.category.color);

    return (
        <div
            className="rounded-2xl h-64 p-5 shadow-sm border border-black/5 flex flex-col cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]"
            style={{backgroundColor: `var(${colorVar})`}}
        >
            <div className="flex justify-between items-center text-xs text-[--color-foreground]/70 mb-3 font-medium">
        <span className="px-3 py-1 rounded-full bg-white/50 border border-black/10">
          {note.date}
        </span>
                <span>{note.category.name}</span>
            </div>
            <h3 className="font-bold text-lg mb-2 leading-tight text-[--color-foreground]">
                {note.title}
            </h3>
            <p className="text-sm text-[--color-foreground]/80 line-clamp-5 whitespace-pre-line leading-relaxed">
                {note.content}
            </p>
        </div>
    );
};

export default NoteCard;