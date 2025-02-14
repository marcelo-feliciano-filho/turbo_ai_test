import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CategoryDropdown from "../components/CategoryDropdown";
import CloseButton from "../components/CloseButton";

const categoryMap = {
  random_thoughts: "Random Thoughts",
  personal: "Personal",
  school: "School",
  drama: "Drama",
};

const reverseCategoryMap = Object.fromEntries(Object.entries(categoryMap).map(([k, v]) => [v, k]));

const categories = {
  "Random Thoughts": { bg: "#EF9C66", border: "#D67D4A" },
  Personal: { bg: "#78ABA8", border: "#5E8E8B" },
  School: { bg: "#FCDC94", border: "#D8B76B" },
  Drama: { bg: "#C8CFA0", border: "#A3B27D" },
};

const API_URL = "http://127.0.0.1:8000/api/notes";

const NotesPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Random Thoughts");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [lastEdited, setLastEdited] = useState<string | null>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return router.push("/auth/login");
    setAuthToken(token);
  }, []);

  useEffect(() => {
    if (!authToken || !router.query.id) return;
    fetch(`${API_URL}/${router.query.id}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("authToken");
          router.push("/auth/login");
        }
        if (!res.ok) throw new Error(res.status.toString());
        return res.json();
      })
      .then((data) => {
        setNoteId(data.id);
        setNoteTitle(data.title);
        setNoteContent(data.content);
        setSelectedCategory(categoryMap[data.category] || "Random Thoughts");
        setLastEdited(data.last_updated || data.created_at);
      })
      .catch(() => setError("Failed to load note."));
  }, [router.query.id, authToken]);

  const handleSaveAndClose = async () => {
    if (!authToken) return setError("Unauthorized: Login again.");

    setIsSaving(true);

    const payload = {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      category: reverseCategoryMap[selectedCategory] || "random_thoughts",
    };

    if (!payload.title || !payload.content) {
      setIsSaving(false);
      return setError("Title and content cannot be empty.");
    }

    try {
      const response = await fetch(noteId ? `${API_URL}/${noteId}/` : `${API_URL}/`, {
        method: noteId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        localStorage.removeItem("authToken");
        router.push("/auth/login");
      }

      if (!response.ok) throw new Error(response.status.toString());

      router.push("/");
    } catch (err) {
      setError(`Failed to save note: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-[#FAF1E3]">
      <div className="flex justify-between">
        <CategoryDropdown selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
        <CloseButton onClick={handleSaveAndClose} disabled={isSaving} />
      </div>

      {error && <p className="text-red-600 text-center mt-2">{error}</p>}

      <div
        className="mt-6 p-6 rounded-lg shadow-lg"
        style={{
          backgroundColor: categories[selectedCategory].bg,
          border: `3px solid ${categories[selectedCategory].border}`,
        }}
      >
        <p className="text-xs text-black text-right mb-2">
          Last Edited: {lastEdited ? new Date(lastEdited).toLocaleString("en-US", {
            month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
          }) : "Not saved yet"}
        </p>

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
