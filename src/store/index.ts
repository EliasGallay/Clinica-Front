import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moduleReducer from './moduleSlice';

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    moduleStore: moduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
