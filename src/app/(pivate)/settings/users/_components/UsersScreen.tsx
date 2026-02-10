'use client';

import { ListTable } from '@/components/ui/ListTable';
import TitleCard from '@/components/ui/TitleCard';
import headers from '../_data/headers.json';
import { useMemo } from 'react';
import { useUsers } from '@/components/hooks/useUsers';
import { Me } from '@/types/login/Me';
import { AnyObject } from '@/types/commons/AnyObject';

export default function UsersScreen() {
  const { users, error } = useUsers();
  // MODIFICAR SEGUN LO QUE QUIERAS RENDERIZAR EN CADA COLUMNA, AGREGAR LA FUNCION RENDER EN CADA CASE DEL SWITCH.-
  const usersMap = useMemo(
    () =>
      users?.map((user: Me) => ({
        user: `${user.person_data.per_txt_first_name} ${user.person_data.per_txt_last_name}`,
        email: user.usr_txt_email,
        role: user.roles,
        status: user.usr_sta_state ? 'Activo' : 'Inactivo',
      })),
    [users]
  );

  const columns = useMemo(() => {
    return headers.map((header) => {
      switch (header.id) {
        case 'actions':
          return {
            ...header,
            render: (_value: AnyObject, _row: AnyObject) => (
              <div className="flex items-center space-x-2"></div>
            ),
          };
        default:
          return header;
      }
    });
  }, []);
  return (
    <div className="p-4 md:p-6">
      <TitleCard
        title="Configuración de Usuarios"
        description="Aquí puedes gestionar los usuarios (crear, editar, eliminar) del sistema, asignar roles y permisos."
      />
      <div className="bg-white shadow-md rounded-lg  my-6">
        {/* Aquí iría el componente o la lógica para gestionar los usuarios */}
        <ListTable
          showActionButton={true}
          actionButtonLabel="Agregar Usuario"
          headCells={headers}
          rows={(Boolean(usersMap?.length) && usersMap) || []}
          columns={columns}
          message={error ?? 'No hay usuarios para mostrar.'}
        />
      </div>
    </div>
  );
}
