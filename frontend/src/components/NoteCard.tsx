import React from 'react';
import {Note} from "@/types/note";
import {getCategoryColorVar} from "@/utils/utils";

interface NoteCardProps {
    note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({note}) => {

    const colorVar = getCategoryColorVar(note.category.color);

    return (
        <div
            className="rounded-2xl p-5 aspect-square shadow-md ring-1 ring-black/10 flex flex-col cursor-pointer transition-shadow hover:shadow-lg"
            style={{backgroundColor: `var(${colorVar})`}}
        >
            <div className="flex items-center gap-2 text-xs text-[--color-foreground]/90 mb-3">
                <span className="lowercase font-semibold tracking-wide">{note.date}</span>
                <span className="font-medium">{note.category.name}</span>
            </div>
            <h3 className="font-semibold text-2xl mb-3 leading-snug text-[--color-foreground]">
                {note.title}
            </h3>
            <p className="text-sm text-[--color-foreground]/95 whitespace-pre-line leading-relaxed">
                {note.content}
            </p>
        </div>
    );
};

export default NoteCard;