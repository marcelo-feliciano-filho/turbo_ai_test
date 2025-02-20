import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CategoryDropdown from "../components/CategoryDropdown";
import CloseButton from "../components/CloseButton";
import { saveNote, fetchNotes } from "../utils/api";

const categoryColors: Record<string, string> = {
  random_thoughts: "#EF9C66",
  personal:        "#78ABA8",
  school:          "#FCDC94",
  drama:           "#C8CFA0",
};

export default function NotesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("random_thoughts"); // short name
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteId, setNoteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.query.id) {
      setIsLoading(false);
      return;
    }
    (async () => {
      try {
        const notes = await fetchNotes();
        const noteData = notes.find((n) => n.id === Number(router.query.id));
        if (noteData) {
          setNoteTitle(noteData.title);
          setNoteContent(noteData.content);
          setSelectedCategory(noteData.category); // "random_thoughts", etc.
          setNoteId(noteData.id);
        } else {
          console.error("Note not found.");
        }
      } catch {
        console.error("Failed to load note.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [router.query.id]);

  async function handleSaveAndClose() {
    if (!noteTitle.trim() || !noteContent.trim()) return;
    try {
      await saveNote(noteId, {
        title: noteTitle,
        content: noteContent,
        category: selectedCategory, // short name
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  }

  if (isLoading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col p-8 bg-[#FAF1E3] relative">
      <div className="flex justify-between items-center">
        <CategoryDropdown selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
        <CloseButton onClick={handleSaveAndClose} />
      </div>

      <div
        className="p-6 rounded-lg border shadow-lg mt-4"
        style={{
          backgroundColor: categoryColors[selectedCategory],
          borderColor: categoryColors[selectedCategory],
        }}
      >
        <input
          type="text"
          placeholder="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none outline-none w-full"
        />
        <textarea
          placeholder="Pour your heart out..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full h-64 bg-transparent border-none outline-none mt-4"
        />
      </div>
    </div>
  );
}
