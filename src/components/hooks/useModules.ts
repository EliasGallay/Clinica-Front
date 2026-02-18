import { getModules } from '@/lib/services/modulesService';
import { NavItem } from '@/types/layout/NavItem';
import { useCallback, useEffect, useState } from 'react';

export function useModules() {
  const [modules, setModules] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data }: { data: NavItem[] } = await getModules();

      if (data) {
        // Ordenar los módulos por mod_int_order
        data.sort((a, b) => a.mod_int_order - b.mod_int_order);
        // Ordenar los submódulos de cada módulo por sub_int_order
        data.forEach((mod) => {
          if (mod.mod_submodules) {
            mod.mod_submodules.sort(
              (a: { sub_int_order: number }, b: { sub_int_order: number }) =>
                a.sub_int_order - b.sub_int_order
            );
          }
        });

        setModules((prevModules) => {
          // Evitar actualizar el estado si los datos son iguales (comparación profunda)
          if (JSON.stringify(prevModules) === JSON.stringify(data)) {
            return prevModules; // No se actualiza el estado, evitando un re-render innecesario
          }
          return data; // Actualiza el estado con los nuevos datos
        });
      } else {
        setModules([]); // Si no se obtuvieron módulos, se setea el estado a un array vacío.
      }
    } catch {
      setError('Error al obtener los módulos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return { modules, loading, error };
}
