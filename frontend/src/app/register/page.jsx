"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "../../components/Alert";
import { api } from "../../utils/api";

/**
 * Formulario de registro.
 * Al registrarse, redirige a /login.
 */
export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState({ text: "", type: "" });
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            setMsg({ text: "Registro exitoso. Redirigiendo al login…", type: "success" });
            setTimeout(() => router.push("/login"), 1500);
        } catch (err) {
            setMsg({ text: "Error al registrar el usuario", type: "error" });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 mt-8">
            <h2 className="text-xl">Registro de Usuario</h2>
            {msg.text && <Alert message={msg.text} type={msg.type} />}
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Usuario"
                className="w-full p-2 border rounded"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Crear cuenta
            </button>
        </form>
    );
}
