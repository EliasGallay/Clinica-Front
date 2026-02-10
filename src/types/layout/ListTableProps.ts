import { AnyObject } from '../commons/AnyObject';

export interface ListTableProps {
  showActionButton?: boolean;
  actionButtonLabel?: string;
  headCells: AnyObject[];
  rows?: AnyObject[];
  columns?: AnyObject[];
  message: string;
  onRowClick?: (row: AnyObject) => void;
}
