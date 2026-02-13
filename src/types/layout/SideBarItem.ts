export type SideBarItem = {
  sub_id: number;
  mod_id: number;
  sub_txt_key: string;
  sub_txt_name: string;
  sub_path_to: string;
  sub_icon: string;
  sub_int_order: number;
  sub_sta_state: boolean | number;
  sub_dat_created_at: string;
  sub_dat_updated_at: string;
  sub_dat_deleted_at: string | null;
};
