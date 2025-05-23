'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/context/useAuth';

export default function Register() {
    /* ─── hooks primero ─── */
    const router = useRouter();
    const { user, loading, register } = useAuth();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!loading && user) router.replace('/tasks');
    }, [loading, user, router]);

    if (loading) return <p className="p-4 text-sm">Verificando sesión…</p>;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
        } catch (err) {
            setError(err.response?.data?.error || 'No se pudo registrar');
        }
    };

    return (
        <section className="mx-auto max-w-md rounded bg-white p-6 shadow">
            <h1 className="mb-4 text-2xl font-semibold">Registro</h1>

            {error && (
                <p className="mb-3 rounded bg-red-100 px-4 py-2 text-sm text-red-700">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="input"
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
                >
                    Crear cuenta
                </button>
            </form>
        </section>
    );
}
