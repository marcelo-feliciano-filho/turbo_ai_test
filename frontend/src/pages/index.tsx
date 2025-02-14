import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryList from "../components/CategoryList";
import Notes from "../components/Notes";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

// Define the API URL
const API_URL = "http://127.0.0.1:8000/api/notes";

const IndexPage = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setNotes(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setNotes([]); // Fallback to empty list
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="bg-[#FAF1E3] min-h-screen p-8 flex">
      <aside className="w-1/4 pr-8">
        <CategoryList />
      </aside>

      <main className="w-3/4 flex flex-col">
        <div className="self-end mb-4">
          <Button text="+ New Note" onClick={() => router.push("/notes")} />
        </div>

        {/* Loading state */}
        {loading && <p>Loading notes...</p>}

        {/* If notes exist, show them, otherwise show EmptyState */}
        {!loading && notes.length > 0 ? (
          <Notes notes={notes} />
        ) : (
          !loading && <EmptyState />
        )}
      </main>
    </div>
  );
};

export default IndexPage;
