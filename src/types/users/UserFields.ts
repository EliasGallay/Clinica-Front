import { FieldConfig } from '../commons/FieldConfig';
import { UserFormValues } from './UserFormValues';

export const USER_FIELDS: { [key: string]: FieldConfig<UserFormValues>[] } = {
  personalInformation: [
    { key: 'per_txt_first_name', label: 'Nombre' },
    { key: 'per_txt_last_name', label: 'Apellido' },
    { key: 'per_txt_dni', label: 'DNI' },
    { key: 'per_int_gender', label: 'Género' },
    { key: 'per_txt_email', label: 'Email', type: 'email' },
    { key: 'per_txt_address', label: 'Dirección' },
    { key: 'per_dat_birthdate', label: 'Fecha de nacimiento', type: 'date' },
    { key: 'per_txt_phone', label: 'Teléfono', type: 'tel' },
  ],
  accessControl: [
    { key: 'roles', label: 'Rol', type: 'select', options: [] }, // Las opciones se cargarán dinámicamente
  ],
  accountSettings: [
    {
      key: 'usr_sta_state',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 1, label: 'Activo' },
        { value: 0, label: 'Inactivo' },
      ],
    },
  ],
};
