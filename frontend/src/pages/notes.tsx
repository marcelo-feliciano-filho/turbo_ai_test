import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CategoryDropdown from "../components/CategoryDropdown";
import CloseButton from "../components/CloseButton";
import { saveNote, fetchNotes } from "../utils/api"; // ✅ Correct import

const categoryColors: Record<string, string> = {
  "Random Thoughts": "#EF9C66",
  Personal: "#78ABA8",
  School: "#FCDC94",
  Drama: "#C8CFA0",
};

const NotesPage: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("Random Thoughts");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [noteId, setNoteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!router.query.id) {
      setIsLoading(false);
      return;
    }

    const loadNote = async () => {
      try {
        const notes = await fetchNotes(); // ✅ Fetch all notes
        const noteData = notes.find((note) => note.id === Number(router.query.id));

        if (noteData) {
          setNoteTitle(noteData.title);
          setNoteContent(noteData.content);
          setSelectedCategory(noteData.category);
          setNoteId(noteData.id);
        } else {
          console.error("Note not found.");
        }
      } catch {
        console.error("Failed to load note.");
      } finally {
        setIsLoading(false);
      }
    };

    loadNote();
  }, [router.query.id]);

  const handleSaveAndClose = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      return;
    }

    try {
      await saveNote(noteId, { title: noteTitle, content: noteContent, category: selectedCategory });
      router.push("/");
    } catch {
      console.error("Failed to save note.");
    }
  };

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
        style={{ backgroundColor: categoryColors[selectedCategory], borderColor: categoryColors[selectedCategory] }}
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
};

export default NotesPage;
