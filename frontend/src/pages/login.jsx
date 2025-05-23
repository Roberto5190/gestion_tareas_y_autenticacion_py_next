'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/context/useAuth';

export default function Login() {
    /* ─── hooks SIEMPRE al principio ─── */
    const router = useRouter();
    const { user, loading, login } = useAuth();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    /* redirección cuando ya hay sesión */
    useEffect(() => {
        if (!loading && user) router.replace('/tasks');
    }, [loading, user, router]);

    if (loading) return <p className="p-4 text-sm">Verificando sesión…</p>;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form);
        } catch (err) {
            setError(err.response?.data?.error || 'Credenciales incorrectas');
        }
    };

    return (
        <section className="mx-auto max-w-md rounded bg-white p-6 shadow">
            <h1 className="mb-4 text-2xl font-semibold">Login</h1>

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
                    Entrar
                </button>
            </form>
        </section>
    );
}
