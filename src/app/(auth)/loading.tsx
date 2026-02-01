import Spinner from '@/components/ui/Spinner';

export default function LoginLoading() {
  return (
    <div style={{ display: 'grid', gap: 12, placeItems: 'center', padding: 24 }}>
      <Spinner />
      <p style={{ opacity: 0.8 }}>Cargando login…</p>
    </div>
  );
}
