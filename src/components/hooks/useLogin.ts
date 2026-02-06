'use client';

import { LoginFormValues } from '@/types/login/LoginFormValues';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(data: LoginFormValues) {
    setLoading(true);
    setError(null);

    const email = String(data.email ?? '');
    const password = String(data.password ?? '');

    if (!email || !password) {
      setError('Email y password son obligatorios');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log('🚀 ~ handleLogin ~ res:', res);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message ?? 'Credenciales inválidas');
        setLoading(false);
        return;
      }

      /**
       * IMPORTANTE:
       * - El JWT queda en cookies httpOnly
       * - No guardamos nada en localStorage
       */
      const next = searchParams.get('next') ?? '/dashboard';

      router.replace(next);
      router.refresh(); // fuerza a re-ejecutar server components/layouts protegidos
    } catch {
      setError('Error de red. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, error };
}
