'use client';

import { CustomCard } from '@/components/ui/CustomCard';
import TitleCard from '@/components/ui/TitleCard';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { userSchema } from '../_schemas/userSchema';
import { UserFormValues } from '@/types/users/UserFormValues';
import PersonIcon from '@mui/icons-material/Person';
import { Divider, Typography } from '@mui/material';
import { FormFields } from '../../../../../components/ui/FormFields';
import { USER_FIELDS } from '@/types/users/UserFields';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import { ActionsButtons } from '@/components/ui/ActionsButtons';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/components/hooks/useUser';
import { SkeletonTable } from '@/components/ui/SkeletonTable';
import { notify } from '@/lib/notify';

export default function CreateOrEditUserScreen() {
  const {
    control,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<UserFormValues>({
    resolver: joiResolver(userSchema),
    defaultValues: {
      per_txt_first_name: '',
      per_txt_last_name: '',
      per_txt_dni: '',
      per_int_gender: undefined,
      per_txt_email: '',
      per_txt_address: '',
      per_dat_birthdate: undefined,
      per_txt_phone: '',
      roles: [],
      usr_sta_state: 0,
    },
  });
  const router = useRouter();
  const { userId } = useParams();
  const { user, loading, error } = useUser({ userId: userId as string });

  useEffect(() => {
    if (user) {
      const payload: UserFormValues = {
        per_txt_first_name: user.person_data?.per_txt_first_name ?? '',
        per_txt_last_name: user.person_data?.per_txt_last_name ?? '',
        per_txt_dni: user.person_data?.per_txt_dni ?? '',
        per_int_gender: user.person_data?.per_int_gender ?? undefined,
        per_txt_email: user.person_data?.per_txt_email ?? '',
        per_txt_address: user.person_data?.per_txt_address ?? '',
        per_dat_birthdate: user.person_data?.per_dat_birthdate ?? undefined,
        per_txt_phone: user.person_data?.per_txt_phone ?? '',
        roles: user.roles?.map((role) => role) || [],
        usr_sta_state: user.usr_sta_state ?? 0,
      };
      reset(payload);
    }
  }, [user, reset]);

  useEffect(() => {
    if (error) {
      notify.error(error);
    }
  }, [error]);

  if (loading) {
    return <SkeletonTable />;
  }

  const handleFormSubmit = (data: UserFormValues) => {
    // Aquí puedes manejar la lógica para crear o editar el usuario, por ejemplo:
    console.log('Datos del formulario:', data);
  };
  return (
    <div className="p-4 md:p-6">
      <TitleCard
        title={userId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        description={
          userId
            ? 'Aquí puedes editar un usuario existente. Completa el formulario con la información del usuario, asigna roles y permisos según sea necesario, y guarda los cambios para actualizar la configuración de usuarios del sistema.'
            : 'Aquí puedes crear un nuevo usuario. Completa el formulario con la información del usuario, asigna roles y permisos según sea necesario, y guarda los cambios para actualizar la configuración de usuarios del sistema.'
        }
      />
      <CustomCard>
        {/* Aquí puedes agregar el formulario para crear o editar un usuario */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <PersonIcon color="primary" />
              <Typography color="textSecondary" variant="h6">
                Información personal
              </Typography>
            </div>
            <div className="mt-4">
              <FormFields<UserFormValues>
                control={control}
                errors={errors}
                fields={USER_FIELDS.personalInformation}
              />
            </div>
          </div>
          <Divider />
          <div className="p-6">
            <div className="flex items-center gap-2">
              <AdminPanelSettingsIcon color="primary" />
              <Typography color="textSecondary" variant="h6">
                Control de acceso
              </Typography>
            </div>
            <div className="mt-4">
              <FormFields<UserFormValues>
                control={control}
                errors={errors}
                fields={USER_FIELDS.accessControl}
              />
            </div>
          </div>
          <Divider />
          <div className="p-6">
            <div className="flex items-center gap-2">
              <SettingsIcon color="primary" />
              <Typography color="textSecondary" variant="h6">
                Configuración de la cuenta
              </Typography>
            </div>
            <div className="mt-4">
              <FormFields<UserFormValues>
                control={control}
                errors={errors}
                fields={USER_FIELDS.accountSettings}
              />
            </div>
          </div>
          <div>
            <ActionsButtons
              confirmButtonLabel={userId ? 'Guardar cambios' : 'Crear usuario'}
              cancelButtonLabel="Cancelar"
              type="submit"
              router={router}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </CustomCard>
    </div>
  );
}
