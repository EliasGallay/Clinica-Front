'use client';

import { useMeRedux } from '@/components/hooks/useMeRedux';
import Navbar from '@/components/ui/NavBar';
import { useEffect } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { loadMe, isLoading } = useMeRedux();

  useEffect(() => {
    void loadMe();
  }, [loadMe]);

  if (isLoading) return null;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
