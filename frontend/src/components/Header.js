import Link from 'next/link';

export default function Header() {
    return (
        <header className='bg-blue-600 p-4 text-white flex justify-between'>
            <h1 className='text-lg font-bold'><Link href='/'>Notes App</Link></h1>
            <nav>
                <Link href='/create' className='ml-4'>New Note</Link>
            </nav>
        </header>
    );
}
