import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';

export default function NoteDetail() {
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


    return (
        <div>
            <Header />
            <div className='p-4'>
                <h1 className='text-2xl font-bold'>{note.title}</h1>
                <p className='text-gray-600'>{note.content}</p>
            </div>
        </div>
    );
}
