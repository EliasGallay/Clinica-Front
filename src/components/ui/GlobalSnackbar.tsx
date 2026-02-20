'use client';

import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { dequeueSnackbar, removeSnackbar } from '@/store/notificationSlice';

export default function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.notificationStore.queue[0]);

  const open = Boolean(current);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    // evita cerrar por clickaway si querés
    if (reason === 'clickaway') return;

    if (!current) return;
    dispatch(removeSnackbar(current.id));
    dispatch(dequeueSnackbar());
  };

  if (!current) return null;

  return (
    <Snackbar
      key={current.id}
      open={open}
      onClose={handleClose}
      autoHideDuration={current.persist ? null : (current.autoHideDuration ?? 4000)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={current.severity ?? 'info'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {current.message}
      </Alert>
    </Snackbar>
  );
}
