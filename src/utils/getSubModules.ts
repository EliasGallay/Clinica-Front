import { NavItem } from '@/types/layout/NavItem';

export const getSubModules = (modules: NavItem[], layoutKey: string) => {
  return modules?.find((m) => m.mod_txt_key === layoutKey)?.mod_submodules || [];
};
