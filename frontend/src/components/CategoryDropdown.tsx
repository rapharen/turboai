"use client";

import React, {useState, useRef, useEffect} from 'react';
import {Category} from '@/types/category';

interface CategoryDropdownProps {
    categories: Category[];
    selectedCategory: Category;
    onSelectCategory: (category: Category) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({categories, selectedCategory, onSelectCategory}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (category: Category) => {
        onSelectCategory(category);
        setIsOpen(false);
    };


    return (
        <div className="relative w-48" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-3 py-2 bg-white/60 border border-[--color-foreground]/20 rounded-lg hover:bg-white/80 transition-colors"
            >
                <div className="flex items-center gap-2">
          <span
              className="w-2.5 h-2.5 rounded-full"
              style={{backgroundColor: selectedCategory.color}}
          ></span>
                    <span className="text-sm text-[--color-foreground] font-medium">{selectedCategory.name}</span>
                </div>
                <svg
                    className={`w-4 h-4 transition-transform text-[--color-foreground] ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
            </button>

            {isOpen && (
                <div
                    className="absolute z-10 w-full mt-2 bg-white border border-[--color-foreground]/20 rounded-lg shadow-xl">
                    <ul className="py-1">
                        {categories.map(category => (
                            <li
                                key={category.id}
                                onClick={() => handleSelect(category)}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-[--color-background] cursor-pointer transition-colors"
                            >
                <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{backgroundColor: category.color}}
                ></span>
                                <span className="text-sm text-[--color-foreground]">{category.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;