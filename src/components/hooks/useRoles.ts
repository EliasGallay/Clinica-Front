import { getRoles } from '@/lib/services/rolService';
import { Rol } from '@/types/roles/Rol';
import { useCallback, useEffect, useState } from 'react';

export function useRoles() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Aquí deberías hacer la llamada a tu API para obtener los roles
      const data: Rol[] = await getRoles();
      setRoles((prevRoles) => {
        // Evitar actualizar el estado si los datos son iguales (comparación profunda)
        if (JSON.stringify(prevRoles) === JSON.stringify(data)) {
          return prevRoles; // No se actualiza el estado, evitando un re-render innecesario
        }
        return data; // Actualiza el estado con los nuevos datos
      });
    } catch {
      setError('Error al obtener los roles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return { roles, loading, error };
}
