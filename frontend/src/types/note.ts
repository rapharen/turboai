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