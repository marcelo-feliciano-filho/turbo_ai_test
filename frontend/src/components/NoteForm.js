import { useState } from 'react';

export default function NoteForm({ onSubmit, initialData = {} }) {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}
                className='border p-2 rounded-md' required />
            <textarea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)}
                className='border p-2 rounded-md' required></textarea>
            <button type='submit' className='bg-blue-600 text-white p-2 rounded-md'>Save</button>
        </form>
    );
}
