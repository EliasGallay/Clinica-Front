import { SideBar } from '@/components/ui/SideBar';
import { SideBarItem } from '@/types/layout/SideBarItem';

const NAV_ITEMS: SideBarItem[] = [
  {
    sub_txt_name: 'Perfil',
    sub_path_to: '/profile',
    sub_icon: 'SettingsSuggestOutlinedIcon',
  },
   {
    sub_txt_name: 'Usuarios',
    sub_path_to: '/users',
    sub_icon: 'PeopleOutlineOutlinedIcon',
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <SideBar pathname="/settings" navItems={NAV_ITEMS} title="Configuración" subTitle="Administra tus preferencias" />
      {/* Content */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
