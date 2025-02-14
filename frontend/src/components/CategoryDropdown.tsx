import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// Category data
const categories = [
  { name: "Random Thoughts", color: "#F4A988" },
  { name: "Personal", color: "#7BA8A8" },
  { name: "School", color: "#F6DD8A" },
  { name: "Drama", color: "#B5D18A" },
];

interface CategoryDropdownProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryDropdown({ selectedCategory, onSelect }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left w-[225px]">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`border px-4 py-2 flex items-center justify-between w-full rounded-lg text-[#957139] shadow-sm transition-all
          ${isOpen ? "bg-[#FAF1E3] border-[#88642A]" : "bg-[#FAF1E3] border-[#957139]"}
          hover:border-[#88642A]`}
      >
        <div className="flex items-center gap-2">
          {/* Selected Category Dot */}
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: categories.find(cat => cat.name === selectedCategory)?.color }}></span>
          <span>{selectedCategory}</span>
        </div>
        <FaChevronDown />
      </button>

      {/* Dropdown Menu (No Border) */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-[#FAF1E3] rounded-lg shadow-lg z-10">
          {categories
            .filter(category => category.name !== selectedCategory) // Hide selected category
            .map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  onSelect(category.name);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-200 transition-all"
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></span>
                {category.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
