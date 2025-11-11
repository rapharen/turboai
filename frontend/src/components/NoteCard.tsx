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
            className="rounded-2xl min-h-[180px] p-5 shadow-md flex flex-col cursor-pointer transition-shadow hover:shadow-lg"
            style={{backgroundColor: `var(${colorVar})`}}
        >
            <div className="flex justify-between items-start text-xs text-[--color-foreground]/90 mb-2">
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