import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const dummyNotes = [
  {
    id: 1,
    date: 'Today',
    category: 'Random Thoughts',
    title: 'Grocery List',
    content: ['Milk', 'Eggs', 'Bread', 'Bananas', 'Spinach'],
    color: '#F4A988',
  },
  {
    id: 2,
    date: 'Yesterday',
    category: 'School',
    title: 'Meeting with Team',
    content: 'Discuss project timeline and milestones.',
    color: '#F6DD8A',
  },
  {
    id: 3,
    date: 'July 16',
    category: 'School',
    title: 'Note Title',
    content: 'Note content...',
    color: '#F6DD8A',
  },
];

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // If no token exists, redirect to signup
    if (!token) {
      router.push('/signup');
      return;
    }

    // Fetch notes from backend (Replace with actual API call later)
    setNotes(dummyNotes);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAF1E3] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#88642A]">Your Notes</h1>
        <button className="border rounded-xl px-4 py-2 text-[#88642A]" onClick={() => alert('New note created!')}>
          + New Note
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-lg shadow-md"
            style={{ backgroundColor: note.color }}
          >
            <p className="text-xs font-bold">{note.date} - {note.category}</p>
            <h2 className="text-xl font-bold mt-1">{note.title}</h2>
            {Array.isArray(note.content) ? (
              <ul className="mt-2 text-sm">
                {note.content.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm">{note.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
