"use client"
import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from './Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar/>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
