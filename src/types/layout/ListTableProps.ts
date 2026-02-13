import { AnyObject } from '../commons/AnyObject';

export interface ListTableProps {
  showActionButton?: boolean;
  actionButtonLabel?: string;
  headCells: AnyObject[];
  rows?: AnyObject[];
  columns?: AnyObject[];
  message: string;
  searchValue?: string;
  totalCounts?: number;
  orderBy?: string | string[];
  direction?: 'asc' | 'desc';
  page?: number;
  rowsPerPage?: number;
  onSearchChange?: (value: string) => void;
  setOrderBy?: (orderBy: string) => void;
  setDirection?: (direction: 'asc' | 'desc') => void;
  setPage?: (page: number) => void;
  setRowsPerPage?: (rowsPerPage: number) => void;
  onRowClick?: (row: AnyObject) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
