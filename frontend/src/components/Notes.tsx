import React from "react"
import { categoryMap, defaultCategory } from "../utils/categoryMap"

interface NotesProps {
  title: string
  content: string
  category: string
  lastEdited: string
}

export default function Notes({ title, content, category, lastEdited }: NotesProps) {
  const formattedDate =
    lastEdited && !isNaN(Date.parse(lastEdited))
      ? new Date(lastEdited).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "Not saved yet"

  const catKey = category.toLowerCase()
  const catData = categoryMap[catKey] || defaultCategory

  return (
    <div
      className="p-6 rounded-lg shadow-lg"
      style={{
        // Use the category’s exact color (no alpha)
        backgroundColor: catData.color,
        border: `3px solid ${catData.color}`,
      }}
    >
      <div className="text-xs text-black mb-2 text-right break-words">
        <span className="font-bold">{formattedDate}</span> • {catData.display}
      </div>
      <h2 className="text-2xl font-bold text-black break-words">{title}</h2>
      {/* Remove or adjust max-h-32 so text won’t overlap */}
      <p className="text-lg text-black mt-2 whitespace-pre-wrap break-words">
        {content}
      </p>
    </div>
  )
}
