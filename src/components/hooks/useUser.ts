'use client';

import { getUserById } from '@/lib/services/userService';
import { AnyObject } from '@/types/commons/AnyObject';
import { User } from '@/types/users/User';
import { useCallback, useEffect, useState } from 'react';

export function useUser({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: User | { message: string } = await getUserById(userId);
      console.log('🚀 ~ useUser ~ data:', data);

      if (data && 'usr_idt_id' in data) {
        setUser((prevUser) => {
          if (JSON.stringify(prevUser) === JSON.stringify(data)) {
            return prevUser;
          }
          return data;
        });
      } else {
        setError((data as AnyObject).message || 'No se encontraron usuarios'); // Si la respuesta no es un array, se muestra un mensaje de error.
      }
    } catch {
      setError('Error al obtener los usuarios');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error };
}
