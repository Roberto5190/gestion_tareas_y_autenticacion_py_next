'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '@/context/useAuth';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      router.replace(user ? '/tasks' : '/login');
    }
  }, [loading, user, router]);

  return null;
}
