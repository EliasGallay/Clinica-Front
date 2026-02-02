import {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

export type HookFormProps<TFieldValues extends FieldValues = FieldValues> = {
  control?: Control<TFieldValues>;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
  setValue?: UseFormSetValue<TFieldValues>;
  reset?: UseFormReset<TFieldValues>;
  clearErrors?: UseFormClearErrors<TFieldValues>;
  isSubmitting?: boolean;
  getValues?: UseFormGetValues<TFieldValues>;
  setError?: UseFormSetError<FieldError>;
};
