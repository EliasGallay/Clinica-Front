'use client';

import { useRoles } from '@/components/hooks/useRoles';
import ContentCard from '@/components/ui/ContentCard';
import TitleCard from '@/components/ui/TitleCard';
import { firstLetterCapitalize } from '@/utils/firstLetterCapitalize';
import { useEffect, useMemo, useState } from 'react';
import { PermissionDetail } from './PermissionDetail';
import { SkeletonTable } from '@/components/ui/SkeletonTable';
import { notify } from '@/lib/notify';

export default function PermissionScreen() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const { roles, loading, error } = useRoles();

  const tabs = useMemo(
    () =>
      roles.map((role) => ({
        label: firstLetterCapitalize(role.rol_name),
        key: role.id,
      })),
    [roles]
  );

  const safeIndex = tabs.length === 0 ? 0 : Math.min(selectedTabIndex, tabs.length - 1);

  const roleId = tabs[safeIndex]?.key;

  useEffect(() => {
    if (error) {
      notify.error(error);
    }
  }, [error]);

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
  };

  if (loading) {
    return <SkeletonTable />;
  }

  return (
    <div className="p-4 md:p-6">
      <TitleCard
        title="Configuración de Perfil"
        description="Aquí puedes actualizar tu información personal, cambiar tu contraseña y configurar tus preferencias de notificación."
      />

      <ContentCard tabs={tabs} selectedTabIndex={safeIndex} onTabChange={handleTabChange}>
        {roleId ? <PermissionDetail roleId={roleId} /> : null}
      </ContentCard>
    </div>
  );
}
