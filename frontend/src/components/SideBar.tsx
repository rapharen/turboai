import {useSearchParams} from "next/navigation";
import {useMemo} from "react";
import Link from "next/link";
import {Category} from "@/types/category";
import {Note} from "@/types/note";

interface SidebarProps {
    notes: Note[]
    categories: Category[]
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
        <aside className="w-[213px] bg-[--color-background] flex-shrink-0">
            <div className="pt-6 pb-6">
                <Link
                    href="/notes"
                    className="block px-6 mb-4 hover:opacity-80 transition-opacity"
                >
                    <h2 className={`text-base text-[--color-foreground] ${!activeCategory ? 'font-semibold' : 'font-normal'}`}>
                        All Categories
                    </h2>
                </Link>
                <ul className="space-y-1 px-4">
                    {categories.map(cat => (
                        <li key={cat.name}>
                            <Link
                                href={`/notes?category=${cat.name}`}
                                className={`
                                    flex items-center justify-between 
                                    py-2 px-2 rounded-lg 
                                    transition-colors
                                    ${activeCategory === cat.name
                                    ? 'bg-[--color-foreground]/5 text-[--color-foreground] font-medium'
                                    : 'text-[--color-foreground]/70 hover:bg-[--color-foreground]/5'
                                }
                                `}
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{backgroundColor: `var(${cat.color.replace('bg-[', '').replace(']', '')})`}}
                                    ></span>
                                    <span className="text-sm">{cat.name}</span>
                                </div>
                                <span className="text-xs text-[--color-foreground]/50">
                                    {categoryCounts[cat.name] || 0}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;