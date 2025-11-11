import {Note} from "@/components/NoteCard";
import {useSearchParams} from "next/navigation";
import {useMemo} from "react";
import Link from "next/link";

interface SidebarProps {
    notes: Note[]
    categories: {
        name: string;
        color: string;
    }[]
}

const Sidebar = ({notes, categories}: SidebarProps) => {
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

export default Sidebar;