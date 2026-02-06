import { ProfileFormValues } from '@/types/profile/ProfileFormValues';
import { joiResolver } from '@hookform/resolvers/joi';
import { Avatar, Button, Chip, Divider, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { ProfileSchema } from '../_schema/ProfileSchema';
import { useAppSelector } from '@/store/hook';
import { useEffect } from 'react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { ProfileFormFields } from './ProfileFormFields';

export default function Profile() {
  const user = useAppSelector((state) => state.userStore.user);
  const {
    control,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<ProfileFormValues>({
    resolver: joiResolver(ProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dni: '',
      gender: '',
      birthdate: '',
      rol: '',
      phoneNumber: '',
      address: '',
      photo: '',
      employeeId: '',
      employeeState: false,
      specialty: '',
      state: false,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.person_data?.per_txt_first_name || '',
        lastName: user.person_data?.per_txt_last_name || '',
        email: user.person_data?.per_txt_email || '',
        rol: user.roles[0] || '',
        phoneNumber: user.person_data?.per_txt_phone || '',
        address: user.person_data?.per_txt_address || '',
        photo: user.person_data?.per_txt_photo || '',
        employeeId: user.doctor_data?.doc_txt_employee_id || '',
        specialty: user.doctor_data?.doc_txt_specialty || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    // Aquí puedes manejar la lógica para actualizar el perfil del usuario
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6">
        {/* Avatar */}
        <div className="flex gap-10 pb-4">
          <Avatar sx={{ bgcolor: deepOrange[200], width: 100, height: 100 }} alt="User Avatar">
            User
          </Avatar>
          <div className="flex flex-col">
            <div>
              <Typography variant="h6">Tu foto de perfil</Typography>
              <Typography variant="body2" color="textSecondary">
                Puedes subir una foto para personalizar tu perfil.
              </Typography>
            </div>
            <div>
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                <Typography variant="button">Subir Foto</Typography>
              </Button>
            </div>
          </div>
        </div>

        <Divider />
        <ProfileFormFields control={control} errors={errors} />
        {/* ACCOUNT VERIFIED */}
        <div className="mt-10 mb-5 flex bg-green-50 p-4 rounded-lg items-center justify-between border border-green-200">
          <div className="flex items-center gap-4">
            <VerifiedUserIcon color="success" sx={{ fontSize: 40 }} />
            <div className="flex flex-col">
              <Typography variant="subtitle1" fontWeight={700}>
                Cuenta Verificada
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Tu cuenta ha sido verificada por el administrador.
              </Typography>
            </div>
          </div>
          <div>
            <Chip label="Verificada" color="success" sx={{ ml: 4 }} />
          </div>
        </div>
        <Divider />
        <div className="flex justify-end">
          <Button variant="text" sx={{ mr: 2 }} disabled={isSubmitting}>
            <Typography variant="button" color="var(--mui-palette-grey-500)">
              Cancelar
            </Typography>
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
}
