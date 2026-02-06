'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmergencyOutlinedIcon from '@mui/icons-material/EmergencyOutlined';
import { useAppSelector } from '@/store/hook';
import { useLogout } from '../hooks/useLogout';
import { NavItem } from '@/types/layout/NavItem';

const NAV_ITEMS: NavItem[] = [
  { mod_txt_name: 'Dashboard', mod_path_to: '/dashboard' },
  { mod_txt_name: 'Gestion', mod_path_to: '/gestion' },
  { mod_txt_name: 'Settings', mod_path_to: '/settings' },
];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useAppSelector((s) => s.userStore).user;
  const { handleLogout } = useLogout();

  const onOpenMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const onCloseMenu = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" elevation={0} sx={{ boxShadow: 'none !important' }}>
      <Toolbar className="min-h-[64px] px-3 sm:px-6">
        {/* Left: Logo + Branding */}
        <Box className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <EmergencyOutlinedIcon fontSize="large" color="primary" />

            <Box className="hidden sm:block">
              <Typography variant="h6" className="text-[var(--mui-palette-text-primary)]">
                Clínica Backoffice
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Center: Nav items */}
        <Box className="md:flex items-center justify-end gap-1 ml-6">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.mod_path_to}
              component={Link}
              href={item.mod_path_to}
              variant="text"
              className="normal-case hover:bg-slate-100"
              sx={{ borderRadius: 2, px: 1.5 }}
            >
              <Typography variant="body2" className="text-[var(--mui-palette-text-primary)]">
                {item.mod_txt_name}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Search */}
        <Box
          className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 w-[100px] md:w-[250px]"
          role="search"
        >
          <SearchIcon fontSize="small" className="text-slate-500" />
          <InputBase
            placeholder="Buscar…"
            className="w-full text-slate-700"
            inputProps={{ 'aria-label': 'Buscar' }}
          />
        </Box>

        {/* Right: Profile */}
        <Box className="flex items-center gap-2 ml-3">
          <Tooltip title="Perfil">
            <IconButton onClick={onOpenMenu} size="small" className="hover:bg-slate-100">
              <Avatar sx={{ width: 34, height: 34 }} alt="Perfil" src="" />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onCloseMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              className: 'rounded-2xl border border-slate-200 shadow-sm',
              sx: { minWidth: 220, mt: 1 },
            }}
          >
            <Box className="px-4 py-3">
              <Typography className="text-slate-900 font-semibold leading-tight">
                {user?.usr_txt_email || 'Usuario'}
              </Typography>
              <Typography className="text-slate-500 text-sm">
                {user?.roles?.join(', ').toUpperCase() || 'Rol no asignado'}
              </Typography>
            </Box>

            <Divider />

            <MenuItem
              onClick={onCloseMenu}
              component={Link}
              href="/profile"
              className="text-slate-700"
            >
              Mi perfil
            </MenuItem>

            <MenuItem
              onClick={async () => {
                onCloseMenu();
                handleLogout();
              }}
              className="text-red-600"
            >
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
