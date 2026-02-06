'use client';
// app/settings/profile/page.tsx

import ContentCard from '@/components/ui/ContentCard';
import React from 'react';
import Profile from './_components/Profile';
import TitleCard from '@/components/ui/TitleCard';

const tabs = [
  {
    label: 'Información Personal',
    key: 'personal_info',
  },
  {
    label: 'Seguridad',
    key: 'security',
  },
  {
    label: 'Notificaciones',
    key: 'notifications',
  },
];
export default function ProfileSettings() {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
  };
  return (
    <div className="p-4 md:p-6">
      <TitleCard
        title="Configuración de Perfil"
        description="Aquí puedes actualizar tu información personal, cambiar tu contraseña y configurar tus preferencias de notificación."
      />

      <ContentCard tabs={tabs} selectedTabIndex={selectedTabIndex} onTabChange={handleTabChange}>
        {(() => {
          switch (selectedTabIndex) {
            case 0:
              return <Profile />;
            case 1:
              return <div>Contenido de Seguridad</div>;
            case 2:
              return <div>Contenido de Notificaciones</div>;
            default:
              return null;
          }
        })()}
      </ContentCard>
    </div>
  );
}
