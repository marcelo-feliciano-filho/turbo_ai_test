import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import NoteForm from '../../components/NoteForm';
import axios from 'axios';

export default function EditNote() {
    const router = useRouter();
    const { id } = router.query;
    const [note, setNote] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/api/notes/' + id)
                .then(response => setNote(response.data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = (updatedNote) => {
        axios.put('/api/notes/' + id, updatedNote)
            .then(() => router.push('/'))
            .catch(error => console.error(error));
    };


    return (
        <div>
            <Header />
            <div className='p-4'>
                <h1 className='text-2xl font-bold'>Edit Note</h1>
                <NoteForm onSubmit={handleSubmit} initialData={note} />
            </div>
        </div>
    );
}
