import { AnyObject } from '../commons/AnyObject';

export interface ScreenLayoutTableProps {
  headers: AnyObject[];
  columns: AnyObject[];
  message?: string;
  anchorEl: HTMLElement | null;
  openMenuId: string | null;
  menuOptions?: {
    label: string;
    icon: React.ReactNode;
    color: string;
    action: (id: string) => void;
  }[];
  setOpenMenuId: (id: string | null) => void;
  fetchData: (filters: AnyObject) => Promise<AnyObject[] | void>;
  mapData: (data: AnyObject) => AnyObject;
}
