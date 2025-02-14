import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchNotes, categoryMap, categoryColors } from "../utils/api";
import { formatDate, checkAuth } from "../utils/helpers";
import Button from "../components/Button";
import Notes from "../components/Notes";
import EmptyState from "../components/EmptyState";

const IndexPage = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const token = checkAuth(router);
    if (!token) return;

    const loadNotes = async () => {
      setLoading(true);
      setError(null);

      const data = await fetchNotes();
      if (data.length === 0) setError("Failed to load notes. Please check your API connection.");

      setNotes(data);

      // Count notes per category
      const counts = data.reduce((acc: { [key: string]: number }, note: any) => {
        const category = categoryMap[note.category] || "Random Thoughts";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      setCategoryCounts(counts);
      setLoading(false);
    };

    loadNotes();
  }, []);

  const handleNoteClick = (noteId: string) => {
    router.push(`/notes?id=${noteId}`);
  };

  return (
    <div className="bg-[#FAF1E3] min-h-screen p-8 flex">
      {/* Sidebar with category count */}
      <aside className="w-1/4 pr-8">
        <h2 className="font-bold text-lg mb-4">All Categories</h2>
        {Object.entries(categoryCounts)
          .filter(([_, count]) => count > 0)
          .map(([category, count]) => (
            <div key={category} className="flex justify-between items-center mb-2">
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: categoryColors[category].bg }} />
                {category}
              </span>
              <span className="text-gray-700 font-bold">{count}</span>
            </div>
          ))}
      </aside>

      {/* Main content */}
      <main className="w-3/4 flex flex-col">
        <div className="self-end mb-4">
          <Button text="+ New Note" onClick={() => router.push("/notes")} />
        </div>

        {loading && <p>Loading notes...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && notes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {notes.map((note) => (
              <div key={note.id} onClick={() => handleNoteClick(note.id)} className="cursor-pointer">
                <Notes
                  title={note.title}
                  content={note.content}
                  category={categoryMap[note.category]}
                  lastEdited={formatDate(note.last_updated)}
                />
              </div>
            ))}
          </div>
        ) : (
          !loading && <EmptyState />
        )}
      </main>
    </div>
  );
};

export default IndexPage;
