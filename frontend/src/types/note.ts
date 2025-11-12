import {Category} from "@/types/category";

export interface Note {
    id: string;
    title: string;
    content: string;
    category: Category;
    category_id: string;
    last_updated: string;
}