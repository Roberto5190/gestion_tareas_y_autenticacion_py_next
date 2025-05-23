'use client';

import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  /* ─── estado local ─── */
  const [user, setUser] = useState(() => {
    const name = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
    return name ? { username: name } : null;
  });
  const [loading, setLoading] = useState(true);

  /* ─── verificación inicial: intentamos acceder a /api/tasks para confirmar cookie ─── */
  const verifySession = useCallback(async () => {
    try {
      await api.get('/tasks/');          // requere JWT → si funciona, cookie válida
      setLoading(false);
    } catch {
      setUser(null);
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  /* ─── acciones públicas ─── */
  const register = async (credentials) => {
    await api.post('/register', credentials);        // 201 ←
    await login(credentials);                        // login inmediato
  };

  const login = async ({ username, password }) => {
    await api.post('/login', { username, password });     // backend deja cookie
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username);
    setUser({ username });
    router.push('/tasks');
  };

  const logout = () => {
    // la librería JWT de Flask no expone logout endpoint por defecto
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    setUser(null);
    router.push('/login');
  };

  const value = useMemo(
    () => ({ user, loading, register, login, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
