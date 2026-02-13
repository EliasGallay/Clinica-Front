import { Menu, MenuItem, MenuList, Typography } from '@mui/material';
import { ListTable } from '@/components/ui/ListTable';
import { ScreenLayoutTableProps } from '@/types/layout/ScreenLayoutTableProps';
import { useEffect } from 'react';
import { useScreenLayout } from '../hooks/useScreenLayout';

export const ScreenLayoutTable: React.FC<ScreenLayoutTableProps> = ({
  headers,
  columns,
  message,
  anchorEl,
  openMenuId,
  menuOptions,
  setOpenMenuId,
  mapData,
  fetchData,
}) => {
  const {
    rows,
    totalCounts,
    searchValue,
    orderBy,
    direction,
    page,
    rowsPerPage,
    setSearchValue,
    setOrderBy,
    loadData,
    setDirection,
    setPage,
    setRowsPerPage,
    onKeyUp,
  } = useScreenLayout({ fetchData, mapData });

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg my-6">
        {/* Aquí iría el componente o la lógica para gestionar los usuarios */}
        <ListTable
          showActionButton={true}
          actionButtonLabel="Agregar Usuario"
          headCells={headers}
          rows={rows}
          columns={columns}
          message={message ?? 'No hay usuarios para mostrar.'}
          totalCounts={totalCounts}
          searchValue={searchValue}
          onSearchChange={(value) => setSearchValue(value)}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setDirection={setDirection}
          direction={direction}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          onKeyUp={onKeyUp}
        />
      </div>
      {/* MENU VERTICAL */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(openMenuId)}
        onClose={() => setOpenMenuId(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList>
          {menuOptions?.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                if (openMenuId) {
                  option.action(openMenuId);
                }
                setOpenMenuId(null);
              }}
            >
              <div className="flex items-center gap-3">
                {option.icon}
                <Typography variant="body1" color={option.color}>
                  {option.label}
                </Typography>
              </div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};
