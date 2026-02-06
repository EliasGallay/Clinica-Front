"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export function useLogout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleLogout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (!res.ok) {
        throw new Error('Error al cerrar sesión');
      }
      const next = searchParams.get('next') ?? '/';
      router.replace(next);
      router.refresh(); // fuerza a re-ejecutar server components/layouts protegidos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  return { handleLogout, loading, error };
}
