'use client';

import AddIcon from '@mui/icons-material/Add';
import { TextInput } from './TextInput';
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { ListTableProps } from '@/types/layout/ListTableProps';
import { grey } from '@mui/material/colors';
import theme from '@/theme/theme';
import { AnyObject } from '@/types/commons/AnyObject';
import { get } from 'lodash';
import Search from '@mui/icons-material/Search';
import Clear from '@mui/icons-material/Clear';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ListTable: React.FC<ListTableProps> = ({
  showActionButton = true,
  actionButtonLabel,
  headCells,
  rows = [],
  columns,
  message,
  searchValue = '',
  totalCounts = 0,
  orderBy,
  direction,
  page,
  rowsPerPage,
  onSearchChange,
  setOrderBy,
  setDirection,
  setPage,
  setRowsPerPage,
  onRowClick,
  onKeyUp,
}) => {
  const pathname = usePathname();
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage!(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage!(parseInt(event.target.value, 10));
    setPage!(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && direction === 'asc';
    setDirection!(isAsc ? 'desc' : 'asc');
    setOrderBy!(property);
  };

  const handleClear = () => {
    onSearchChange && onSearchChange('');
    onKeyUp &&
      onKeyUp({
        key: 'Enter',
      } as React.KeyboardEvent<HTMLInputElement>);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        {/* Search */}
        <div role="search" className=" w-full md:w-[500px] ">
          <TextInput
            placeholder="Buscar…"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <>
                      {searchValue && (
                        <>
                          <IconButton onClick={handleClear}>
                            <Clear fontSize="small" />
                          </IconButton>
                          <Divider
                            sx={{
                              height: 20,
                              borderColor: 'lightGrey.main',
                              mr: 2,
                            }}
                            orientation="vertical"
                          />
                        </>
                      )}
                      <IconButton
                        onClick={() => {
                          const newSearchValue = searchValue;
                          onSearchChange && onSearchChange(newSearchValue);
                          onKeyUp &&
                            onKeyUp({
                              key: 'Enter',
                            } as React.KeyboardEvent<HTMLInputElement>);
                        }}
                      >
                        <Search />
                      </IconButton>
                    </>
                  </InputAdornment>
                ),
              },
            }}
            value={searchValue}
            onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
            onKeyUp={onKeyUp}
          />
        </div>

        {/* Action Button */}
        {showActionButton && (
          <Link href={pathname + '/create'}>
            <Button
              variant="contained"
              color="primary"
              className="ml-2"
              startIcon={<AddIcon />}
              disabled={!actionButtonLabel}
            >
              {actionButtonLabel}
            </Button>
          </Link>
        )}
      </div>
      <Divider />
      {/* Aquí iría la tabla o lista de elementos */}
      <Table>
        <TableHead sx={{ backgroundColor: grey[50] }}>
          <TableRow>
            {headCells.map((cell, index) => (
              <TableCell
                key={index}
                padding={cell.padding || 'normal'}
                width={cell.width}
                align={cell.align || 'left'}
              >
                <TableSortLabel
                  hideSortIcon={cell.hideSortIcon}
                  disabled={cell.hideSortIcon}
                  direction={direction}
                  onClick={handleRequestSort.bind(null, cell.id)}
                >
                  <Typography variant="subtitle2" color={grey[800]}>
                    {cell.label}
                  </Typography>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Aquí irían las filas de la tabla, probablemente mapeando sobre un array de datos */}
          {rows?.map((row, index) => (
            <TableRow
              key={`${index}-${row.id}`}
              tabIndex={-1}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns?.map((column: AnyObject) => {
                const value = get(row, column.id);
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      ...theme.typography.body1,
                    }}
                  >
                    <>
                      {column.render
                        ? column.render(value as AnyObject, row)
                        : (value as AnyObject)}
                    </>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns?.length} align="center">
                <Typography textAlign={'center'} fontWeight={600} variant="body1">
                  {message}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          {/* Aquí podrías agregar paginación u otros elementos de pie de tabla */}
          <TableRow>
            <TableCell colSpan={columns?.length} padding="checkbox">
              <TablePagination
                component="div"
                count={totalCounts}
                page={page || 0}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage || 10}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  color: grey[700],
                }}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
