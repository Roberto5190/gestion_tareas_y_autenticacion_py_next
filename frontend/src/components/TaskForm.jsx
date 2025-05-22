"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";


export default function TaskForm({ onAdd, jwt }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(jwt);
        

        if (!jwt) {
            setError("No estás autenticado");
            return;
        }

        try {
            // 2️⃣ Llamas al API incluyendo tu header Authorization
            const newTask = await api("/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({ title, description }),
            }).then(res => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            });

            // 3️⃣ Si todo va bien, limpias el formulario y actualizas la lista
            setTitle("");
            setDescription("");
            onAdd?.(newTask);
            router.refresh(); // o dependes de onAdd para actualizar
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
