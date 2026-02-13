import { NavItem } from '@/types/layout/NavItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModuleState = {
  modules: NavItem[];
};

const initialState: ModuleState = {
  modules: [],
};

const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<NavItem[]>) => {
      state.modules = action.payload;
    },
    clearModules(state) {
      state.modules = [];
    },
  },
});

export const { setModules, clearModules } = moduleSlice.actions;

export default moduleSlice.reducer;
