import React from "react"
import { categoryMap, defaultCategory } from "../utils/categoryMap"

interface CategoryListProps {
  categories: string[]
  selectedCategory: string
  onSelect: (cat: string) => void
  categoryCounts: Record<string, number>
  totalCount: number
}

export default function CategoryList({
  categories,
  selectedCategory,
  onSelect,
  categoryCounts,
  totalCount,
}: CategoryListProps) {
  const allCategories = ["All", ...categories]

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">All Categories</h2>
      <div className="flex flex-col gap-2">
        {allCategories.map((cat) => {
          const isSelected = cat === selectedCategory
          if (cat === "All") {
            return (
              <div
                key="All"
                onClick={() => onSelect("All")}
                className={`cursor-pointer rounded-md px-3 py-2 shadow-sm hover:shadow-md ${
                  isSelected ? "ring-2 ring-black font-semibold" : ""
                }`}
                style={{ backgroundColor: "#DED7C5", color: "#333" }}
              >
                <div className="flex justify-between">
                  <span>All</span>
                  <span>{totalCount}</span>
                </div>
              </div>
            )
          }
          const catKey = cat.toLowerCase()
          const catData = categoryMap[catKey] || defaultCategory
          const count = categoryCounts[cat] || 0
          return (
            <div
              key={cat}
              onClick={() => onSelect(cat)}
              className={`cursor-pointer rounded-md px-3 py-2 shadow-sm hover:shadow-md ${
                isSelected ? "ring-2 ring-black font-semibold" : ""
              }`}
              style={{ backgroundColor: catData.color, color: "#333" }}
            >
              <div className="flex justify-between">
                <span>{catData.display}</span>
                <span>{count}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
