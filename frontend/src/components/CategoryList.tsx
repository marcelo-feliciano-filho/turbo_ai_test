import React from "react";

interface CategoryListProps {
  categories: string[];        // e.g. ["random_thoughts", "personal", ...]
  selectedCategory: string;    // e.g. "All" or "school"
  onSelect: (cat: string) => void;
}

// Define a mapping for each category to its color
const colorsPerCategory: Record<string, string> = {
  All: "#6B4E3D",            // default color for "All"
  random_thoughts: "#FF5733",
  personal: "#33FFCE",
  school: "#3370FF",
  // add more category-color mappings as needed
};

export default function CategoryList({
  categories,
  selectedCategory,
  onSelect,
}: CategoryListProps) {
  // Prepend "All" to the list of categories
  const allCategories = ["All", ...categories];

  return (
    <div>
      <h2
        className="text-lg font-semibold mb-2"
        style={{ color: colorsPerCategory["All"] }}
      >
        All Categories
      </h2>
      <ul>
        {allCategories.map((cat) => (
          <li
            key={cat}
            className={`mb-2 cursor-pointer ${cat === selectedCategory ? "font-bold underline" : ""}`}
            onClick={() => onSelect(cat)}
            style={{ color: colorsPerCategory[cat] || "#000" }} // default to black if no mapping exists
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
