import {useSearchParams, useRouter} from "next/navigation";
import {useMemo} from "react";
import Link from "next/link";
import {Category} from "@/types/category";
import {Note} from "@/types/note";
import {useAuth} from '@/context/AuthContext';

interface SidebarProps {
    notes: Note[]
    categories: Category[]
}

const Sidebar = ({notes, categories}: SidebarProps) => {
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category_id');
    const {logout} = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const categoryCounts = useMemo(() => {
        return notes.reduce((acc, note) => {
            acc[note.category.id] = (acc[note.category.id] || 0) + 1;
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
                        <li key={cat.id}>
                            <Link
                                href={`/notes?category_id=${cat.id}`}
                                className={`
                                    flex items-center justify-between 
                                    py-2 px-2 rounded-lg 
                                    transition-colors
                                    ${activeCategory === cat.id
                                    ? 'text-[--color-foreground] font-medium'
                                    : 'text-[--color-foreground]/70 hover:bg-[--color-accent]/10'
                                }
                                `}
                                style={activeCategory === cat.id ? {backgroundColor: 'var(--color-accent)'} : undefined}
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{backgroundColor: cat.color}}
                                    ></span>
                                    <span className="text-sm">{cat.name}</span>
                                </div>
                                <span className="text-xs font-bold text-[--color-foreground]/50">
                                    {categoryCounts[cat.id] || 0}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-[--color-foreground]/70 hover:bg-[--color-accent]/10 py-2 px-2 rounded-lg transition-colors">
                    Logout
                </button>
            </div>

        </aside>
    );
};

export default Sidebar;