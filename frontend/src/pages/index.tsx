import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryList from "../components/CategoryList";
import Notes from "../components/Notes";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

const API_URL = "http://127.0.0.1:8000/api/notes/";

const categoryMap = {
  random_thoughts: "Random Thoughts",
  personal: "Personal",
  school: "School",
  drama: "Drama",
};

const categoryColors = {
  "Random Thoughts": "#EF9C66",
  Personal: "#78ABA8",
  School: "#FCDC94",
  Drama: "#C8CFA0",
};

const IndexPage = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setAuthToken(token);
  }, []);

  useEffect(() => {
    if (!authToken) return;

    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("authToken");
          router.push("/auth/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNotes(Array.isArray(data) ? data : []);

        // Contar quantidade de notas por categoria
        const counts = data.reduce((acc: { [key: string]: number }, note: any) => {
          const category = categoryMap[note.category] || "Random Thoughts";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        setCategoryCounts(counts);
      } catch {
        setError("Failed to load notes. Please check your API connection.");
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [authToken]);

  return (
    <div className="bg-[#FAF1E3] min-h-screen p-8 flex">
      <aside className="w-1/4 pr-8">
        <h2 className="font-bold text-lg mb-4">All Categories</h2>
        {Object.entries(categoryCounts)
          .filter(([_, count]) => count > 0) // Remove categorias vazias
          .map(([category, count]) => (
            <div key={category} className="flex justify-between items-center mb-2">
              <span className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: categoryColors[category] }}
                />
                {category}
              </span>
              <span className="text-gray-700 font-bold">{count}</span>
            </div>
          ))}
      </aside>

      <main className="w-3/4 flex flex-col">
        <div className="self-end mb-4">
          <Button text="+ New Note" onClick={() => router.push("/notes")} />
        </div>

        {loading && <p>Loading notes...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && notes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {notes.map((note) => (
              <Notes
                key={note.id}
                title={note.title}
                content={note.content}
                category={categoryMap[note.category]}
                lastEdited={note.lastEdited}
              />
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
