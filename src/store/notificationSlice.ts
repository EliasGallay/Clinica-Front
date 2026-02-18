// src/store/notificationsSlice.ts
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error';

export type SnackbarItem = {
  id: string;
  message: string;
  severity?: SnackbarSeverity;
  autoHideDuration?: number; // ms
  persist?: boolean;         // si querés que no se cierre solo
};

type NotificationsState = {
  queue: SnackbarItem[];
};

const initialState: NotificationsState = {
  queue: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    enqueueSnackbar: {
      reducer(state, action: PayloadAction<SnackbarItem>) {
        state.queue.push(action.payload);
      },
      prepare(payload: Omit<SnackbarItem, 'id'>) {
        return { payload: { id: nanoid(), ...payload } };
      },
    },
    dequeueSnackbar(state) {
      state.queue.shift();
    },
    removeSnackbar(state, action: PayloadAction<string>) {
      state.queue = state.queue.filter((x) => x.id !== action.payload);
    },
    clearAll(state) {
      state.queue = [];
    },
  },
});

export const {
  enqueueSnackbar,
  dequeueSnackbar,
  removeSnackbar,
  clearAll,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
