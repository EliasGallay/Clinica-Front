// src/lib/notify.ts
import { store } from '@/store/index';
import { enqueueSnackbar } from '@/store/notificationSlice';

export const notify = {
  success: (message: string, persist: boolean = false, autoHideDuration: number = 3000) =>
    store.dispatch(enqueueSnackbar({ message, severity: 'success', persist, autoHideDuration })),
  error: (message: string, persist: boolean = false, autoHideDuration: number = 3000) =>
    store.dispatch(enqueueSnackbar({ message, severity: 'error', persist, autoHideDuration })),
  info: (message: string, persist: boolean = false, autoHideDuration: number = 3000) =>
    store.dispatch(enqueueSnackbar({ message, severity: 'info', persist, autoHideDuration })),
  warning: (message: string, persist: boolean = false, autoHideDuration: number = 3000) =>
    store.dispatch(enqueueSnackbar({ message, severity: 'warning', persist, autoHideDuration })),
};
