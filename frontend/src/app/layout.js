"use client";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const pref = localStorage.getItem("theme") === "dark";
    setDark(pref);
    document.documentElement.classList.toggle("dark", pref);
  }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <html lang="es">
      <body>
        <Navbar dark={dark} onToggle={toggleTheme} />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
