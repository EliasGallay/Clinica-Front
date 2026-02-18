import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moduleReducer from './moduleSlice';
import notificationReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    moduleStore: moduleReducer,
    notificationStore: notificationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
