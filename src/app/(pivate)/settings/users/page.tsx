import TitleCard from '@/components/ui/TitleCard';

// app/settings/usuarios/page.tsx
export default function UsuariosSettings() {
  return (
    <div className="p-4 md:p-6">
      <TitleCard
        title="Configuración de Usuarios"
        description="Aquí puedes gestionar los usuarios del sistema, asignar roles y permisos."
      />
    </div>
  );
}
