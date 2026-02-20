export type FieldConfig<T> = {
  key: keyof T;
  label: string;
  type?: 'text' | 'email' | 'date' | 'tel' | 'select';
  disabled?: boolean;
  options?: { label: string; value: string | number }[]; // para select
  hidden?: boolean;
};
