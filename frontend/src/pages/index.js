import { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard';
import Header from '../components/Header';
import axios from 'axios';

export default function HomePage() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get('/api/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <Header />
            <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {notes.map(note => <NoteCard key={note.id} note={note} />)}
            </div>
        </div>
    );
}
