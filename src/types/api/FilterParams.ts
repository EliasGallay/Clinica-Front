export interface FilterParams {
  searchValue?: string;
  orderBy?: string | string[];
  direction?: 'asc' | 'desc';
  page?: number;
  rowsPerPage?: number;
}
