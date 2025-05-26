"use client";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({ children }) {
  const [dark, setDark] = useState(null); // null = sin determinar

  useEffect(() => {
    const pref = localStorage.getItem("theme") === "dark";
    setDark(pref);
    document.documentElement.classList.toggle("dark", pref);
  }, []);

  if (dark === null) {
    // Renderizas algo neutro mientras se determina el tema
    return <html lang="es"><body>{children}</body></html>;
  }
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }


  return (
    <html lang="es">
      <body>
        <UserProvider>
          <Navbar dark={dark} onToggle={toggleTheme} />
          <main className="p-6">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
