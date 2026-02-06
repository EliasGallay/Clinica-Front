'use client';

import { useForm } from 'react-hook-form';
import { LoginSchema } from '../_schema/LoginSchema';
import { joiResolver } from '@hookform/resolvers/joi';
import { FormTextInput } from '@/components/formInputs/FormTextInput';
import { LoginFormValues } from '@/types/login/LoginFormValues';
import { Typography } from '@mui/material';
import { useLogin } from '@/components/hooks/useLogin';

export default function LoginForm() {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: joiResolver(LoginSchema),
    defaultValues: {
      email: 'admin@clinica.it.com',
      password: 'Password123!',
    },
  });
  const { handleLogin, loading, error } = useLogin();
  async function onSubmit(data: LoginFormValues) {
    console.log('🚀 ~ onSubmit ~ data:', data);
    handleLogin(data);
  }

  return (
    <div className="flex flex-col gap-6 pt-12 lg:pt-0">
      <div className="flex flex-col items-center">
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Iniciar Sesión
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          Ingresa tus credenciales para acceder a tu cuenta.
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormTextInput
          id="email"
          name="email"
          label="Email"
          type="email"
          control={control}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message?.toString() : ''}
        />
        <FormTextInput
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          control={control}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message?.toString() : ''}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-2 bg-blue-500 text-white rounded-lg cursor-pointer disabled:opacity-50 hover:bg-blue-600 transition-colors mt-4 mt-6"
        >
          {isSubmitting ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
