'use client'

import { AnyObject } from '@/types/commons/AnyObject';
import { Me } from '@/types/login/Me';
import { useCallback, useEffect, useState } from 'react';

export function useUsers() {
  const [users, setUsers] = useState<Me[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/users', {
        method: 'GET',
      });
      const data: Me[] = await res.json();

      if (data && Array.isArray(data)) {
        setUsers((prevModules) => {
          // Evitar actualizar el estado si los datos son iguales (comparación profunda)
          if (JSON.stringify(prevModules) === JSON.stringify(data)) {
            return prevModules; // No se actualiza el estado, evitando un re-render innecesario
          }
          return data; // Actualiza el estado con los nuevos datos
        });
      } else {
        setUsers([]); // Si no se obtuvieron usuarios, se setea el estado a un array vacío.
        setError((data as AnyObject).message || 'No se encontraron usuarios'); // Si la respuesta no es un array, se muestra un mensaje de error.
      }
    } catch {
      setError('Error al obtener los usuarios');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error };
}
