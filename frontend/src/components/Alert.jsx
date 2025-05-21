"use client";

/**
 * Componente para mostrar mensajes de éxito o error.
 * type: "success" | "error"
 */
export default function Alert({ message, type = "success" }) {
    const base = "p-4 rounded mb-4";
    const style =
        type === "error"
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800";

    return <div className={`${base} ${style}`}>{message}</div>;
}
