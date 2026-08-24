import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from '@/components/admin/LogoutButton';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Administracion',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sin sesion (pagina de login): render limpio, sin chrome de admin.
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[var(--color-sand)]/30">
      <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-surface)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
              <Logo variant="dark" withKicker={false} />
              <span className="rounded-full bg-[var(--color-ink)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Admin
              </span>
            </Link>
            <nav className="hidden items-center gap-5 text-sm sm:flex">
              <Link href="/admin" className="font-medium hover:text-[var(--color-gold-deep)]">
                Propiedades
              </Link>
              <Link href="/admin/propiedades/nueva" className="font-medium hover:text-[var(--color-gold-deep)]">
                Nueva
              </Link>
              <Link href="/" target="_blank" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                Ver sitio
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[var(--color-muted)] sm:block">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
