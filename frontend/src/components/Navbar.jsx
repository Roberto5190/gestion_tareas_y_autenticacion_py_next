"use client";
import Link from "next/link";

export default function Navbar({ dark, onToggle }) {
    return (
        <nav className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between">
            <div className="space-x-4">
                <Link href="/">Inicio</Link>
                <Link href="/tasks">Tareas</Link>
            </div>
            <button onClick={onToggle} aria-label="Toggle theme">
                {dark ? "☀️" : "🌙"}
            </button>
        </nav>
    );
}
