"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";

/**
 * Formulario para crear una nueva tarea.
 * Al enviar, hace POST a /api/tasks y refresca la página.
 */
export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api("/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            });
            // Limpia el formulario y refresca SSR
            setTitle("");
            setDescription("");
            router.refresh();
        } catch (err) {
            setError("Error al crear la tarea");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {error && <div className="text-red-600">{error}</div>}
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Título"
                className="w-full p-2 border rounded"
            />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Descripción"
                className="w-full p-2 border rounded"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Añadir tarea
            </button>
        </form>
    );
}
