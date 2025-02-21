import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const categories = [
  { name: "Random Thoughts", value: "random_thoughts", color: "#F4A988" },
  { name: "Personal",        value: "personal",        color: "#7BA8A8" },
  { name: "School",          value: "school",          color: "#F6DD8A" },
  { name: "Drama",           value: "drama",           color: "#B5D18A" },
];

interface CategoryDropdownProps {
  selectedCategory: string;              // short name (e.g. "random_thoughts")
  onSelect: (categoryValue: string) => void;
}

export default function CategoryDropdown({ selectedCategory, onSelect }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = categories.find((cat) => cat.value === selectedCategory);

  return (
    <div className="relative inline-block text-left w-[225px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`border px-4 py-2 flex items-center justify-between w-full rounded-lg text-[#957139] shadow-sm transition-all
          ${isOpen ? "bg-[#FAF1E3] border-[#88642A]" : "bg-[#FAF1E3] border-[#957139]"}
          hover:border-[#88642A]`}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selected?.color }}
          />
          <span>{selected?.name || "Select Category"}</span>
        </div>
        <FaChevronDown />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-[#FAF1E3] rounded-lg shadow-lg z-10">
          {categories
            .filter((cat) => cat.value !== selectedCategory)
            .map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  onSelect(cat.value); // store short name in state
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-200 transition-all"
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
