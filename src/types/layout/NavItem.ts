import { SideBarItem } from "./SideBarItem";

export type NavItem = { 
  mod_id: number;
  mod_txt_key: string;
  mod_txt_name: string;
  mod_path_to: string;
  mod_int_order: number;
  mod_sta_state: boolean | number;
  mod_dat_created_at: string;
  mod_dat_updated_at: string;
  mod_dat_deleted_at: string | null;
  mod_submodules?: SideBarItem[];
 };
