import { FilterParams } from '@/types/api/FilterParams';
import { AnyObject } from '@/types/commons/AnyObject';
import { ScreenLayoutProps } from '@/types/layout/ScreenLayoutProps';
import { useState } from 'react';

export const useScreenLayout = ({ fetchData, mapData }: ScreenLayoutProps) => {
  const [rows, setRows] = useState<AnyObject[]>([]);
  const [totalCounts, setTotalCounts] = useState<number>(0);
  const [searchValue, setSearchValue] = useState('');
  const [orderBy, setOrderBy] = useState<string | string[]>('id');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async ({
    searchValue,
    orderBy,
    direction,
    page,
    rowsPerPage,
  }: FilterParams = {}) => {
    setIsLoading(true);

    try {
      const data = await fetchData({ searchValue, orderBy, direction, page, rowsPerPage });
      if (data) {
        const mappedData = data.map(mapData);
        setRows(mappedData);
        setTotalCounts(mappedData.length);
      }
    } catch {
      setRows([]);
      setTotalCounts(0);
    }

    setIsLoading(false);
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      loadData({ searchValue, orderBy, direction, page, rowsPerPage });
    }
  };

  return {
    rows,
    totalCounts,
    searchValue,
    orderBy,
    direction,
    page,
    rowsPerPage,
    isLoading,
    setSearchValue,
    setOrderBy,
    setDirection,
    setPage,
    setRowsPerPage,
    loadData,
    onKeyUp,
  };
};
