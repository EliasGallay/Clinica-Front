import { FormHelperText, InputLabel, TextFieldProps, Typography } from '@mui/material';
import { TextInput } from '../ui/TextInput';
import { HookFormProps } from '@/types/forms/HookFormProps';
import { Controller, FieldValues } from 'react-hook-form';

export const FormTextInput = <TFieldValues extends FieldValues = FieldValues>(
  props: TextFieldProps & HookFormProps<TFieldValues>
) => {
  const {
    variant = 'outlined',
    type = 'text',
    label,
    helperText,
    error = false,
    control,
    name,
    disabled = false,
    ...rest
  } = props;

  return (
    <>
      <div>
        {label && (
          <InputLabel id={`${rest.id}-label`}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              {label}
            </Typography>
          </InputLabel>
        )}
      </div>
      <Controller
        control={control}
        name={(name || '') as never}
        disabled={disabled}
        render={({ field }) => {
          return (
            <TextInput {...field} variant={variant} type={type} error={error} fullWidth {...rest} />
          );
        }}
      />
      {helperText && (
        <FormHelperText error={error} sx={{ mt: 0 }}>
          <Typography variant="body5">{helperText}</Typography>
        </FormHelperText>
      )}
    </>
  );
};
