'use client';

import { getUsers } from '@/lib/services/userService';
import { AnyObject } from '@/types/commons/AnyObject';
import { User } from '@/types/users/User';
import { useCallback, useState } from 'react';

export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
     
      const data: User[] = await getUsers()

      if (data && Array.isArray(data)) {
        return data; // Si se obtuvieron usuarios, se retorna el array de usuarios.
      } else {
        setError((data as AnyObject).message || 'No se encontraron usuarios'); // Si la respuesta no es un array, se muestra un mensaje de error.
      }
    } catch {
      setError('Error al obtener los usuarios');
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchUsers, loading, error };
}
