import Header from '../components/Header';
import NoteForm from '../components/NoteForm';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CreateNote() {
    const router = useRouter();

    const handleSubmit = (noteData) => {
        axios.post('/api/notes', noteData)
            .then(() => router.push('/'))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <Header />
            <div className='p-4'>
                <h1 className='text-2xl font-bold'>Create New Note</h1>
                <NoteForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
