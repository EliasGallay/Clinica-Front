import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export const TextInput: React.FC<TextFieldProps> = (props) => {
  const { error = false, variant = 'outlined', type = 'text', label, ...rest } = props;
  return (
    <TextField
      error={error}
      variant={variant}
      type={type}
      label={rest.select ? label : ''}
      {...rest}
    />
  );
};
