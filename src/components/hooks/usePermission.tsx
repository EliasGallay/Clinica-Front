import { getPermissionsByRole } from '@/lib/services/permissionService';
import { Permission } from '@/types/roles/Permissions';
import { useCallback, useState } from 'react';

export function usePermission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = useCallback(async (roleId: string) => {
    setLoading(true);
    setError(null);
    try {
      // Aquí deberías hacer la llamada a tu API para obtener los permisos
      const data: Permission[] = await getPermissionsByRole(roleId);
      return data;
    } catch {
      setError('Error al obtener los permisos');
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchPermissions, loading, error };
}
