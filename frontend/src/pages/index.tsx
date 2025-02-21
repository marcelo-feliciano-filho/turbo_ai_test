import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import CategoryList from "../components/CategoryList"
import Button from "../components/Button"
import EmptyState from "../components/EmptyState"
import Notes from "../components/Notes"
import { fetchNotes, Note } from "../utils/api"
import { getAuthToken } from "../utils/helpers"

export default function IndexPage() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace("/auth/login")
      return
    }
    ;(async () => {
      try {
        const allNotes = await fetchNotes()
        setNotes(allNotes)
        const uniqueCats = Array.from(new Set(allNotes.map((n) => n.category)))
        setCategories(uniqueCats)
      } finally {
        setLoading(false)
      }
    })()
  }, [router])

  const categoryCounts = notes.reduce((acc, note) => {
    if (!acc[note.category]) {
      acc[note.category] = 0
    }
    acc[note.category]++
    return acc
  }, {} as Record<string, number>)

  if (loading) {
    return (
      <div className="bg-[#FAF1E3] min-h-screen p-8 flex justify-center items-center">
        <p>Loading notes...</p>
      </div>
    )
  }

  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter((note) => note.category === selectedCategory)

  return (
    <div className="bg-[#FAF1E3] min-h-screen p-8 flex">
      <aside className="w-1/4 pr-8">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
          categoryCounts={categoryCounts}
          totalCount={notes.length}
        />
      </aside>
      <main className="w-3/4 flex flex-col">
        <div className="self-end mb-4">
          <Button text="+ New Note" onClick={() => router.push("/notes")} />
        </div>
        {filteredNotes.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => router.push(`/notes?id=${note.id}`)}
                className="cursor-pointer"
              >
                <Notes
                  title={note.title}
                  content={note.content}
                  category={note.category}
                  lastEdited={note.last_updated || ""}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
