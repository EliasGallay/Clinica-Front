'use client';

import { SideBarItem } from '@/types/layout/SideBarItem';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { iconComponents } from '@/utils/IconComponents';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';

function isActive(pathname: string, href: string, pathnameRouter: string): boolean {
  return pathnameRouter === `${pathname}${href}`;
}

export function SideBar({
  pathname,
  onNavigate,
  navItems,
  title,
  subTitle,
}: {
  pathname: string;
  onNavigate?: () => void;
  navItems: SideBarItem[];
  title?: string;
  subTitle?: string;
}) {
  const pathnameRouter = usePathname();
  return (
    <Box className="px-2 py-2 bg-white" sx={{ width: '300px !important' }}>
      <Box className="px-3 py-2 mb-4 ">
        <Typography variant="h6" fontWeight={600} color="var(--mui-palette-text-primary)">
          {title}
        </Typography>
        <Typography variant="body2" color="var(--mui-palette-text-secondary)">
          {subTitle}
        </Typography>
      </Box>
      <List sx={{ px: 3 }} className="flex flex-col gap-3">
        {navItems.map((item) => {
          const active = isActive(pathname, item.sub_path_to, pathnameRouter);
          return (
            <Button
              key={item.sub_path_to}
              href={`${pathname}${item.sub_path_to}`}
              component={Link}
              onClick={onNavigate}
              variant={active ? 'contained' : 'outlined'}
              startIcon={
                iconComponents[item.sub_icon] && React.createElement(iconComponents[item.sub_icon])
              }
              sx={{
                backgroundColor: active ? 'var(--mui-palette-primary-main)' : 'transparent',
                borderRadius: 0.5,
                boxShadow: active ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
                justifyContent: 'flex-start',
                border: 'none',
                '& .MuiButton-icon': {
                  minWidth: 25,
                  color: active
                    ? 'var(--mui-palette-primary-contrastText)'
                    : 'var(--mui-palette-text-secondary)',
                },
                '& .MuiTypography-root': {
                  fontWeight: active ? 700 : 600,
                  color: active
                    ? 'var(--mui-palette-primary-contrastText)'
                    : 'var(--mui-palette-text-secondary)',
                },
                '&:hover': {
                  backgroundColor: active
                    ? 'var(--mui-palette-primary-main)'
                    : 'var(--mui-palette-action-hover)',
                },
              }}
            >
              <Typography variant="subtitle1">{item.sub_txt_name}</Typography>
            </Button>
          );
        })}
      </List>
    </Box>
  );
}
