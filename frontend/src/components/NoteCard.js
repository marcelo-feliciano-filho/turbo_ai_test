import Link from 'next/link';

export default function NoteCard({ note }) {
    return (
        <div className='border p-4 rounded-md shadow-md'>
            <h2 className='font-bold text-lg'>{note.title}</h2>
            <p className='text-gray-600'>{note.content.substring(0, 100)}...</p>
            <Link href={'/note/' + note.id} className='text-blue-600'>Read more</Link>
        </div>
    );
}
