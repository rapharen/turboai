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
            className="rounded-xl h-50 p-4 shadow-sm border border-black/10 flex flex-col cursor-pointer transition-all hover:shadow-md"
            style={{backgroundColor: `var(${colorVar})`}}
        >
            <div className="flex justify-between items-start text-[11px] text-[--color-foreground] mb-2">
        <span className="px-2 py-0.5 font-extrabold">
          {note.date}
        </span>
                <span className="font-medium">{note.category.name}</span>
            </div>
            <h3 className="font-bold text-[17px] mb-2 leading-snug text-[--color-foreground]">
                {note.title}
            </h3>
            <p className="text-[13px] text-[--color-foreground] line-clamp-6 whitespace-pre-line leading-[1.4]">
                {note.content}
            </p>
        </div>
    );
};

export default NoteCard;