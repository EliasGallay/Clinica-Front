import { SideBar } from '@/components/ui/SideBar';
import { SideBarItem } from '@/types/layout/SideBarItem';

const NAV_ITEMS: SideBarItem[] = [
  {
    sub_txt_name: 'Estado General',
    sub_path_to: '/overview',
    sub_icon: 'DashboardOutlinedIcon',
  }
];

export default function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <SideBar pathname="/dashboard" navItems={NAV_ITEMS} title="Dashboard" subTitle="Vista general de la aplicación" />
      {/* Content */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}