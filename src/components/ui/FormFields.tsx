import { FormTextInput } from '@/components/formInputs/FormTextInput';
import { AnyObject } from '@/types/commons/AnyObject';
import { FieldConfig } from '@/types/commons/FieldConfig';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

interface FormFieldsProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  fields?: FieldConfig<T>[];
}

export function FormFields<T extends FieldValues>({
  control,
  errors = {},
  fields,
}: FormFieldsProps<T>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields?.map((field) => {
        if (field.hidden) return null;
        return (
          <FormTextInput
            key={String(field.key)}
            id={String(field.key)}
            name={String(field.key)}
            label={field.label}
            type={field.type || 'text'}
            control={control}
            error={!!errors[field.key as keyof typeof errors]}
            helperText={
              typeof errors[field.key as keyof typeof errors] === 'string'
                ? errors[field.key as keyof typeof errors]
                : (errors[field.key as keyof typeof errors] as AnyObject)?.message?.toString() || ''
            }
          />
        );
      })}
    </div>
  );
}
