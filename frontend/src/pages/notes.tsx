import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CategoryDropdown from "../components/CategoryDropdown";
import CloseButton from "../components/CloseButton";

// Define categories with their respective colors
const categories: { [key: string]: string } = {
  "Random Thoughts": "#F4A988",
  Personal: "#7BA8A8",
  School: "#F6DD8A",
  Drama: "#B5D18A",
};

// API endpoint
const API_URL = "http://127.0.0.1:8000/api/notes";

const NotesPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Random Thoughts");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteId, setNoteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }

    if (router.query.id) {
      fetch(`${API_URL}/${router.query.id}`, {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Error fetching note: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setNoteId(data.id);
          setNoteTitle(data.title);
          setNoteContent(data.content);
          setSelectedCategory(data.category);
        })
        .catch((err) => {
          console.error("Error loading note:", err);
          setError("Failed to load note.");
        });
    }
  }, [router.query.id]);

  const handleSaveAndClose = async () => {
    setIsSaving(true);
    setError(null);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Unauthorized: Please log in again.");
      setIsSaving(false);
      return;
    }

    const payload = {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      category: selectedCategory,
    };

    if (!payload.title || !payload.content) {
      setError("Error: Note title and content cannot be empty.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch(noteId ? `${API_URL}/${noteId}/` : API_URL + "/", {
        method: noteId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to save note: ${response.status}`);
      }

      router.push("/");
    } catch (error) {
      console.error("Error saving note:", error);
      setError("Failed to save note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-[#FAF1E3] relative">
      {/* Category Selector & Close Button */}
      <div className="flex justify-between">
        <CategoryDropdown selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
        <CloseButton onClick={handleSaveAndClose} disabled={isSaving} />
      </div>

      {/* Error Display */}
      {error && <p className="text-red-600 text-center mt-2">{error}</p>}

      {/* Note Editor */}
      <div
        className="mt-6 p-6 rounded-lg shadow-lg"
        style={{
          backgroundColor: categories[selectedCategory] || "#F4A988",
          border: `3px solid ${categories[selectedCategory]}`,
        }}
      >
        <input
          type="text"
          placeholder="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          className="w-full text-2xl font-bold mb-4 border-none outline-none bg-transparent text-black"
        />
        <textarea
          placeholder="Pour your heart out..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full h-80 resize-none border-none outline-none bg-transparent text-black"
        />
      </div>
    </div>
  );
};

export default NotesPage;
