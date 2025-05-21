"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // redirige si ya autenticado (cookie httpOnly)
    fetch("/api/tasks", { credentials: "include" }).then(res => {
      if (res.ok) router.push("/tasks");
      else router.push("/login");
    });
  }, []);
  return <p className="text-center">Redirigiendo…</p>;
}
