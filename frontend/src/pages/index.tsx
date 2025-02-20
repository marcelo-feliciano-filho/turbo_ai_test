import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryList from "../components/CategoryList";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import Notes from "../components/Notes";       // Your custom note display
import { fetchNotes, Note } from "../utils/api";
import { getAuthToken } from "../utils/helpers";

export default function IndexPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace("/auth/login");
      return;
    }
    (async () => {
      try {
        const allNotes = await fetchNotes();
        setNotes(allNotes);

        // Gather unique short-name categories from your notes
        const uniqueCats = Array.from(new Set(allNotes.map((n) => n.category)));
        setCategories(uniqueCats);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleNewNote = () => {
    router.push("/notes");
  };

  if (loading) {
    return (
      <div className="bg-[#FAF1E3] min-h-screen p-8 flex justify-center items-center">
        <p>Loading notes...</p>
      </div>
    );
  }

  // Filter notes if a category is selected
  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

  return (
    <div className="bg-[#FAF1E3] min-h-screen p-8 flex">
      {/* LEFT SIDEBAR: dynamic CategoryList */}
      <aside className="w-1/4 pr-8">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </aside>

      {/* MAIN CONTENT */}
      <main className="w-3/4 flex flex-col">
        <div className="self-end mb-4">
          <Button text="+ New Note" onClick={handleNewNote} />
        </div>

        {/* No notes => show EmptyState */}
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
                {/* Convert short name to pretty name if you want */}
                <Notes
                  title={note.title}
                  content={note.content}
                  category={
                    note.category === "random_thoughts" ? "Random Thoughts"
                    : note.category === "personal" ? "Personal"
                    : note.category === "school" ? "School"
                    : note.category === "drama" ? "Drama"
                    : note.category
                  }
                  lastEdited={note.last_updated || ""}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
