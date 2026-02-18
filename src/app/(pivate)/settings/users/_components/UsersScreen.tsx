'use client';

import TitleCard from '@/components/ui/TitleCard';
import headers from '../_data/headers.json';
import { useMemo, useState } from 'react';
import { useUsers } from '@/components/hooks/useUsers';
import { AnyObject } from '@/types/commons/AnyObject';
import { Avatar, Chip, IconButton, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { stringAvatar } from '@/utils/stringAvatar';
import { ScreenLayoutTable } from '@/components/ui/ScreenLayoutTable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { grey } from '@mui/material/colors';
import { User } from '@/types/users/User';
import { CustomModal } from '@/components/ui/CustomModal';
import { deleteUser } from '@/lib/services/userService';
import { useRouter } from 'next/navigation';

export default function UsersScreen() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { fetchUsers, error } = useUsers();
  const router = useRouter();

  const handleActionClick = (e: React.MouseEvent<HTMLElement>, userId: string) => {
    // Aquí puedes manejar las acciones para cada usuario, como abrir un menú de opciones o un modal de edición
    setAnchorEl(e.currentTarget);
    setOpenMenuId(userId); // Si quieres abrir un menú específico para cada usuario, puedes usar el ID del usuario aquí
  };

  // MODIFICAR SEGUN LO QUE QUIERAS RENDERIZAR EN CADA COLUMNA, AGREGAR LA FUNCION RENDER EN CADA CASE DEL SWITCH.-
  const usersMap = (user: User) => {
    return {
      id: user.usr_idt_id,
      user: `${user.person_data?.per_txt_first_name} ${user.person_data?.per_txt_last_name}`,
      email: user.usr_txt_email,
      role: user.roles,
      status: user.usr_sta_state ? 'Activo' : 'Inactivo',
    };
  };

  const columns = useMemo(() => {
    return headers.map((header) => {
      switch (header.id) {
        case 'user':
          return {
            ...header,
            render: (value: string) => (
              <div className="flex items-center gap-2">
                <Avatar {...stringAvatar(value.toUpperCase())} />
                <Typography variant="body1" fontWeight={600}>
                  {value}
                </Typography>
              </div>
            ),
          };
        case 'email':
          return {
            ...header,
            render: (value: string) => (
              <Typography variant="body2" color="textSecondary">
                {value}
              </Typography>
            ),
          };
        case 'role':
          return {
            ...header,
            render: (value: string[]) => (
              <div className="flex flex-wrap gap-1">
                {value.map((role, index) => (
                  <Chip
                    key={index}
                    label={
                      <Typography variant="body2" fontSize={12} color="primary" fontWeight={500}>
                        {role.toUpperCase()}
                      </Typography>
                    }
                    clickable={false}
                  />
                ))}
              </div>
            ),
          };
        case 'status':
          return {
            ...header,
            render: (value: string) => (
              <div className="flex items-center gap-1">
                <FiberManualRecordIcon
                  style={{ color: value === 'Activo' ? 'green' : 'grey', fontSize: 12 }}
                />
                <Typography variant="body2" fontSize={12} color="textSecondary" component="span">
                  {value}
                </Typography>
              </div>
            ),
          };
        case 'actions':
          return {
            ...header,
            render: (_value: AnyObject, _row: AnyObject) => (
              <div className="flex items-center space-x-2">
                {/* Aquí puedes agregar botones de acción como Editar, Eliminar, etc. */}
                <IconButton size="small" onClick={(e) => handleActionClick(e, _row.id)}>
                  <MoreVertIcon />
                </IconButton>
              </div>
            ),
          };
        default:
          return header;
      }
    });
  }, [handleActionClick]);

  const menuOptions = useMemo(
    () => [
      {
        label: 'Editar',
        icon: <EditIcon fontSize="small" sx={{ color: grey[500] }} />,
        color: 'textSecondary',
        action: (id: string) => {
          // Aquí puedes manejar la acción de editar usuario, por ejemplo, abrir un modal con el formulario de edición
          setSelectedUserId(id);
          router.push(`/settings/users/${id}`);
        },
      },
      {
        label: 'Eliminar',
        icon: <DeleteIcon fontSize="small" color="error" />,
        color: 'error',
        action: (id: string) => {
          setOpenDeleteModal(true);
          setSelectedUserId(id);
        },
      },
    ],
    [router]
  );

  const handleDeleteUser = () => {
    // Aquí puedes manejar la lógica para eliminar el usuario seleccionado, por ejemplo, llamar a una función de tu hook useUsers para eliminar el usuario por su ID
    console.log('Eliminar usuario con ID:', selectedUserId);
    deleteUser(selectedUserId as string);
    setOpenDeleteModal(false);
    setSelectedUserId(null);
  };
  return (
    <div className="p-4 md:p-6">
      <TitleCard
        title="Configuración de Usuarios"
        description="Aquí puedes gestionar los usuarios (crear, editar, eliminar) del sistema, asignar roles y permisos."
      />
      <ScreenLayoutTable
        headers={headers}
        columns={columns}
        message={error as string}
        anchorEl={anchorEl}
        openMenuId={openMenuId}
        setOpenMenuId={setOpenMenuId}
        menuOptions={menuOptions}
        mapData={usersMap as unknown as (data: AnyObject) => AnyObject}
        fetchData={fetchUsers as unknown as (filters: AnyObject) => Promise<AnyObject[] | void>}
      />
      <CustomModal
        open={openDeleteModal}
        title="Eliminar Usuario"
        showCancelButton
        showConfirmButton
        onConfirm={() => {
          setOpenDeleteModal(false);
          handleDeleteUser();
        }}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedUserId(null);
        }}
      >
        <Typography variant="body1">
          Deseas eliminar este usuario? Esta acción no se puede deshacer.
        </Typography>
      </CustomModal>
    </div>
  );
}
