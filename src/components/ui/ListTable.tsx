'use client';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { TextInput } from './TextInput';
import {
  Button,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { ListTableProps } from '@/types/layout/ListTableProps';
import { grey } from '@mui/material/colors';
import theme from '@/theme/theme';
import { AnyObject } from '@/types/commons/AnyObject';
import { get } from 'lodash';

export const ListTable: React.FC<ListTableProps> = ({
  showActionButton = true,
  actionButtonLabel,
  headCells,
  rows = [],
  columns,
  message,
  onRowClick,
}) => {
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
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" className="text-slate-500" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>

        {/* Action Button */}
        {showActionButton && (
          <Button
            variant="contained"
            color="primary"
            className="ml-2"
            startIcon={<AddIcon />}
            disabled={!actionButtonLabel}
          >
            {actionButtonLabel}
          </Button>
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
                  direction="asc"
                  onClick={() => {}}
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
      </Table>
    </div>
  );
};
