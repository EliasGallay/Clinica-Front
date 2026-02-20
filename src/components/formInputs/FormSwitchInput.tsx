import { FormHelperText, InputLabel, Switch, SwitchProps, Typography } from '@mui/material';
import { HookFormProps } from '@/types/forms/HookFormProps';
import { Controller, FieldValues } from 'react-hook-form';

interface FormSwitchInputProps extends SwitchProps, HookFormProps<FieldValues> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

export const FormSwitchInput = (props: FormSwitchInputProps) => {
  const { label, helperText, error = false, control, name, disabled = false, ...rest } = props;

  return (
    <div>
      <div className="mb-2">
        {label && (
          <InputLabel id={`${rest.id}-label`}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: 'var(--mui-palette-text-secondary)',
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
          return <Switch {...field} disabled={disabled} {...rest} />;
        }}
      />
      {helperText && (
        <FormHelperText error={error} sx={{ mt: 0 }}>
          <Typography variant="body5">{helperText}</Typography>
        </FormHelperText>
      )}
    </div>
  );
};
