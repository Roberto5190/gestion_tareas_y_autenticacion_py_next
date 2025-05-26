"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar({ dark, onToggle }) {
    const {user} = useContext(UserContext)

    // useEffect(() => {
    //     fetch('http://localhost:5000/api/user', {
    //         credentials: 'include',  // importante para enviar cookies de sesión
    //     })
    //         .then(res => {
    //             if (!res.ok) throw new Error('No autorizado')
    //             return res.json()
    //         })
    //         .then(data => setUser(data.user))
    //         .catch(() => setUser(null))
    // }, [])
    // console.log(user);
    


    return (
        <nav className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between">
            <div className="space-x-4">
                <Link href="/">Inicio</Link>
                <Link href="/tasks">Tareas</Link>
            </div>
            <div>
                {user ? <h4>{user.username}</h4> : ""}
                
                <button onClick={onToggle} aria-label="Toggle theme">
                    {dark ? "☀️" : "🌙"}
                </button>
            </div>

        </nav>
    );
}
