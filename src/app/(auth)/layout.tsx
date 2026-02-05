export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid place-items-center lg:p-4 bg-blue-50">
      <section className="w-full max-w-4xl lg:h-auto h-full">{children}</section>
    </main>
  );
}
