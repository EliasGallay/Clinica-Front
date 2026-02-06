'use client';

import { useLogout } from '@/components/hooks/useLogout';

export default function DashboardPage() {
  const { handleLogout } = useLogout();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard! Here you can manage your account and view your data.</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}
