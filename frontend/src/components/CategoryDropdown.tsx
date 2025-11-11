import React, { useState, useRef, useEffect } from 'react';

// Assuming categories are passed in this format
export interface Category {
  name: string;
  color: string; // e.g., 'bg-[--color-cat-random]'
}

interface CategoryDropdownProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories, selectedCategory, onSelectCategory }) => {
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
        className="flex items-center justify-between w-full p-2 bg-white/50 border border-[--color-accent] rounded-lg"
      >
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${selectedCategory.color}`}></span>
          <span className="text-sm">{selectedCategory.name}</span>
        </div>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[--color-accent] rounded-lg shadow-lg">
          <ul>
            {categories.map(category => (
              <li
                key={category.name}
                onClick={() => handleSelect(category)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                <span className="text-sm">{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
