'use client';

import Link from 'next/link';
        // App Router
import useAuth from '@/context/useAuth';
import { useRouter } from 'next/router';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { pathname } = useRouter();
    const linkClass = (path) =>
        `rounded px-3 py-2 hover:bg-indigo-100  text-black ${pathname === path ? ' text-indigo-600  font-semibold' : ''
        }`;

    return (
        <header className="bg-white shadow-sm ">
            <nav className="container flex h-14 items-center justify-between">
                <Link href="/" className="text-lg text-black font-bold">
                    TaskManager
                </Link>

                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link href="/register" className={linkClass('/register')}>
                                Registro
                            </Link>
                            <Link href="/login" className={linkClass('/login')}>
                                Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/tasks" className={linkClass('/tasks')}>
                                Tareas
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="rounded bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
