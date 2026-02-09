'use client';

import { SideBar } from '@/components/ui/SideBar';
import { useAppSelector } from '@/store/hook';
import { SideBarItem } from '@/types/layout/SideBarItem';
import { getPathname } from '@/utils/getPathname';
import { getSubModules } from '@/utils/getSubModules';
import { usePathname } from 'next/navigation';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const LAYOUT_KEY = getPathname(pathname); // Obtiene la primera parte de la ruta para identificar el módulo
  const modules = useAppSelector((s) => s.moduleStore.modules);
  const NAV_ITEMS: SideBarItem[] = getSubModules(modules, LAYOUT_KEY);
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <SideBar
        pathname="/settings"
        navItems={NAV_ITEMS}
        title="Configuración"
        subTitle="Administra tus preferencias"
      />
      {/* Content */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
