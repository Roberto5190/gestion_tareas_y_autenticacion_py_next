"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../utils/api";

export default function LoginPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { access_token } = await api("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
      });
      localStorage.setItem("token", access_token);
      router.push("/tasks");
    } catch {
      alert("Credenciales inválidas");
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-4">
      <h2 className="text-xl">Iniciar sesión</h2>
      <input
        value={u}
        onChange={e => setU(e.target.value)}
        placeholder="Usuario"
        className="w-full p-2 border"
      />
      <input
        type="password"
        value={p}
        onChange={e => setP(e.target.value)}
        placeholder="Contraseña"
        className="w-full p-2 border"
      />
      <button className="px-4 py-2 bg-blue-500 text-white">Entrar</button>
    </form>
  );
}