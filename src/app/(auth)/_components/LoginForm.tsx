'use client';

import { useForm } from 'react-hook-form';
import { LoginSchema } from '../_schema/LoginSchema';
import { joiResolver } from '@hookform/resolvers/joi';
import { FormTextInput } from '@/components/formInputs/FormTextInput';
import { LoginFormValues } from '@/types/login/LoginFormValues';

export default function LoginForm() {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: joiResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  async function onSubmit(data: LoginFormValues) {
    console.log('🚀 ~ onSubmit ~ data:', data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        style={{
          padding: 10,
          borderRadius: 10,
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
      >
        {isSubmitting ? 'Ingresando...' : 'Entrar'}
      </button>
    </form>
  );
}
