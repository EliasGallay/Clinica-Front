import { FormTextInput } from '@/components/formInputs/FormTextInput';
import { AnyObject } from '@/types/commons/AnyObject';
import { PROFILE_FIELDS } from '@/types/profile/ProfileFields';
import { ProfileFormValues } from '@/types/profile/ProfileFormValues';
import { Control, FieldErrors } from 'react-hook-form';

interface ProfileFormFieldsProps {
  control: Control<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
}

export function ProfileFormFields({ control, errors = {} }: ProfileFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PROFILE_FIELDS.map((field) => {
        if (field.hidden) return null;
        return (
          <FormTextInput
            key={field.key}
            id={field.key}
            name={field.key}
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
