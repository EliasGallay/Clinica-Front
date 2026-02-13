import { FieldConfig } from './ProfileField';
import { ProfileFormValues } from './ProfileFormValues';

export const PROFILE_FIELDS: FieldConfig<ProfileFormValues>[] = [
  { key: 'firstName', label: 'Nombre' },
  { key: 'lastName', label: 'Apellido' },
  { key: 'dni', label: 'DNI' },
  { key: 'gender', label: 'Género' },
  { key: 'email', label: 'Email', type: 'email', disabled: true },
  { key: 'address', label: 'Dirección' },
  { key: 'birthdate', label: 'Fecha de nacimiento', type: 'date' },
  { key: 'phoneNumber', label: 'Teléfono', type: 'tel' },
  { key: 'rol', label: 'Rol', disabled: true },
  { key: 'employeeId', label: 'Legajo' },
  { key: 'specialty', label: 'Especialidad' },
];
