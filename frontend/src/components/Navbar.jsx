"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar({ dark, onToggle }) {
    const {user} = useContext(UserContext)


    return (
        <nav className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between">
            <div className="space-x-4">
                <Link href="/">Inicio</Link>
                <Link href="/tasks">Tareas</Link>
            </div>
            <div className="flex justify-between gap-4">
                {user ? <h4>{user.username}</h4> : ""}
                
                <button onClick={onToggle} aria-label="Toggle theme">
                    {dark ? "☀️" : "🌙"}
                </button>
            </div>

        </nav>
    );
}
